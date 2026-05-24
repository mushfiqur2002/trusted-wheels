"use client";

import { getCars } from "@/app/api/fetchData/fetchingData";
import { useEffect, useState } from "react";
import { CarInfoType } from "@/constants";

export function useCar(id: string) {

    const [car, setCar] =
        useState<CarInfoType | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        if (!id) return;


        const fetchCar = async () => {

            try {

                setLoading(true);

                const cars =
                    await getCars();

                const foundCar =
                    cars.find(
                        (item) =>
                            item.$id === id
                    );

                setCar(
                    foundCar || null
                );

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };


        fetchCar();

    }, [id]);


    return {

        car,
        loading

    };

}