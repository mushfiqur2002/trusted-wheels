"use client";

import { getCars } from "@/app/api/fetchData/fetchingData";
import { CarInfoType } from "@/constants";
import { useEffect, useMemo, useState } from "react";

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

    const [cars, setCars] =
        useState<CarInfoType[]>([]);

    console.log('cars', cars);


    const [loading, setLoading] =
        useState(true);


    // Fetch function

    const fetchCars = async () => {
        try {
            setLoading(true);
            const data = await getCars();
            setCars(data);
        }
        catch (error) { console.log(error); }
        finally { setLoading(false); }
    };


    useEffect(() => {

        fetchCars();

    }, []);


    // FILTER

    const filteredCars = useMemo(() => {

        return cars.filter((car) => {

            const q =
                search.toLowerCase();

            const searchMatch =
                !search ||
                car.title?.toLowerCase().includes(q) ||
                car.brand?.toLowerCase().includes(q) ||
                car.bodyStyle?.toLowerCase().includes(q) ||
                car.specs?.fuelType?.toLowerCase().includes(q) ||
                car.specs?.transmission?.toLowerCase().includes(q) ||
                car.specs?.engine?.toLowerCase().includes(q);


            const brandParamMatch =
                !brand ||
                car.brand?.toLowerCase()
                === brand.toLowerCase();


            const brandMatch =
                !filters.brand?.length ||
                filters.brand.includes(
                    car.brand || ""
                );


            const fuelMatch =
                !filters.fuel?.length ||
                filters.fuel.includes(
                    car.specs?.fuelType || ""
                );


            const transmissionMatch =
                !filters.transmission?.length ||
                filters.transmission.includes(
                    car.specs?.transmission || ""
                );


            const bodyMatch =
                !filters.bodyStyle?.length ||
                filters.bodyStyle.includes(
                    car.bodyStyle || ""
                );


            const engineMatch =
                !filters.engine?.length ||
                filters.engine.includes(
                    car.specs?.engine || ""
                );

            return (
                searchMatch &&
                brandParamMatch &&
                brandMatch &&
                fuelMatch &&
                transmissionMatch &&
                bodyMatch &&
                engineMatch
            );

        });

    }, [
        cars,
        search,
        brand,
        filters
    ]);


    const totalPage =
        Math.ceil(
            filteredCars.length / limit
        );


    const paginatedCars =
        useMemo(() => {

            const start =
                (page - 1) * limit;

            return filteredCars.slice(
                start,
                start + limit
            );

        },
            [filteredCars, page]
        );


    return {
        cars: paginatedCars,
        totalCars: filteredCars.length,
        totalPage,
        loading,
        refetch: fetchCars
    };

}