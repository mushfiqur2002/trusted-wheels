import { storage } from "@/lib/appwrite";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "";

export interface CarDocument {
    $id: string;
    slug: string;
    carousel: string;
    brand: string;
    model: string;
    year: number;
    title: string;
    price: number;
    discount?: number;
    quantity: number;
    location: string;
    vin: string;
    mileage: number;
    condition: string;
    bodyStyle: string;
    specs?: string;
    appearance?: string;
    description: string;
    notes?: string[];
    features?: string[];
    options?: string;
    images?: string;
}

export function transformCar(doc: CarDocument) {
    const specs = doc.specs ? JSON.parse(doc.specs) : {};
    const appearance = doc.appearance ? JSON.parse(doc.appearance) : {};
    const options = doc.options ? JSON.parse(doc.options) : [];
    const images = doc.images ? JSON.parse(doc.images) : {};

    return {
        id: doc.$id,
        slug: doc.slug,
        carousel: doc.carousel,

        brand: doc.brand,
        model: doc.model,
        year: doc.year,
        title: doc.title,

        price: doc.price,
        discount: doc.discount,
        quantity: doc.quantity,

        location: doc.location,
        vin: doc.vin,
        mileage: doc.mileage,

        condition: doc.condition,
        bodyStyle: doc.bodyStyle,

        specs,
        appearance,

        description: doc.description,
        notes: doc.notes || [],
        features: doc.features || [],

        options,

        images: {
            display: images?.display
                ? storage.getFileView(BUCKET_ID, images.display)
                : "",
            gallery: images?.gallery?.map((id: string) =>
                storage.getFileView(BUCKET_ID, id)
            ) || [],
        },
    };
}