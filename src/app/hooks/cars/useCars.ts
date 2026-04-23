"use client"
import { carInfo } from "@/constants";
import { useMemo } from "react";

type PropsType = {
    page?: number
}
export function useCars({ page = 1 }: PropsType) {
    const currentPage = page
    const limit = 12
    const totalCar = carInfo.reduce((total, item) => total + item.quantity, 0);
    const totalPage = Math.ceil(carInfo.length / limit)
    const data = useMemo(() => {
        const start = (page - 1) * limit;
        return carInfo.slice(start, start + limit)
    }, [page])

    return {
        limit,
        totalCar,
        totalPage,
        data,
        currentPage
    }
}