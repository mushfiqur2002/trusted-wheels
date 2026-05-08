"use client";

import { getCars } from "@/app/api/fetchData/fetchingData";
import { useMemo, useState, useEffect } from "react";

export interface Car {
    title?: string;
    brand?: string;
    bodyStyle?: string;
    specs?: {
        fuelType?: string;
        transmission?: string;
        engine?: string;
    };
}
type PropsType = {
    page?: number;
    search?: string;
    brand?: string;
    filters?: {
        fuel?: string[];
        transmission?: string[];
        bodyStyle?: string[];
        brand?: string[];
        engine?: string[];
    };
};
export function useCars({
    page = 1,
    search = "",
    brand = "",
    filters = {},
}: PropsType) {
    const limit = 12;
    const [carInfo, setCarInfo] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    // 🔥 FETCH DATA
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getCars(); // already transformed
            setCarInfo(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        let result = [...carInfo];

        // 🔍 SEARCH FIRST
        if (search) {
            const q = search.toLowerCase();

            result = result.filter((car) =>
                car.title?.toLowerCase().includes(q) ||
                car.brand?.toLowerCase().includes(q) ||
                car.bodyStyle?.toLowerCase().includes(q) ||
                car.specs?.fuelType?.toLowerCase().includes(q) ||
                car.specs?.transmission?.toLowerCase().includes(q) ||
                car.specs?.engine?.toLowerCase().includes(q)
            );
        }

        // 🔥 COMBINED FILTER (THIS FIXES YOUR ISSUE)
        result = result.filter((car) => {
            const brandParamMatch =
                !brand ||
                car.brand?.toLowerCase() === brand.toLowerCase();

            const brandMatch =
                !filters.brand?.length ||
                filters.brand.includes(car.brand || "");

            const fuelMatch =
                !filters.fuel?.length ||
                filters.fuel.includes(car.specs?.fuelType || "");

            const transmissionMatch =
                !filters.transmission?.length ||
                filters.transmission.includes(car.specs?.transmission || "");

            const bodyMatch =
                !filters.bodyStyle?.length ||
                filters.bodyStyle.includes(car.bodyStyle || "");

            const engineMatch =
                !filters.engine?.length ||
                filters.engine.includes(car.specs?.engine || "");

            return (
                brandParamMatch &&
                brandMatch &&
                fuelMatch &&
                transmissionMatch &&
                bodyMatch &&
                engineMatch
            );
        });

        return result;
    }, [search, brand, filters, carInfo]);

    // 📄 PAGINATION AFTER FILTER
    const totalPage = Math.ceil(filteredData.length / limit);

    const data = useMemo(() => {
        const start = (page - 1) * limit;
        return filteredData.slice(start, start + limit);
    }, [filteredData, page]);

    return {
        data,
        totalPage,
        totalCar: filteredData.length,
        currentPage: page,
        limit
    };
}