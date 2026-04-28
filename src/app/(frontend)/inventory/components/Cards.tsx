"use client"
import CarCard from '@/components/CarCard'
import Fitlter from '@/components/Fitlter'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useCars } from "@/app/hooks/cars/useCars";
import { useState } from "react";


export default function Cards() {
    const { totalCar } = useCars({})
    const [isClicked, setIsClicked] = useState(false)
    return (
        <div className="w-full xl:px-12 px-6 lg:mt-16 mt-12 flex flex-col lg:gap-8 gap-2 relative">
            {/* upper section */}
            <div className="flex flex-col gap-3">
                <div className="grid lg:grid-cols-[auto_1fr_auto] grid-cols-[1fr_auto] gap-12">
                    <div className="xl:w-[320px] lg:w-[200px] w-full">
                        <h1 className="capitalize text-[24px] font-semibold">In Stock Vehicles</h1>
                    </div>
                    <div className="lg:flex hidden">
                        <div
                            id="search"
                            className="w-full center justify-start! bg-white rounded-xl py-.5">
                            <label className="p-4">
                                <Image
                                    width={16}
                                    height={16}
                                    src="/svg/Magnifer.svg"
                                    alt="svg"

                                />
                            </label>
                            <input
                                type="text"
                                placeholder="Search...."
                                className="w-full h-full text-xl mr-6 border-none outline-none"
                            />
                        </div>
                    </div>
                    <div className="lg:w-[200px] center justify-end!">
                        <p className="text-[var(--primary-text-color)] text-[18px] font-semibold">{totalCar} Vehicles</p>
                    </div>
                </div>

                <div className="w-full center lg:hidden! justify-between! gap-3">
                    <div
                        id="search"
                        className="w-full center justify-start! bg-white rounded-xl py-.5">
                        <label className="p-4">
                            <Image
                                width={16}
                                height={16}
                                src="/svg/Magnifer.svg"
                                alt="svg"

                            />
                        </label>
                        <input
                            type="text"
                            placeholder="Search...."
                            className="w-full h-full text-xl mr-6 border-none outline-none"
                        />
                    </div>
                    <div>
                        <Button
                            className={'p-5 text-[18px] capitalize bg-[rgba(240,11,31,1)] text-[#f5f5f5]'}
                            onClick={() => setIsClicked(!isClicked)}
                        >
                            <Image
                                width={18}
                                height={18}
                                alt="svg"
                                src="/svg/Filter.svg"
                            />
                            <p>filter</p>
                        </Button>
                    </div>
                </div>
            </div>
            {/* lower section */}
            <div className={`w-full flex flex-row xl:gap-6 gap-3 relative ${isClicked ? 'flex-col!' : 'flex-row'}`}>
                {/* filter */}
                <div className={`sticky top-16 xl:w-[320px] lg:w-[200px] w-full h-fit bg-white lg:flex hidden ${isClicked ? 'flex! relative! top-0!' : 'hidden'}`}>
                    <Fitlter />
                </div>

                {/* car card  */}
                <div className="w-full">
                    <CarCard />
                </div>
            </div>
        </div>

    )
}
