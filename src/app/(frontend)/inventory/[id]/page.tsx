"use client"
import ImageGallery from "@/components/ImageGallery";
import { carInfo } from "@/constants";
import { useParams } from "next/navigation";

export default function InventoryDetails({ }) {
    const { id } = useParams()
    const slugId = typeof id === 'string' ? id.split('-') : []
    const ID = slugId[0]
    const data = carInfo.find((item) => item.id === ID);

    return (
        <div className="w-full flex flex-col xl:px-12 px-6 mt-20 text-[var(--secondary-text-color)] bg-[var(--primary-background-color)]">
            <h1 className="capitalize flex gap-1 text-[18px] font-medium">
                <span>inventory</span>
                <span>{`>`}</span>
                <span className="text-[rgba(240,11,31,1)]">details</span>
            </h1>
            <p>{ID}</p>
            {/* image gallery */}
            <div>
                <ImageGallery gallery={data?.images?.gallery ?? []} />
            </div>
        </div>
    )
}
