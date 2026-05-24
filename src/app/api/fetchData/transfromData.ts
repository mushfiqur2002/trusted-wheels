import {
    CarInfoType,
    CarSpecs,
    CarAppearance,
    CarOption,
    CarImages
} from "@/constants";


// Safe JSON parser

const safeParse = <T>(
    value: string | T | undefined,
    fallback: T
): T => {

    try {

        // already object/array
        if (typeof value !== "string") {
            return value || fallback;
        }

        // empty string
        if (value.trim() === "") {
            return fallback;
        }

        return JSON.parse(value);

    }

    catch {

        return fallback;

    }

};



export function transformCar(
    doc: CarInfoType
) {

    const specs =
        safeParse<CarSpecs>(
            doc.specs,
            {}
        );

    const appearance =
        safeParse<CarAppearance>(
            doc.appearance,
            {}
        );

    const options =
        safeParse<CarOption[]>(
            doc.options,
            []
        );

    const images =
        safeParse<CarImages>(
            doc.images,
            {
                display: "",
                gallery: []
            }
        );



    return {

        $id: doc.$id,

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

        notes:
            doc.notes || [],

        features:
            doc.features || [],

        options,

        images: {

            // already URLs
            display:
                images.display || "",

            gallery:
                images.gallery || []

        }

    };

}