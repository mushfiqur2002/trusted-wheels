"use client";

import { useCars } from "@/app/hooks/cars/useCars";
import { databases, storage } from "@/lib/appwrite";
import { useState, SetStateAction, Dispatch, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, X, ImageIcon, Check, Plus } from "lucide-react";
import { CarInfoType } from "@/constants";
import { getImageUrl } from "@/app/hooks/image/getImageUrl";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

interface AppwriteImage {
    $id: string;
    name: string;
    url: string;
}

// Helper to update nested fields
const updateNested = <T,>(setter: Dispatch<SetStateAction<T>>, path: string[], value: unknown) => {
    setter((prev) => {
        const newData = { ...prev };
        let current = newData as Record<string, unknown>;

        for (let i = 0; i < path.length - 1; i++) {
            const key = path[i]
            if (typeof current[key] !== "object" || current[key] === null) {
                current[key] = {};
            }
            current = current[key] as Record<string, unknown>;
        }
        current[path[path.length - 1]] = value;
        return newData;
    });
};

export default function AdminTable() {
    const { cars, refetch, loading } = useCars({});

    const [selectedCar, setSelectedCar] = useState<CarInfoType | null>(null);
    const [editData, setEditData] = useState<Partial<CarInfoType>>({});
    const [viewOpen, setViewOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    // Image states for edit modal
    const [allImages, setAllImages] = useState<AppwriteImage[]>([]);
    const [imagesLoading, setImagesLoading] = useState(true);
    const [displayImageId, setDisplayImageId] = useState<string>("");
    const [galleryImageIds, setGalleryImageIds] = useState<string[]>([]);
    const [showImageSelector, setShowImageSelector] = useState({ display: false, gallery: false });

    console.log('all image', allImages);
    console.log('displayID image', displayImageId);
    console.log('gallery id', galleryImageIds);


    // Fetch all images from Appwrite
    const fetchImages = useCallback(async () => {
        try {
            setImagesLoading(true);
            const response = await storage.listFiles(BUCKET_ID);
            const imageList = await Promise.all(
                response.files.map(async (file) => {
                    const url = storage.getFileView(BUCKET_ID, file.$id);
                    return {
                        $id: file.$id,
                        name: file.name,
                        url,
                    };
                })
            );
            setAllImages(imageList);
        } catch (err) {
            console.error('Failed to fetch images:', err);
        } finally {
            setImagesLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    // View
    const handleView = (car: CarInfoType) => {
        setSelectedCar(car);
        setViewOpen(true);
    };

    // Edit - Load car data and set image selections
    const handleEdit = (car: CarInfoType) => {
        const carData = JSON.parse(JSON.stringify(car));
        setEditData(carData);

        // Set image selections from car data
        if (carData.images) {
            let imagesObj = carData.images;
            if (typeof imagesObj === 'string') {
                try {
                    imagesObj = JSON.parse(imagesObj);
                } catch (e) {
                    imagesObj = { display: "", gallery: [] };
                }
            }
            setDisplayImageId(imagesObj?.display || "");
            setGalleryImageIds(imagesObj?.gallery || []);
        } else {
            setDisplayImageId("");
            setGalleryImageIds([]);
        }

        // Reset selector visibility
        setShowImageSelector({ display: false, gallery: false });
        setEditOpen(true);
    };

    // Handle display image selection from library
    const handleSelectDisplayImage = (imageId: string) => {
        setDisplayImageId(imageId);
        setShowImageSelector({ ...showImageSelector, display: false });
    };

    // Handle gallery image selection from library
    const handleSelectGalleryImage = (imageId: string) => {
        if (!galleryImageIds.includes(imageId)) {
            setGalleryImageIds(prev => [...prev, imageId]);
        }
    };

    // Remove gallery image
    const removeGalleryImage = (imageId: string) => {
        setGalleryImageIds(prev => prev.filter(id => id !== imageId));
    };

    // Remove display image
    const removeDisplayImage = () => {
        setDisplayImageId("");
    };

    // Update
    const handleUpdate = async () => {
        try {
            setIsUpdating(true);

            if (!editData.$id) {
                alert("Document ID missing");
                return;
            }

            const imagesObject = {
                display: displayImageId,
                gallery: galleryImageIds,
            };

            const updates = {
                ...editData,
                images: JSON.stringify(imagesObject),
                specs: editData.specs ? JSON.stringify(editData.specs) : "",
                appearance: editData.appearance ? JSON.stringify(editData.appearance) : "",
                options: editData.options ? JSON.stringify(editData.options) : "[]",
            };

            delete updates.$id;

            const cleanUpdates = Object.fromEntries(
                Object.entries(updates).filter(
                    ([_, value]) => value !== undefined && value !== null && value !== ""
                )
            );

            await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                editData.$id,
                cleanUpdates
            );

            await refetch();
            alert("Updated Successfully");
            setEditOpen(false);
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this car?")) return;
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );
            await refetch();
            alert("Deleted successfully");
        }
        catch (error) {
            console.log(error);
            alert("Failed to delete");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Car Inventory</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage and monitor all your car listings</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Total Cars</p>
                        <p className="text-2xl font-bold text-gray-800">{cars.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">In Stock</p>
                        <p className="text-2xl font-bold text-green-600">{cars.filter(c => Number(c.quantity) > 0).length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">On Discount</p>
                        <p className="text-2xl font-bold text-orange-600">{cars.filter(c => Number(c.discount) > 0).length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Avg Price</p>
                        <p className="text-2xl font-bold text-blue-600">
                            ${(cars.reduce((acc, c) => acc + (c.price || 0), 0) / (cars.length || 1)).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Discount</th>
                                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                                    <th className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cars.map((car, index) => (
                                    <tr key={car.$id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-4 py-4 text-sm text-gray-500 font-medium">{index + 1}</td>
                                        <td className="px-4 py-4"><span className="text-sm font-medium text-gray-800">{car.title}</span></td>
                                        <td className="px-4 py-4"><span className="text-sm text-gray-600 capitalize">{car.brand}</span></td>
                                        <td className="px-4 py-4"><span className="text-sm font-semibold text-gray-800">${car.price?.toLocaleString()}</span></td>
                                        <td className="px-4 py-4">
                                            {Number(car.discount) > 0 ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    {car.discount}% OFF
                                                </span>
                                            ) : <span className="text-sm text-gray-400">—</span>}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${Number(car.quantity) > 0 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                                {car.quantity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={() => handleView(car)} className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200 hover:scale-105" title="View"><Eye size={18} /></button>
                                                <button onClick={() => handleEdit(car)} className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-all duration-200 hover:scale-105" title="Edit"><Pencil size={18} /></button>
                                                <button onClick={() => handleDelete(car.$id!)} className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-105" title="Delete"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {cars.length === 0 && (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                                <ImageIcon className="w-10 h-10 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">No cars found</p>
                            <p className="text-gray-400 text-sm mt-1">Add your first car to get started</p>
                        </div>
                    )}
                </div>
            </div>

            {/* VIEW MODAL */}
            {viewOpen && selectedCar && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10000000000 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        {/* Header with gradient */}
                        <div className="sticky top-0 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Car Details</h2>
                            <button
                                onClick={() => setViewOpen(false)}
                                className="p-2 rounded-lg transition-colors hover:bg-black/10"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[75vh] p-6 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Basic Information Card */}
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Basic Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Title</span>
                                            <span className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.title}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Brand & Model</span>
                                            <span className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.brand} {selectedCar.model}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Year</span>
                                            <span className="text-sm font-semibold text-gray-800">{selectedCar.year}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Body Style</span>
                                            <span className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.bodyStyle || '—'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-gray-500">Condition</span>
                                            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${selectedCar.condition === 'New' ? 'bg-green-100 text-green-700' :
                                                selectedCar.condition === 'Used' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {selectedCar.condition || '—'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pricing & Stock Card */}
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Pricing & Stock
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Original Price</span>
                                            <span className="text-lg font-bold text-gray-800">${selectedCar.price?.toLocaleString()}</span>
                                        </div>
                                        {Number(selectedCar.discount) > 0 && (
                                            <>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                    <span className="text-sm text-gray-500">Discount</span>
                                                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{selectedCar.discount}% OFF</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                                    <span className="text-sm text-gray-500">Discounted Price</span>
                                                    <span className="text-xl font-bold text-red-600">
                                                        ${(Number(selectedCar.price) * (1 - Number(selectedCar.discount) / 100)).toLocaleString()}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-gray-500">Available Quantity</span>
                                            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${Number(selectedCar.quantity) > 0 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {selectedCar.quantity} {Number(selectedCar.quantity) > 0 ? 'in stock' : 'out of stock'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & VIN Card */}
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Vehicle Identification
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">Location</span>
                                            <span className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.location || '—'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                            <span className="text-sm text-gray-500">VIN</span>
                                            <span className="text-sm font-mono font-semibold text-gray-800 uppercase">{selectedCar.vin || '—'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-gray-500">Mileage</span>
                                            <span className="text-sm font-semibold text-gray-800">{selectedCar.mileage?.toLocaleString()} {selectedCar.mileage ? 'miles' : '—'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Specifications Card */}
                                {selectedCar.specs && Object.keys(selectedCar.specs).filter(k => selectedCar.specs?.[k as keyof typeof selectedCar.specs]).length > 0 && (
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                            Specifications
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedCar.specs.engine && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Engine</p>
                                                    <p className="text-sm font-semibold text-gray-800">{selectedCar.specs.engine}</p>
                                                </div>
                                            )}
                                            {selectedCar.specs.transmission && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Transmission</p>
                                                    <p className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.specs.transmission}</p>
                                                </div>
                                            )}
                                            {selectedCar.specs.fuelType && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Fuel Type</p>
                                                    <p className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.specs.fuelType}</p>
                                                </div>
                                            )}
                                            {selectedCar.specs.drive && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Drive</p>
                                                    <p className="text-sm font-semibold text-gray-800 uppercase">{selectedCar.specs.drive}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Appearance Card */}
                                {selectedCar.appearance && Object.keys(selectedCar.appearance).filter(k => selectedCar.appearance?.[k as keyof typeof selectedCar.appearance]).length > 0 && (
                                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                            Appearance
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedCar.appearance.exteriorColor && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Exterior</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: selectedCar.appearance.exteriorColor.toLowerCase() }}></div>
                                                        <p className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.appearance.exteriorColor}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedCar.appearance.interiorColor && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Interior</p>
                                                    <p className="text-sm font-semibold text-gray-800 capitalize">{selectedCar.appearance.interiorColor}</p>
                                                </div>
                                            )}
                                            {selectedCar.appearance.doors && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Doors</p>
                                                    <p className="text-sm font-semibold text-gray-800">{selectedCar.appearance.doors}</p>
                                                </div>
                                            )}
                                            {selectedCar.appearance.seats && (
                                                <div className="bg-gray-50 rounded-lg p-2">
                                                    <p className="text-xs text-gray-500">Seats</p>
                                                    <p className="text-sm font-semibold text-gray-800">{selectedCar.appearance.seats}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Features Section - Full Width */}
                            {selectedCar.features && selectedCar.features.length > 0 && (
                                <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Features
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCar.features.map((feature: string, idx: number) => (
                                            <span key={idx} className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 capitalize hover:bg-gray-200 transition">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Options Section - Full Width */}
                            {selectedCar.options && selectedCar.options.length > 0 && (
                                <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Options & Packages
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedCar.options.map((opt, idx: number) => (
                                            <div key={idx} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition">
                                                <p className="font-semibold text-gray-800 capitalize mb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                    {opt.title}
                                                </p>
                                                <div className="flex flex-wrap gap-1 ml-4">
                                                    {opt.items?.map((item: string, i: number) => (
                                                        <span key={i} className="text-xs text-gray-600 px-2 py-1">• {item}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description Section - Full Width */}
                            {selectedCar.description && (
                                <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedCar.description}</p>
                                </div>
                            )}

                            {/* Display Image Card */}
                            {selectedCar.images?.display && (
                                <div className="w-auto bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Display Image
                                    </h3>
                                    <div className="relative group max-w-[300px]">
                                        <img
                                            src={getImageUrl(selectedCar.images.display)}
                                            className="w-full h-64 object-contain rounded-lg shadow-md"
                                            alt={selectedCar.title}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Gallery Section - Full Width with responsive grid */}
                            {selectedCar.images?.gallery && selectedCar.images.gallery.length > 0 && (
                                <div className="mt-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                        Gallery ({selectedCar.images.gallery.length})
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {selectedCar.images.gallery.map((img, index) => (
                                            <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                                                <img
                                                    src={getImageUrl(img)}
                                                    className="w-full h-40 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                                                    alt={`Gallery ${index + 1}`}
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
                                                        Image {index + 1}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Notes Section - Full Width */}
                            {selectedCar.notes && selectedCar.notes.length > 0 && (
                                <div className="mt-6 bg-yellow-50 rounded-xl p-5 border border-yellow-100">
                                    <h3 className="text-sm font-semibold text-yellow-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        📝 Notes
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedCar.notes.map((note: string, idx: number) => (
                                            <li key={idx} className="capitalize text-sm text-gray-700">{note}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL - SHOW CURRENT IMAGES FIRST, THEN OPTION TO REPLACE */}
            {editOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10000000000 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Edit Car</h2>
                            <button onClick={() => setEditOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                        </div>
                        <div className="overflow-y-auto max-h-[75vh] p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Basic Fields */}
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Title</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.title || ""} onChange={(e) => setEditData({ ...editData, title: e.target.value })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Brand</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.brand || ""} onChange={(e) => setEditData({ ...editData, brand: e.target.value })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Model</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.model || ""} onChange={(e) => setEditData({ ...editData, model: e.target.value })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Year</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.year || ""} onChange={(e) => setEditData({ ...editData, year: parseInt(e.target.value) || 0 })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Body Style</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.bodyStyle || ""} onChange={(e) => setEditData({ ...editData, bodyStyle: e.target.value })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Condition</label><select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 bg-white" value={editData.condition || ""} onChange={(e) => setEditData({ ...editData, condition: e.target.value })}><option value="">Select</option><option value="New">New</option><option value="Used">Used</option><option value="Certified Pre-Owned">Certified Pre-Owned</option></select></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Price ($)</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.price || ""} onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) || 0 })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Discount (%)</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.discount || 0} onChange={(e) => setEditData({ ...editData, discount: parseFloat(e.target.value) || 0 })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Quantity</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.quantity || ""} onChange={(e) => setEditData({ ...editData, quantity: parseInt(e.target.value) || 0 })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Location</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.location || ""} onChange={(e) => setEditData({ ...editData, location: e.target.value })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">VIN</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.vin || ""} onChange={(e) => setEditData({ ...editData, vin: e.target.value })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Mileage</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.mileage || ""} onChange={(e) => setEditData({ ...editData, mileage: parseInt(e.target.value) || 0 })} /></div>
                                <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Carousel</label><select className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 bg-white" value={editData.carousel ? "true" : "false"} onChange={(e) => setEditData({ ...editData, carousel: e.target.value === "true" })}><option value="false">No</option><option value="true">Yes</option></select></div>

                                {/* Specifications */}
                                <div className="md:col-span-2 mt-2 pt-4 border-t">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Engine</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.specs?.engine || ""} onChange={(e) => updateNested(setEditData, ["specs", "engine"], e.target.value)} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Cylinders</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.specs?.cylinders || ""} onChange={(e) => updateNested(setEditData, ["specs", "cylinders"], parseInt(e.target.value) || "")} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Transmission</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.specs?.transmission || ""} onChange={(e) => updateNested(setEditData, ["specs", "transmission"], e.target.value)} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Drive</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.specs?.drive || ""} onChange={(e) => updateNested(setEditData, ["specs", "drive"], e.target.value)} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Fuel Type</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.specs?.fuelType || ""} onChange={(e) => updateNested(setEditData, ["specs", "fuelType"], e.target.value)} /></div>
                                    </div>
                                </div>

                                {/* Appearance */}
                                <div className="md:col-span-2 mt-4 pt-4 border-t">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Appearance</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Exterior Color</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.appearance?.exteriorColor || ""} onChange={(e) => updateNested(setEditData, ["appearance", "exteriorColor"], e.target.value)} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Interior Color</label><input className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.appearance?.interiorColor || ""} onChange={(e) => updateNested(setEditData, ["appearance", "interiorColor"], e.target.value)} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Doors</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.appearance?.doors || ""} onChange={(e) => updateNested(setEditData, ["appearance", "doors"], parseInt(e.target.value) || "")} /></div>
                                        <div className="space-y-2"><label className="block text-sm font-medium text-gray-700">Seats</label><input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-xl" value={editData.appearance?.seats || ""} onChange={(e) => updateNested(setEditData, ["appearance", "seats"], parseInt(e.target.value) || "")} /></div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Features (comma separated)</label>
                                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.features?.join(", ") || ""} onChange={(e) => setEditData({ ...editData, features: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} />
                                </div>

                                {/* Options */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Options (JSON format)</label>
                                    <textarea rows={5} className="w-full px-4 py-2 border border-gray-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-red-400" value={JSON.stringify(editData.options || [], null, 2)} onChange={(e) => { try { const parsed = JSON.parse(e.target.value); setEditData({ ...editData, options: parsed }); } catch (err) { } }} />
                                    <p className="text-xs text-gray-500">Array of objects with <strong>title</strong> and <strong>items</strong> array</p>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.description || ""} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                                </div>

                                {/* Notes */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Notes (one per line)</label>
                                    <textarea rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" value={editData.notes?.join("\n") || ""} onChange={(e) => setEditData({ ...editData, notes: e.target.value.split("\n").filter(l => l.trim()) })} />
                                </div>

                                {/* ========== IMAGE SECTION - SHOW CURRENT, OPTION TO REPLACE ========== */}
                                <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Images</h3>

                                    {/* Display Image - Show current from car data */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Image <span className="text-red-500">*</span></label>

                                        {!showImageSelector.display ? (
                                            // Show current display image from car data
                                            <div>
                                                {displayImageId ? (
                                                    <div className="flex items-start gap-4">
                                                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-blue-500">
                                                            <img
                                                                src={getImageUrl(displayImageId)}
                                                                alt="display"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-sm text-gray-600">Current display image</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowImageSelector({ ...showImageSelector, display: true })}
                                                                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition flex items-center gap-1"
                                                            >
                                                                <Plus size={14} /> Replace Image
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={removeDisplayImage}
                                                                className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition ml-2"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                                                            <ImageIcon className="w-8 h-8 text-gray-400" />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowImageSelector({ ...showImageSelector, display: true })}
                                                            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                                                        >
                                                            Select Display Image
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // Show image selector to choose from storage
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <p className="text-sm text-gray-600">Select a new display image from storage</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowImageSelector({ ...showImageSelector, display: false })}
                                                        className="text-sm text-gray-500 hover:text-gray-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                {imagesLoading ? (
                                                    <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div></div>
                                                ) : (
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                                        {allImages.map((image) => (
                                                            <div
                                                                key={image.$id}
                                                                onClick={() => handleSelectDisplayImage(image.$id)}
                                                                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${displayImageId === image.$id
                                                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                                                    : 'border-gray-200 hover:border-blue-500'
                                                                    }`}
                                                            >
                                                                <div className="relative aspect-square bg-gray-100">
                                                                    <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Gallery Images - Show current from car data */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>

                                        {/* Show current gallery images from car data */}
                                        {galleryImageIds.length > 0 && (
                                            <div className="mb-4">
                                                <p className="text-xs text-gray-500 mb-2">Current Gallery ({galleryImageIds.length})</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {galleryImageIds.map((imageId, index) => {
                                                        return (
                                                            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-green-500 group">
                                                                <img src={getImageUrl(imageId)} alt="gallery" className="w-full h-full object-cover" />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeGalleryImage(imageId)}
                                                                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Button to add more gallery images from storage */}
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setShowImageSelector({ ...showImageSelector, gallery: !showImageSelector.gallery })}
                                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition flex items-center gap-1 mb-3"
                                            >
                                                <Plus size={14} /> Add More Images from Storage
                                            </button>

                                            {showImageSelector.gallery && (
                                                <div>
                                                    <p className="text-sm text-gray-600 mb-2">Click images to add to gallery</p>
                                                    {imagesLoading ? (
                                                        <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div></div>
                                                    ) : (
                                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                                            {allImages
                                                                .filter(img => !galleryImageIds.includes(img.$id))
                                                                .map((image) => (
                                                                    <div
                                                                        key={image.$id}
                                                                        onClick={() => handleSelectGalleryImage(image.$id)}
                                                                        className="relative cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-500 transition-all hover:scale-105"
                                                                    >
                                                                        <div className="relative aspect-square bg-gray-100">
                                                                            <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    )}
                                                    {allImages.filter(img => !galleryImageIds.includes(img.$id)).length === 0 && !imagesLoading && (
                                                        <p className="text-center text-gray-500 py-4">No more images available in storage</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                            >
                                {isUpdating ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Updating...
                                    </div>
                                ) : (
                                    "Update Car"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}