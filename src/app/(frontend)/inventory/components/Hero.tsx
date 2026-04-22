"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Title from "@/components/Title";
import Fitlter from "@/components/Fitlter";

export default function Hero() {
    return (
        <div className="text-[var(--secondary-text-color)] bg-[var(--primary-background-color)]">
            {/* hero part  */}
            <div className="w-full h-auto md:pt-28 pt-20 center flex-col overflow-hidden relative">
                {/* tile floor */}
                <div className="w-full h-full flex flex-col justify-between absolute top-0 inset-0">
                    {/* top */}
                    <div className="w-full top-tile-floor"></div>
                </div>

                <div className="w-full">
                    {/* content */}
                    <div className="w-full">
                        <div className="w-full center flex-col text-[var(--secondary-text-color)] gap-4">
                            <div className="capitalize p-[.9px] mb-1 rounded-full bg-[rgba(240,11,31,.2)]">
                                <div className="px-3.5 py-1.5 rounded-full bg-[var(--primary-background-color)]">
                                    <p className="md:text-[12px] text-[10px] text-[var(--secondary-text-color)]">
                                        <span className="text-[var(--primary-text-color)]">in sltock</span> auto vehicles
                                    </p>
                                </div>
                            </div>


                            <Title
                                header="find your"
                                highlighted="perfect car"
                                varient="light"
                                heroSection={true}
                                position="middle"
                            />
                        </div>
                    </div>

                    {/* car */}
                    <div className="w-full h-auto relative center">
                        <div className='relative center w-fit lg:h-[300px] md:h-[250px] h-[150px] lg:rounded-4xl rounded-xl overflow-hidden'>
                            <img src="/images/cars/image 3030.png" alt='image' className="w-full h-full object-cover " />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-20 z-[9999] 
                                    bg-[linear-gradient(0deg,rgba(245,245,245,1)_10%,rgba(245,245,245,0.1)_90%)] 
                                    pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            {/* card part  */}
            <div className="w-full md:px-12 px-6 mt-16 flex flex-col gap-8">
                {/* upper section */}
                <div className="grid grid-cols-[auto_1fr_auto] gap-12">

                    <div className="w-[320px]">
                        <h1 className="capitalize text-[24px] font-semibold">In Stock Vehicles</h1>
                    </div>

                    <div>
                        <div
                            id="search"
                            className="w-auto center justify-start! bg-white rounded-xl py-.5">
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

                    <div className="w-[200px] flex items-center justify-end">
                        <p className="text-[var(--primary-text-color)] text-[18px] font-semibold">60 Vehicles</p>
                    </div>
                </div>
                {/* lower section */}
                <div className="grid grid-cols-[auto_1fr] gap-12">
                    {/* filter */}
                    <div className="w-[320px] bg-white">
                        <Fitlter />
                    </div>
                    <div>
                        <h1>display</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
