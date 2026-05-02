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

        // 🔍 SEARCH
        if (search) {
            const q = search.toLowerCase();

            result = result.filter((car) =>
                car.title?.toLowerCase().includes(q) ||
                car.brand?.toLowerCase().includes(q) ||
                car.bodyStyle?.toLowerCase().includes(q) ||
                car.specs?.fuelType?.toLowerCase().includes(q)
            );
        }

        // 🏷️ BRAND (from params)
        if (brand) {
            result = result.filter(
                (car) => car.brand?.toLowerCase() === brand.toLowerCase()
            );
        }

        // ⛽ FUEL
        if (filters.fuel?.length) {
            result = result.filter((car) =>
                filters.fuel?.includes(car.specs?.fuelType || "")
            );
        }

        // ⚙️ TRANSMISSION
        if (filters.transmission?.length) {
            result = result.filter((car) =>
                filters.transmission!.includes(car.specs?.transmission || "")
            );
        }

        // 🚙 BODY STYLE
        if (filters.bodyStyle?.length) {
            result = result.filter((car) =>
                filters.bodyStyle!.includes(car.bodyStyle || "")
            );
        }

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