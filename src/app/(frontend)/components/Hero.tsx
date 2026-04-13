"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@base-ui/react";
import Price from "@/components/Price";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { carsCarousel } from "@/app/constants";

export default function Hero() {
    const [current, setCurrent] = useState(0)
    const [api, setApi] = useState()

    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])
    return (
        <div className="w-full h-auto 2xl:pt-36 md:pt-32 pt-28 center flex-col relative overflow-hidden">

            {/* tile floor */}
            <div className="w-full h-full flex flex-col justify-between absolute top-0 inset-0 -z-10">
                {/* top */}
                <div className="w-full tile-floor"></div>

                {/* bottom */}
                <div className="w-full nd-tile-floor"></div>
            </div>

            {/* carousel */}
            <div className="center flex-col">

                <div className="center flex-col text-[var(--secondary-text-color)]">
                    <p className="capitalize px-3 py-1 mb-1 rounded-full border border-[var(--primary-border-color)] md:text-[12px] text-[10px] bg-[var(--third-background-color)] shadow-[0px_-5px_9px_0px_rgba(0,_0,_0,_.09)]">
                        <span className="text-[var(--primary-text-color)]">trusted</span> auto dealership
                    </p>

                    <h1 className="2xl:text-[64px] lg:text-[50px] md:text-[52px] sm:text-[42px] text-[30px] uppercase font-medium">
                        drive your <span className="effect">dream today</span>
                    </h1>

                    <p className="2xl:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] text-center opacity-60">
                        Vancouver’s most trusted dealership. Clear deals, affordable rides,
                        <br />
                        and flexible finance options for everyone
                    </p>
                </div>

                <div className="max-w-[1440px] mx-auto 2xl:pt-12 pt-6 w-full">
                    <Carousel
                        opts={{
                            loop: true,
                            align: "center",
                        }}
                        setApi={setApi}
                        className="w-full h-auto overflow-hidden"
                    >
                        <CarouselContent>
                            {carsCarousel.map((car, index: number) => {
                                const isActive = index === current

                                return (
                                    <CarouselItem
                                        key={index}
                                        className="basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
                                    >
                                        <div
                                            className={`transition-all duration-500 ${isActive
                                                ? "scale-100"
                                                : "scale-50"
                                                }`}
                                        >
                                            <Card className="md:w-[840px] w-[700px] md:h-[450px] h-[400px] border-0 shadow-none bg-transparent">
                                                <CardContent className="px-28 relative">
                                                    <Image
                                                        src={car.image}
                                                        alt={car.name}
                                                        width={100}
                                                        height={100}
                                                        className="object-contain w-full h-full"
                                                    />
                                                    <span className="absolute top-0 px-4 py-1 bg-[var(--secondary-background-color)] rounded-full text-[14px]">
                                                        <p className="capitalize text-white/60">
                                                            body styles:
                                                            <span className="text-white">
                                                                {car.metaData?.bodyStyle}
                                                            </span>
                                                        </p>
                                                        <Image src="/Frame 2147238816.svg" alt="svg"/>
                                                    </span>
                                                    <span>{car.metaData.fuel}</span>
                                                    <span>{car.metaData.engine}</span>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            })}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>

            {/* carousel info */}
            <div className="w-full flex items-center justify-center absolute bottom-0 px-1 md:px-0">

                <Button
                    onClick={() => api?.scrollPrev()}
                    className="center bg-[rgba(240,11,31,0.1)] px-3 md:px-6 py-4 md:py-3 rounded-xl"
                >
                    <Image src="/Arrow Right.svg" width={22} height={22} alt="svg" />
                </Button>

                <div className="w-full md:w-[540px] max-w-[540px] md:flex grid grid-cols-2 md:justify-between md:items-center items-start p-4 md:p-6 mx-2 md:mx-6 bg-white shadow-[0px_-5px_5px_1px_rgba(240,_11,_31,_.1)] rounded-t-2xl">

                    <div>
                        <p className="font-semibold text-[20px] text-[rgba(33,33,33,1)]">
                            {carsCarousel[current]?.name}
                        </p>
                        <p className="text-[24px] font-semibold text-[var(--primary-text-color)]">
                            <Price value={carsCarousel[current]?.price} />
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-2 md:mt-0">
                        <Button className="w-full md:w-auto center bg-[rgba(240,11,31,0.1)] text-[rgba(240,11,31,1)] px-6 py-3 rounded-lg text-[16px] font-semibold">
                            Details
                        </Button>

                        <Button className="w-full md:w-auto center bg-[rgba(240,11,31,1)] text-white px-6 py-3 rounded-lg text-[16px] font-semibold">
                            Contact Us
                        </Button>
                    </div>
                </div>

                <Button
                    onClick={() => api?.scrollNext()}
                    className="center bg-[rgba(240,11,31,0.1)] px-3 md:px-6 py-4 md:py-3 rounded-xl"
                >
                    <Image
                        src="/Arrow Right.svg"
                        width={22}
                        height={22}
                        alt="svg"
                        className="rotate-180"
                    />
                </Button>

            </div>
        </div>
    )
}
