"use client";

import { useCars } from "@/app/hooks/cars/useCars";
import { databases } from "@/lib/appwrite";
import { useState, SetStateAction, Dispatch } from "react";
import { Eye, Pencil, Trash2, X } from "lucide-react";
import { CarInfoType } from "@/constants";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

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
    console.log('cars', cars);

    const [selectedCar, setSelectedCar] = useState<CarInfoType | null>(null);
    const [editData, setEditData] = useState<Partial<CarInfoType>>({});
    const [viewOpen, setViewOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    console.log('editdata', editData);
    console.log('selectdata', selectedCar);



    // View
    const handleView = (car: CarInfoType) => {
        setSelectedCar(car);
        setViewOpen(true);
    };

    // Edit
    const handleEdit = (car: CarInfoType) => {
        // Deep copy to avoid mutation
        setEditData(JSON.parse(JSON.stringify(car)));
        setEditOpen(true);
    };

    // update
    const handleUpdate = async () => {

        try {

            setIsUpdating(true);

            if (!editData.id) {
                alert("ID missing");
                return;
            }

            const updates = {

                ...editData,

                specs:
                    editData.specs
                        ? JSON.stringify(
                            editData.specs
                        )
                        : "",

                appearance:
                    editData.appearance
                        ? JSON.stringify(
                            editData.appearance
                        )
                        : "",

                options:
                    editData.options
                        ? JSON.stringify(
                            editData.options
                        )
                        : "[]",
            };


            delete updates.id;


            const cleanUpdates =
                Object.fromEntries(

                    Object.entries(
                        updates
                    ).filter(

                        ([_, value]) =>
                            value !== undefined &&
                            value !== null

                    )

                );


            await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                editData.id,
                cleanUpdates
            );


            await refetch();

            alert(
                "Updated Successfully"
            );

            setEditOpen(false);

        }

        catch (error) {

            console.log(error);

            alert(
                error
            );

        }

        finally {

            setIsUpdating(false);

        }

    };

    const handleDelete = async (id: string) => {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );
            await refetch();
            alert("Deleted");
        }
        catch (error) {
            console.log(error);
        }
    };

    if (loading) return <h1 className="text-center mt-20">Loading...</h1>;

    return (
        <div className="mt-20 px-6" style={{ color: "rgba(33,33,33,1)" }}>
            <div className="border rounded-xl overflow-x-auto" style={{ borderColor: "#e5e7eb" }}>
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-sm font-semibold">#</th>
                            <th className="p-4 text-sm font-semibold">Title</th>
                            <th className="p-4 text-sm font-semibold">Brand</th>
                            <th className="p-4 text-sm font-semibold">Price</th>
                            <th className="p-4 text-sm font-semibold">Discount</th>
                            <th className="p-4 text-sm font-semibold">Quantity</th>
                            <th className="p-4 text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, index) => (
                            <tr
                                key={car.id}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                style={{ borderColor: "#e5e7eb" }}
                            >
                                <td className="p-4 text-center border-t" style={{ borderColor: "#e5e7eb" }}>
                                    {index + 1}
                                </td>
                                <td className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
                                    {car.title}
                                </td>
                                <td className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
                                    {car.brand}
                                </td>
                                <td className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
                                    ${car.price}
                                </td>
                                <td className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
                                    {car.discount}%
                                </td>
                                <td className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
                                    {car.quantity}
                                </td>
                                <td className="p-4 border-t" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleView(car)}
                                            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                                            style={{ color: "#2563eb" }}
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleEdit(car)}
                                            className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                                            style={{ color: "#16a34a" }}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(car.id!)}
                                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                                            style={{ color: "#dc2626" }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* VIEW MODAL - Shows all car data */}
            {viewOpen && selectedCar && (
                <div className="relative bg-black/50 flex justify-center items-center z-50 overflow-y-auto py-8">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-4xl relative my-8">
                        <button
                            onClick={() => setViewOpen(false)}
                            className="absolute top-3 right-3 hover:bg-gray-100 rounded-lg p-1 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className=" text-2xl font-bold mb-6 pr-8">Car Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div className="space-y-2">
                                <h3 className="capitalize text-lg font-semibold text-red-600 mb-2">Basic Information</h3>
                                <p className="capitalize"><strong>Title:</strong> {selectedCar.title}</p>
                                <p className="capitalize"><strong>Brand:</strong> {selectedCar.brand}</p>
                                <p className="capitalize"><strong>Model:</strong> {selectedCar.model}</p>
                                <p className="capitalize"><strong>Year:</strong> {selectedCar.year}</p>
                                <p className="capitalize"><strong>Body Style:</strong> {selectedCar.bodyStyle}</p>
                                <p className="capitalize"><strong>Condition:</strong> {selectedCar.condition}</p>
                                <p className="capitalize"><strong>Carousel:</strong> {selectedCar.carousel ? "Yes" : "No"}</p>
                            </div>

                            {/* Pricing & Stock */}
                            <div className="space-y-2">
                                <h3 className="capitalize text-lg font-semibold text-red-600 mb-2">Pricing & Stock</h3>
                                <p><strong>Price:</strong> ${selectedCar.price}</p>
                                <p><strong>Discount:</strong> {selectedCar.discount}%</p>
                                {Number(selectedCar.discount) > 0 && (
                                    <p><strong>Discounted Price:</strong> ${(Number(selectedCar.price) * (1 - Number(selectedCar.discount) / 100)).toFixed(2)}</p>
                                )}
                                <p><strong>Quantity:</strong> {selectedCar.quantity}</p>
                            </div>

                            {/* Location & VIN */}
                            <div className="space-y-2">
                                <h3 className="capitalize text-lg font-semibold text-red-600 mb-2">Vehicle Information</h3>
                                <p className="capitalize"><strong>Location:</strong> {selectedCar.location}</p>
                                <p className="capitalize"><strong>VIN:</strong> {selectedCar.vin}</p>
                                <p className="capitalize"><strong>Mileage:</strong> {selectedCar.mileage?.toLocaleString()} miles</p>
                            </div>

                            {/* Specifications */}
                            {selectedCar.specs && Object.keys(selectedCar.specs).length > 0 && (
                                <div className="capitalize space-y-2">
                                    <h3 className="text-lg font-semibold text-red-600 mb-2">Specifications</h3>
                                    {selectedCar.specs.engine && <p><strong>Engine:</strong> {selectedCar.specs.engine}</p>}
                                    {selectedCar.specs.cylinders && <p><strong>Cylinders:</strong> {selectedCar.specs.cylinders}</p>}
                                    {selectedCar.specs.transmission && <p><strong>Transmission:</strong> {selectedCar.specs.transmission}</p>}
                                    {selectedCar.specs.drive && <p><strong>Drive:</strong> {selectedCar.specs.drive}</p>}
                                    {selectedCar.specs.fuelType && <p><strong>Fuel Type:</strong> {selectedCar.specs.fuelType}</p>}
                                </div>
                            )}

                            {/* Appearance */}
                            {selectedCar.appearance && Object.keys(selectedCar.appearance).length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-red-600 mb-2">Appearance</h3>
                                    {selectedCar.appearance.exteriorColor && <p><strong>Exterior Color:</strong> {selectedCar.appearance.exteriorColor}</p>}
                                    {selectedCar.appearance.interiorColor && <p><strong>Interior Color:</strong> {selectedCar.appearance.interiorColor}</p>}
                                    {selectedCar.appearance.doors && <p><strong>Doors:</strong> {selectedCar.appearance.doors}</p>}
                                    {selectedCar.appearance.seats && <p><strong>Seats:</strong> {selectedCar.appearance.seats}</p>}
                                </div>
                            )}

                            {/* Features */}
                            {selectedCar.features && selectedCar.features.length > 0 && (
                                <div className="space-y-2 md:col-span-2">
                                    <h3 className="text-lg font-semibold text-red-600 mb-2">Features</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCar.features.map((feature: string, idx: number) => (
                                            <span key={idx} className="capitalize bg-gray-100 px-3 py-1 rounded-full text-sm">{feature}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Options */}
                            {selectedCar.options && selectedCar.options.length > 0 && (
                                <div className="space-y-2 md:col-span-2">
                                    <h3 className="text-lg font-semibold text-red-600 mb-2">Options</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedCar.options.map((opt, idx: number) => (
                                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                                <p className="capitalize font-semibold">{opt.title}</p>
                                                <ul className="capitalize list-disc list-inside mt-1">
                                                    {opt.items?.map((item: string, i: number) => (
                                                        <li key={i} className="text-sm">{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            {selectedCar.description && (
                                <div className="space-y-2 md:col-span-2">
                                    <h3 className="capitalize text-lg font-semibold text-red-600 mb-2">Description</h3>
                                    <p className="text-gray-700">{selectedCar.description}</p>
                                </div>
                            )}

                            {/* Notes */}
                            {selectedCar.notes && selectedCar.notes.length > 0 && (
                                <div className="space-y-2 md:col-span-2">
                                    <h3 className="capitalize text-lg font-semibold text-red-600 mb-2">Notes</h3>
                                    <ul className="list-disc list-inside">
                                        {selectedCar.notes.map((note: string, idx: number) => (
                                            <li className="capitalize" key={idx}>{note}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Display Image */}
                            {selectedCar.images?.display && (
                                <img
                                    src={selectedCar.images.display}
                                    className="w-auto h-36 object-cover rounded mb-6"
                                    alt={selectedCar.title}
                                />
                            )}
                            {/* Gallery Images */}
                            {selectedCar.images?.gallery && selectedCar.images.gallery.length > 0 && (
                                <div className="space-y-2 md:col-span-2">
                                    <h3 className="text-lg font-semibold text-red-600 mb-2">Gallery</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {selectedCar.images.gallery.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                className="w-full h-32 object-cover rounded border shadow-sm hover:scale-105 transition-transform"
                                                alt="Gallery"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL - Includes all fields and image upload */}
            {editOpen && (
                <div className="relative bg-black/50 flex justify-center items-center z-50 overflow-y-auto py-8">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-4xl relative my-8">
                        <button
                            onClick={() => setEditOpen(false)}
                            className="absolute top-3 right-3 hover:bg-gray-100 rounded-lg p-1 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-2xl font-bold mb-6">Edit Car</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-4">
                            {/* Basic Fields */}
                            <div>
                                <label className="block font-medium mb-1">Title</label>
                                <input
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.title || ""}
                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Brand</label>
                                <input
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.brand || ""}
                                    onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Model</label>
                                <input
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.model || ""}
                                    onChange={(e) => setEditData({ ...editData, model: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Year</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.year || ""}
                                    onChange={(e) => setEditData({ ...editData, year: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Body Style</label>
                                <input
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.bodyStyle || ""}
                                    onChange={(e) => setEditData({ ...editData, bodyStyle: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Condition</label>
                                <select
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.condition || ""}
                                    onChange={(e) => setEditData({ ...editData, condition: e.target.value })}
                                >
                                    <option value="">Select</option>
                                    <option value="New">New</option>
                                    <option value="Used">Used</option>
                                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Carousel</label>
                                <select
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.carousel ? "true" : "false"}
                                    onChange={(e) => setEditData({ ...editData, carousel: e.target.value === "true" })}
                                >
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.price || ""}
                                    onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Discount (%)</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.discount || 0}
                                    onChange={(e) => setEditData({ ...editData, discount: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Quantity</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.quantity || ""}
                                    onChange={(e) => setEditData({ ...editData, quantity: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Location</label>
                                <input
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.location || ""}
                                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">VIN</label>
                                <input
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.vin || ""}
                                    onChange={(e) => setEditData({ ...editData, vin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Mileage</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded-lg focus:outline-none"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.mileage || ""}
                                    onChange={(e) => setEditData({ ...editData, mileage: parseInt(e.target.value) || 0 })}
                                />
                            </div>

                            {/* Specifications */}
                            <div className="md:col-span-2 border-t pt-4 mt-2">
                                <h3 className="text-lg font-semibold text-red-600 mb-2">Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium">Engine</label>
                                        <input className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.specs?.engine || ""} onChange={(e) => updateNested(setEditData, ["specs", "engine"], e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Cylinders</label>
                                        <input type="number" className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.specs?.cylinders || ""} onChange={(e) => updateNested(setEditData, ["specs", "cylinders"], parseInt(e.target.value) || "")} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Transmission</label>
                                        <input className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.specs?.transmission || ""} onChange={(e) => updateNested(setEditData, ["specs", "transmission"], e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Drive</label>
                                        <input className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.specs?.drive || ""} onChange={(e) => updateNested(setEditData, ["specs", "drive"], e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Fuel Type</label>
                                        <input className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.specs?.fuelType || ""} onChange={(e) => updateNested(setEditData, ["specs", "fuelType"], e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Appearance */}
                            <div className="md:col-span-2 border-t pt-4 mt-2">
                                <h3 className="text-lg font-semibold text-red-600 mb-2">Appearance</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium">Exterior Color</label>
                                        <input className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.appearance?.exteriorColor || ""} onChange={(e) => updateNested(setEditData, ["appearance", "exteriorColor"], e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Interior Color</label>
                                        <input className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.appearance?.interiorColor || ""} onChange={(e) => updateNested(setEditData, ["appearance", "interiorColor"], e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Doors</label>
                                        <input type="number" className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.appearance?.doors || ""} onChange={(e) => updateNested(setEditData, ["appearance", "doors"], parseInt(e.target.value) || "")} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Seats</label>
                                        <input type="number" className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.appearance?.seats || ""} onChange={(e) => updateNested(setEditData, ["appearance", "seats"], parseInt(e.target.value) || "")} />
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="md:col-span-2">
                                <label className="block font-medium mb-1">Features (comma separated)</label>
                                <textarea
                                    rows={3}
                                    className="w-full border p-2 rounded"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={editData.features?.join(", ") || ""}
                                    onChange={(e) => setEditData({ ...editData, features: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                                />
                            </div>

                            {/* Options */}
                            <div className="md:col-span-2">
                                <label className="block font-medium mb-2">Options (JSON format)</label>
                                <textarea
                                    rows={5}
                                    className="w-full border p-2 rounded font-mono text-sm"
                                    style={{ borderColor: "#e5e7eb" }}
                                    value={JSON.stringify(editData.options || [], null, 2)}
                                    onChange={(e) => {
                                        try {
                                            const parsed = JSON.parse(e.target.value);
                                            setEditData({ ...editData, options: parsed });
                                        } catch (err) {
                                            console.log(err);
                                            /* ignore invalid JSON */
                                        }
                                    }}
                                />
                                <p className="text-xs text-gray-500 mt-1">Array of objects with <strong>title</strong> and <strong>items</strong> array</p>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block font-medium mb-1">Description</label>
                                <textarea rows={4} className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.description || ""} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                            </div>

                            {/* Notes */}
                            <div className="md:col-span-2">
                                <label className="block font-medium mb-1">Notes (one per line)</label>
                                <textarea rows={3} className="w-full border p-2 rounded" style={{ borderColor: "#e5e7eb" }} value={editData.notes?.join("\n") || ""} onChange={(e) => setEditData({ ...editData, notes: e.target.value.split("\n").filter(l => l.trim()) })} />
                            </div>
                        </div>

                        <div className="mt-6">

                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className={`w-full p-3 rounded-lg text-white font-semibold transition-all
        ${isUpdating
                                        ? "opacity-60 cursor-not-allowed"
                                        : "hover:opacity-90"
                                    }`}
                                style={{
                                    backgroundColor:
                                        "rgba(221,11,31,1)"
                                }}
                            >

                                {
                                    isUpdating
                                        ? "Updating..."
                                        : "Update Car"
                                }

                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}