"use client";

import { databases, storage } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { Trash, Check, Image as ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

interface AppwriteImage {
    $id: string;
    name: string;
    url: string;
}

export default function AdminForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null)
    const [allImages, setAllImages] = useState<AppwriteImage[]>([]);
    const [imagesLoading, setImagesLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        brand: "",
        model: "",
        year: "",
        price: "",
        discount: "",
        quantity: "",
        location: "",
        vin: "",
        mileage: "",
        condition: "",
        bodyStyle: "",
        carousel: false,
        description: "",
        fuelType: "",
        transmission: "",
        engine: "",
        features: "",
        notes: "",
        exteriorColor: "",
        interiorColor: "",
        doors: "",
        seats: "",
    });

    const fields = [
        "title",
        "slug",
        "brand",
        "model",
        "year",
        "price",
        "discount",
        "quantity",
        "location",
        "vin",
        "mileage",
        "condition",
        "bodyStyle",
        "fuelType",
        "transmission",
        "engine",
        "exteriorColor",
        "interiorColor",
        "doors",
        "seats"
    ] as const;

    const numberFields = [
        "price",
        "discount",
        "quantity",
        "mileage",
    ];

    const [displayImageId, setDisplayImageId] = useState<string | null>(null)
    const [galleryImageIds, setGalleryImageIds] = useState<string[]>([])

    const [options, setOptions] = useState([
        {
            title: "",
            items: [""],
        },
    ])

    const fetchImages = useCallback(async () => {
        try {
            setImagesLoading(true);
            const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";
            const response = await storage.listFiles(bucketId, [Query.limit(1000)]);
            const imageList = await Promise.all(
                response.files.map(async (file) => {
                    const url = storage.getFileView(bucketId, file.$id);
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

    const handleSelectDisplayImage = (imageId: string) => {
        setDisplayImageId(imageId);
    };

    const handleSelectGalleryImage = (imageId: string) => {
        setGalleryImageIds(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        );
    };

    const removeDisplayImage = () => {
        setDisplayImageId(null)
    }

    const removeGalleryImage = (imageId: string) => {
        setGalleryImageIds(prev => prev.filter(id => id !== imageId))
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;

        const checked =
            "checked" in e.target
                ? e.target.checked
                : false;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        if (
            !form.title ||
            !form.price ||
            !displayImageId
        ) {
            setSuccess(false)

            setTimeout(() => {
                setSuccess(null)
            }, 3000)

            return
        }

        setLoading(true)
        setSuccess(null)

        try {
            const uploadedDisplayImage = displayImageId
            const uploadedGalleryImages = galleryImageIds

            const appearance = {
                exteriorColor: form.exteriorColor,
                interiorColor: form.interiorColor,
                doors: form.doors,
                seats: form.seats
            }

            const specs = {
                fuelType: form.fuelType,
                transmission: form.transmission,
                engine: form.engine,
            }

            const cleanedOptions = options.map((section) => ({
                title: section.title.trim(),
                items: section.items
                    .map((item) => item.trim())
                    .filter(Boolean),
            }))
                .filter(
                    (section) =>
                        section.title &&
                        section.items.length > 0
                )

            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "",
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || "",
                ID.unique(),
                {
                    title: form.title,

                    slug:
                        form.slug ||
                        form.title
                            .toLowerCase()
                            .replace(/\s+/g, "-"),

                    brand: form.brand,
                    model: form.model,

                    year: String(form.year),
                    price: Number(form.price),
                    discount: Number(form.discount),
                    quantity: Number(form.quantity),

                    location: form.location,
                    vin: form.vin,
                    mileage: Number(form.mileage),

                    condition: form.condition,
                    bodyStyle: form.bodyStyle,

                    carousel: form.carousel,

                    description: form.description,

                    specs: JSON.stringify(specs),

                    appearance: JSON.stringify(appearance),

                    options: JSON.stringify(cleanedOptions),

                    features: form.features
                        .split(",")
                        .map((f) => f.trim())
                        .filter(Boolean),

                    notes: form.notes
                        .split(",")
                        .map((n) => n.trim())
                        .filter(Boolean),

                    images: JSON.stringify({
                        display: uploadedDisplayImage,
                        gallery: uploadedGalleryImages,
                    }),
                }
            )

            setSuccess(true)

            setForm({
                title: "",
                slug: "",
                brand: "",
                model: "",

                year: "",
                price: "",
                discount: "",
                quantity: "",

                location: "",
                vin: "",
                mileage: "",

                condition: "",
                bodyStyle: "",

                carousel: false,

                description: "",

                fuelType: "",
                transmission: "",
                engine: "",

                features: "",
                notes: "",

                exteriorColor: "",
                interiorColor: "",
                doors: "",
                seats: ""
            })

            setDisplayImageId(null)
            setGalleryImageIds([])

            setOptions([
                {
                    title: "",
                    items: [""],
                },
            ])

            setTimeout(() => {
                setSuccess(null)
            }, 5000)

        } catch (err) {
            alert(err)
            setSuccess(false)

            setTimeout(() => {
                setSuccess(null)
            }, 5000)

        } finally {
            setLoading(false)
        }
    }

    const inputStyle = "w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px] focus:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.4)] transition";

    const selectedDisplayImage = allImages.find(img => img.$id === displayImageId);
    const selectedGalleryImages = allImages.filter(img => galleryImageIds.includes(img.$id));

    return (
        <div className="w-full mx-auto py-6">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Success/Error Toast */}
                {success !== null && (
                    <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
                        <div className={`px-6 py-3 rounded-lg shadow-lg ${success ? 'bg-green-500' : 'bg-red-500'} text-white font-medium`}>
                            {success ? '✅ Car added successfully!' : '❌ Failed to add car'}
                        </div>
                    </div>
                )}

                {/* Basic Information Section */}
                <div className="w-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {fields.map((field) => (
                                <input
                                    key={field}
                                    name={field}
                                    type={numberFields.includes(field as string) ? "number" : "text"}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={form[field]}
                                    onChange={handleChange}
                                    className={inputStyle}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Description & Details</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            className={inputStyle}
                            rows={5}
                        />
                        <input
                            name="features"
                            placeholder="Features (comma separated)"
                            value={form.features}
                            onChange={handleChange}
                            className={inputStyle}
                        />
                        <input
                            name="notes"
                            placeholder="Notes (comma separated)"
                            value={form.notes}
                            onChange={handleChange}
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* Options Section */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Options & Features</h2>
                        <button
                            type="button"
                            onClick={() => setOptions([...options, { title: "", items: [""] }])}
                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
                        >
                            <Plus size={16} /> Add Section
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        {options.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="border border-gray-200 rounded-xl p-4 bg-gray-50/30">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Section title"
                                        value={section.title}
                                        onChange={(e) => {
                                            const updated = [...options]
                                            updated[sectionIndex].title = e.target.value
                                            setOptions(updated)
                                        }}
                                        className="flex-1 p-3 border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setOptions(prev => prev.filter((_, i) => i !== sectionIndex))}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                    >
                                        <Trash size={18} />
                                    </button>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {section.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Option item"
                                                value={item}
                                                onChange={(e) => {
                                                    const updated = [...options]
                                                    updated[sectionIndex].items[itemIndex] = e.target.value
                                                    setOptions(updated)
                                                }}
                                                className="flex-1 p-2 border border-gray-200 rounded-lg outline-none focus:border-gray-400 transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updated = [...options]
                                                    updated[sectionIndex].items = updated[sectionIndex].items.filter((_, i) => i !== itemIndex)
                                                    setOptions(updated)
                                                }}
                                                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = [...options]
                                        updated[sectionIndex].items.push("")
                                        setOptions(updated)
                                    }}
                                    className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add item
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="carousel"
                        checked={form.carousel}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">Show in Carousel</span>
                </label>

                {/* Display Image Section - Clean UI */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Display Image <span className="text-red-500 text-sm">*</span></h2>
                    </div>
                    <div className="p-3 md:p-6">
                        {imagesLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : (
                            <>
                                {selectedDisplayImage && (
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Selected Display Image</p>
                                        <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-blue-500 shadow-md">
                                            <Image src={selectedDisplayImage.url} alt="display" fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={removeDisplayImage}
                                                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition"
                                            >
                                                <Trash size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-gray-600 mb-3">Click an image to select as display</p>
                                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                                        {allImages.map((image) => (
                                            <div
                                                key={image.$id}
                                                onClick={() => handleSelectDisplayImage(image.$id)}
                                                className={`
                                                    group relative cursor-pointer rounded-lg overflow-hidden
                                                    transition-all duration-200 hover:scale-105
                                                    ${displayImageId === image.$id
                                                        ? 'ring-2 ring-blue-500 ring-offset-2'
                                                        : 'hover:shadow-md'
                                                    }
                                                `}
                                            >
                                                <div className="relative aspect-square bg-gray-100">
                                                    <Image
                                                        src={image.url}
                                                        alt={image.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {displayImageId === image.$id && (
                                                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                                            <div className="bg-blue-500 rounded-full p-1">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Gallery Images Section - Clean UI */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Gallery Images</h2>
                        {galleryImageIds.length > 0 && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {galleryImageIds.length} selected
                            </span>
                        )}
                    </div>
                    <div className="p-6">
                        {imagesLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : (
                            <>
                                {selectedGalleryImages.length > 0 && (
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Selected Gallery Images</p>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedGalleryImages.map((image) => (
                                                <div key={image.$id} className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-green-500">
                                                    <Image src={image.url} alt="gallery" fill className="object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(image.$id)}
                                                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full transition"
                                                    >
                                                        <Trash size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-gray-600 mb-3">Click to select/deselect gallery images</p>
                                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                                        {allImages.map((image) => (
                                            <div
                                                key={image.$id}
                                                onClick={() => handleSelectGalleryImage(image.$id)}
                                                className={`
                                                    group relative cursor-pointer rounded-lg overflow-hidden
                                                    transition-all duration-200 hover:scale-105
                                                    ${galleryImageIds.includes(image.$id)
                                                        ? 'ring-2 ring-green-500 ring-offset-2'
                                                        : 'hover:shadow-md'
                                                    }
                                                `}
                                            >
                                                <div className="relative aspect-square bg-gray-100">
                                                    <Image
                                                        src={image.url}
                                                        alt={image.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    {galleryImageIds.includes(image.$id) && (
                                                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                                            <div className="bg-green-500 rounded-full p-1">
                                                                <Check className="w-4 h-4 text-white" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Adding Car...
                        </div>
                    ) : (
                        "Add Car"
                    )}
                </button>
            </form>
        </div>
    );
}