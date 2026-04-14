"use client"
import { cardList } from '@/app/constants'
import Image from 'next/image'
import React, { useState } from 'react'
import Title from './Title'
import { Button } from '@/components/ui/button'
export default function About() {
    const [activeTab, setActiveTab] = useState<"brands" | "types">("brands");
    return (
        <div className='w-full h-auto md:px-12 px-6 md:py-22 py-16 text-[var(--secondary-text-color)] flex flex-col md:gap-22 gap-16'>
            {/* first section value propositions */}
            <div className='flex flex-col lg:gap-16 gap-8'>
                <div>
                    <Title header='Why Choose' highlighted='trustedwheels?' paragraph={`We don't just sell cars; we build lasting relationships.`} />
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cardList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="w-full min-h-[120px] p-5 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                            >
                                <div className="w-fit h-fit bg-[rgba(240,11,31,0.08)] p-[10px] rounded-md">
                                    <Image
                                        src={item.imageSrc}
                                        alt="icon"
                                        width={20}
                                        height={20}
                                    />
                                </div>

                                <div className="pt-4">
                                    <p className="text-[16px] sm:text-[18px] font-medium capitalize leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 2nd section -> inventory */}
            <div className='w-full flex flex-col lg:gap-16 md:gap-6 gap-4'>
                <div className='flex justify-between lg:items-center md:items-start items-center lg:flex-row flex-col lg:gap-0 md:gap-6 gap-4'>
                    <Title header='Find Your' highlighted='Perfect Fit' paragraph='Shop our extensive inventory by your favorite brand or vehicle type.' />
                    <div className="relative flex w-fit p-1 bg-white rounded-lg">

                        {/* Sliding Background */}
                        <div
                            className={`absolute top-1 bottom-1 w-1/2 rounded-md bg-[rgba(240,11,31,1)] transition-all duration-300 ${activeTab === "brands" ? "left-1" : "left-[49%]"}`}
                        />

                        {/* Buttons */}
                        <Button
                            onClick={() => setActiveTab("brands")}
                            className={`relative z-10 capitalize px-8 py-6 md:text-[16px] text-[14px] font-semibold bg-transparent shadow-none ${activeTab === "brands"
                                ? "text-white"
                                : "text-[rgba(33,33,33,.6)]"
                                }`}
                        >
                            explore brands
                        </Button>

                        <Button
                            onClick={() => setActiveTab("types")}
                            className={`relative z-10 capitalize px-8 py-6 md:text-[16px] text-[14px] font-semibold bg-transparent shadow-none ${activeTab === "types"
                                ? "text-white"
                                : "text-[rgba(33,33,33,.6)]"
                                }`}
                        >
                            explore types
                        </Button>
                    </div>
                </div>

                <div className=''>
                    {
                        activeTab === "brands" ?
                            (
                                <div className='w-full center bg-white py-12'>
                                    <h1 className='text-2xl capitalize'>brands</h1>
                                </div>
                            ) : (
                                <div className='w-full center bg-white py-12'>
                                    <h1 className='text-2xl capitalize'>types</h1>
                                </div>
                            )
                    }
                </div>

                <div className='center'>
                    <Button className={`md:text-[16px] text-[14px] text-[rgba(240,11,31,1)] border-[rgba(240,11,31,.3)] capitalize font-semibold bg-[rgba(240,11,31,.1)] md:p-6 p-5 `}>view more</Button>
                </div>
            </div>

            {/* 3rd section -> trust building  */}
            <div className='w-full flex flex-col lg:gap-16 gap-8'>
                <div>
                    <Title header='Transparency and' highlighted='care in every deal' paragraph='Every vehicle goes through an extensive inspection process so you can drive away with absolute confidence.' />
                </div>

                <div className='grid lg:grid-cols-2 grid-cols-1 xl:gap-12 gap-6'>
                    <div className='w-full lg:h-[463px] md:h-[300px] h-[200px] rounded-4xl overflow-hidden'>
                        <img src="/woman-enjoying-her-financially-independence-while-buying-car 1.png" className='w-full h-full object-cover xl:object-center lg:object-right object-top' alt='image' />
                    </div>
                    <div className='center flex-col lg:gap-12 gap-6'>
                        <div className='w-full grid grid-cols-3 bg-white md:p-6 p-4 rounded-xl'>
                            <div className='flex flex-col justify-center items-start'>
                                <p className='md:text-[32px] text-[28px] font-semibold'>100<span className='text-[rgba(240,11,31,1)]'>+</span></p>
                                <p className='md:text-[16px] text-[12px] font-normal capitalize'>point inspection</p>
                            </div>
                            <div className='flex flex-col justify-center items-start'>
                                <p className='md:text-[32px] text-[28px] font-semibold'>5<span className='text-[rgba(240,11,31,1)]'>+</span></p>
                                <p className='md:text-[16px] text-[12px] font-normal capitalize'>years of experience</p>
                            </div>
                            <div className='flex flex-col justify-center items-start'>
                                <p className='md:text-[32px] text-[28px] font-semibold'>10K<span className='text-[rgba(240,11,31,1)]'>+</span></p>
                                <p className='md:text-[16px] text-[12px] font-normal capitalize'>happy customers</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <p className='md:text-[24px] text-[16px] font-medium text-justify'>We are committed to making your car-buying experience simple, honest, and stress-free. Every vehicle is carefully selected and inspected by experienced professionals to ensure quality you can trust. From start to finish, our focus is on transparency and customer satisfaction.</p>
                            <div className='flex lg:justify-end justify-center'>
                                <Button className={`md:text-[16px] text-[14px] text-[rgba(240,11,31,1)] border-[rgba(240,11,31,.3)] capitalize font-semibold bg-[rgba(240,11,31,.1)] md:p-6 p-5 `}>view more</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
