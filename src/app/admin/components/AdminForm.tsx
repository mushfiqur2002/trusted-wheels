"use client";

import { databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function AdminForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null)
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
    ] as const;

    const numberFields = [
        "price",
        "discount",
        "quantity",
        "mileage",
    ];

    const [displayImage, setDisplayImage] = useState<File | null>(null)

    const [galleryImages, setGalleryImages] = useState<File[]>([])

    const [options, setOptions] = useState([
        {
            title: "",
            items: [""],
        },
    ])

    const handleDisplayImage = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files?.[0]) return

        setDisplayImage(e.target.files[0])
    }

    const handleGalleryImages = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;

        if (!files) return;

        const fileArray = Array.from(files);

        setGalleryImages((prev) => [
            ...prev,
            ...fileArray,
        ]);
    };

    const removeDisplayImage = () => {
        setDisplayImage(null)
    }

    const removeGalleryImage = (index: number) => {
        setGalleryImages((prev) =>
            prev.filter((_, i) => i !== index)
        )
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

        // =========================
        // VALIDATION
        // =========================

        if (
            !form.title ||
            !form.price ||
            !displayImage
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
            // =========================
            // UPLOAD IMAGES
            // =========================

            let uploadedDisplayImage = ""
            const uploadedGalleryImages: string[] = []

            // upload display image
            if (displayImage) {
                const res = await storage.createFile(
                    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
                    ID.unique(),
                    displayImage
                )

                uploadedDisplayImage = res.$id
            }

            // upload gallery images
            for (const file of galleryImages) {
                const res = await storage.createFile(
                    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
                    ID.unique(),
                    file
                )

                uploadedGalleryImages.push(res.$id)
            }

            // =========================
            // PREPARE SPECS
            // =========================

            const specs = {
                fuelType: form.fuelType,
                transmission: form.transmission,
                engine: form.engine,
            }

            // =========================
            // CLEAN OPTIONS
            // =========================

            const cleanedOptions = options
                .map((section) => ({
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

            // =========================
            // CREATE DOCUMENT
            // =========================

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

                    option: JSON.stringify(cleanedOptions),

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

            // =========================
            // SUCCESS
            // =========================

            setSuccess(true)

            // =========================
            // RESET FORM
            // =========================

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
            })

            // reset images
            setDisplayImage(null)
            setGalleryImages([])

            // reset options
            setOptions([
                {
                    title: "",
                    items: [""],
                },
            ])

            // auto hide success message
            setTimeout(() => {
                setSuccess(null)
            }, 5000)

        } catch (err) {
            console.error(err)

            setSuccess(false)

            // auto hide error message
            setTimeout(() => {
                setSuccess(null)
            }, 5000)

        } finally {
            setLoading(false)
        }
    }

    const inputStyle = "w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px] focus:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.4)] transition";

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6 text-[#212121]">
                {
                    success !== null && (
                        <div className="w-full flex items-center justify-center fixed top-22">
                            {success ? (
                                <p className="text-sm text-center text-green-600 font-medium bg-green-100 p-3 rounded w-auto">
                                    ✅ Car information added successfully
                                </p>
                            ) : (
                                <p className="text-sm text-center text-red-500 font-medium bg-red-100 p-3 rounded w-auto">
                                    ❌ Failed to add car information
                                </p>
                            )}
                        </div>
                    )
                }

                {/* INPUT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fields.map((field) => (
                        <input
                            key={field}
                            name={field}
                            type={
                                numberFields.includes(
                                    field as typeof numberFields[number]
                                )
                                    ? "number"
                                    : "text"
                            }
                            placeholder={field}
                            value={form[field]}
                            onChange={handleChange}
                            className={inputStyle}
                        />
                    ))}
                </div>

                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className={inputStyle}
                />

                {/* FEATURES */}
                <input
                    name="features"
                    placeholder="Features (comma separated)"
                    value={form.features}
                    onChange={handleChange}
                    className={inputStyle}
                />

                {/* NOTES */}
                <input
                    name="notes"
                    placeholder="Notes (comma separated)"
                    value={form.notes}
                    onChange={handleChange}
                    className={inputStyle}
                />

                {/* OPTIONS */}
                <div className="space-y-6">

                    {options.map((section, sectionIndex) => (
                        <div
                            key={sectionIndex}
                            className="border rounded-2xl p-4 space-y-4"
                        >

                            {/* section title */}
                            <input
                                type="text"
                                placeholder="Section title"
                                value={section.title}
                                onChange={(e) => {
                                    const updated = [...options]
                                    updated[sectionIndex].title = e.target.value
                                    setOptions(updated)
                                }}
                                className={inputStyle}
                            />

                            {/* items */}
                            <div className="space-y-2">

                                {section.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Option item"
                                            value={item}
                                            onChange={(e) => {
                                                const updated = [...options]

                                                updated[sectionIndex].items[itemIndex] =
                                                    e.target.value

                                                setOptions(updated)
                                            }}
                                            className={inputStyle}
                                        />

                                        {/* delete item */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = [...options]

                                                updated[sectionIndex].items =
                                                    updated[sectionIndex].items.filter(
                                                        (_, i) => i !== itemIndex
                                                    )

                                                setOptions(updated)
                                            }}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                {/* add item */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updated = [...options]

                                        updated[sectionIndex].items.push("")

                                        setOptions(updated)
                                    }}
                                    className="px-4 py-2 bg-black text-white rounded-lg"
                                >
                                    Add Item
                                </button>

                                {/* delete section */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOptions((prev) =>
                                            prev.filter((_, i) => i !== sectionIndex)
                                        )
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Delete Section
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* add section */}
                    <button
                        type="button"
                        onClick={() => {
                            setOptions((prev) => [
                                ...prev,
                                {
                                    title: "",
                                    items: [""],
                                },
                            ])
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Add Section
                    </button>
                </div>

                {/* CHECKBOX */}
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="carousel"
                        checked={form.carousel}
                        onChange={handleChange}
                        className="w-5 h-5 rounded-full cursor-pointer"
                    />
                    <p className="text-lg">Show in Carousel</p>
                </label>

                {/* DISPLAY IMAGE */}
                <div className="space-y-3">

                    <p className="text-sm font-medium">
                        Display Image
                    </p>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleDisplayImage}
                        className="border p-2 rounded-lg cursor-pointer"
                    />

                    {displayImage && (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border">
                            <Image
                                src={URL.createObjectURL(displayImage)}
                                alt="display"
                                fill
                                className="object-cover"
                            />

                            <button
                                type="button"
                                onClick={removeDisplayImage}
                                className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                            >
                                <Trash size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* GALLERY IMAGES */}
                <div className="space-y-3 mt-6">

                    <p className="text-sm font-medium">
                        Gallery Images
                    </p>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryImages}
                        className="border p-2 rounded-lg cursor-pointer"
                    />

                    <div className="flex flex-wrap gap-4">

                        {galleryImages.map((file, index) => (
                            <div
                                key={index}
                                className="relative w-28 h-28 rounded-xl overflow-hidden border"
                            >
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="gallery"
                                    fill
                                    className="object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full"
                                >
                                    <Trash size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SUBMIT */}
                <button
                    disabled={loading}
                    className="bg-red-500 text-white px-4 py-3 w-full rounded disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Add Car"}
                </button>
            </form>
        </div>
    );
}