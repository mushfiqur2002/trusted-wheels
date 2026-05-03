"use client";

import { carInfo } from "@/constants";
import { useMemo } from "react";
type PropsType = {
    page?: number;
    search?: string;
    brand?: string;
    filters?: {
        fuel?: string[];
        transmission?: string[];
        bodyStyle?: string[];
        brand?: string[];
    };
};
export function useCars({
    page = 1,
    search = "",
    brand = "",
    filters = {},
}: PropsType) {
    const limit = 12;

    const filteredData = useMemo(() => {
        let result = [...carInfo];

        // 🔍 SEARCH FIRST
        if (search) {
            const q = search.toLowerCase();

            result = result.filter((car) =>
                car.title?.toLowerCase().includes(q) ||
                car.brand?.toLowerCase().includes(q) ||
                car.bodyStyle?.toLowerCase().includes(q) ||
                car.specs?.fuelType?.toLowerCase().includes(q)
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

            return (
                brandParamMatch &&
                brandMatch &&
                fuelMatch &&
                transmissionMatch &&
                bodyMatch
            );
        });

        return result;
    }, [search, brand, filters]);

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
        limit,
    };
}