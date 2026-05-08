"use client";

import { databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";
import React, { useState } from "react";

export default function AdminForm() {
    const [images, setImages] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = "checked" in e.target ? e.target.checked : false;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // ✅ Upload images (display + gallery)
            let displayImage = "";
            const galleryImages: string[] = [];

            if (images) {
                const files = Array.from(images);

                // First image = display
                if (files[0]) {
                    const res = await storage.createFile(
                        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
                        ID.unique(),
                        files[0]
                    );
                    displayImage = res.$id;
                }

                // Rest = gallery
                for (let i = 1; i < files.length; i++) {
                    const res = await storage.createFile(
                        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "",
                        ID.unique(),
                        files[i]
                    );
                    galleryImages.push(res.$id);
                }
            }

            // ✅ Prepare specs
            const specs = {
                fuelType: form.fuelType,
                transmission: form.transmission,
                engine: form.engine,
            };

            // ✅ Save to Appwrite DB
            await databases.createDocument(
                "cars", // DB ID
                "car_information", // Collection ID
                ID.unique(),
                {
                    title: form.title,
                    slug: form.slug,
                    brand: form.brand,
                    model: form.model,

                    year: Number(form.year),
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

                    features: form.features
                        .split(",")
                        .map((f) => f.trim())
                        .filter(Boolean),

                    notes: form.notes
                        .split(",")
                        .map((n) => n.trim())
                        .filter(Boolean),

                    images: JSON.stringify({
                        display: displayImage,
                        gallery: galleryImages,
                    }),
                }
            );

            // ✅ Success message
            setMessage("✅ Car added successfully!");

            // ✅ Reset form
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
            });

            setImages(null);
        } catch (err) {
            console.error(err);
            setMessage("❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px] focus:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.4)] transition";

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6 text-[#212121]">
                {message && <p className="text-sm text-center">{message}</p>}

                {/* INPUT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
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
                    ].map((field) => (
                        <input
                            key={field}
                            name={field}
                            type={
                                ["year", "price", "discount", "quantity", "mileage"].includes(
                                    field
                                )
                                    ? "number"
                                    : "text"
                            }
                            placeholder={field}
                            value={form[field as keyof typeof form]}
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

                {/* IMAGE PREVIEW */}
                <div className="flex flex-wrap gap-2">
                    <p>Here first upload image is show for display or carousel</p>
                    {images &&
                        Array.from(images).map((file, i) => (
                            <img
                                key={i}
                                src={URL.createObjectURL(file)}
                                className="w-20 h-20 object-cover rounded"
                            />
                        ))}
                </div>

                {/* FILE INPUT */}
                <input
                    key={images ? images.length : 0}
                    type="file"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                    className={inputStyle}
                />

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