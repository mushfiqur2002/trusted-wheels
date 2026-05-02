"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@base-ui/react";
import Price from "@/components/Price";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import Title from "../../../components/Title";
import CustomButton from "@/components/CustomButton";
import { motion } from "motion/react";
import { carousel } from "@/constants/filterData";

export default function Hero() {
    const [current, setCurrent] = useState(0)
    const [api, setApi] = useState<EmblaCarouselType>()

    useEffect(() => {
        if (!api) return

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap())
        }

        api.on("select", onSelect)

        requestAnimationFrame(() => {
            setCurrent(api.selectedScrollSnap())
        })

        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    return (
        <div className="w-full h-auto md:pt-28 pt-20 center flex-col relative overflow-hidden bg-[linear-gradient(90deg,rgba(22,_22,_22,_1)_0%,_rgba(37,_37,_37,_1)_53%,_rgba(22,_22,_22,_1)_100%)] z-1">

            {/* tile floor */}
            <div className="w-full h-full flex flex-col justify-between absolute top-0 inset-0 z-2">
                {/* top */}
                <div className="w-full top-tile-floor"></div>

                {/* bottom */}
                <div className="w-full bottom-tile-floor"></div>
            </div>

            {/* red blob */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] 
      bg-[radial-gradient(circle,rgba(255,71,87,.45)_6%,rgba(0,0,0,1)_75%)] 
      blur-3xl opacity-70 blob 
      rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"
                />
            </div>

            {/* content */}
            <div className="w-full z-4">
                {/* carousel */}
                <div className="w-full center flex-col">

                    <div className="w-full center flex-col text-[var(--secondary-text-color)] gap-4">
                        <div className="capitalize p-[.9px] mb-1 rounded-full bg-[linear-gradient(90deg,rgba(33,33,34,1)0%,rgba(255,255,255,1)50%,rgba(33,33,33,1)100%)]">
                            <div className="px-3.5 py-1.5 rounded-full bg-[linear-gradient(90deg,rgba(22,_22,_22,_1)_0%,_rgba(37,_37,_37,_1)_53%,_rgba(22,_22,_22,_1)_100%)]">
                                <p className="md:text-[12px] text-[10px] text-white">
                                    <span className="text-[var(--primary-text-color)]">trusted</span> auto dealership
                                </p>
                            </div>
                        </div>


                        <Title
                            header="drive your"
                            highlighted="dream today"
                            paragraph="Vancouver’s most trusted dealership. Clear deals, affordable rides, and flexible finance options for everyone"
                            varient="dark"
                            heroSection={true}
                            position="middle"
                        />
                    </div>

                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.9, 1] }}
                        className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 pt-4"
                    >
                        <Carousel
                            opts={{
                                loop: true,
                                align: "center",
                            }}
                            setApi={setApi}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {carousel.map((car, index) => {
                                    const isActive = index === current;

                                    return (
                                        <CarouselItem
                                            key={index}
                                            className="pl-2 md:pl-4 basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[45%] flex justify-center"
                                        >
                                            <div
                                                className={`w-full transition-all duration-500 ease-out ${isActive
                                                    ? "scale-100 opacity-100"
                                                    : "scale-60 opacity-60"
                                                    }`}
                                            >
                                                <Card className="w-full h-[300px] md:h-[320px] lg:h-[400px] xl:h-[460px] border-0 shadow-none bg-transparent">
                                                    <CardContent className="relative w-full h-full">

                                                        {/* Image */}
                                                        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px]">
                                                            <Image
                                                                src={car.images?.display || "/fallback.png"}
                                                                alt="car"
                                                                fill
                                                                className="object-contain object-top"
                                                            />
                                                        </div>

                                                        {/* BODY STYLE */}
                                                        <div
                                                            className={`hidden lg:flex absolute top-0 left-4 transition-all duration-300 ${isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 translate-y-2"
                                                                }`}
                                                        >
                                                            <p className="text-[14px] lg:text-[16px] text-white/60 px-4 py-1.5 bg-black rounded-full capitalize shadow-[0px_0px_1px_1px_rgba(240,11,31,.5)]">
                                                                body style : <span className="text-white">{car.bodyStyle}</span>
                                                            </p>
                                                        </div>

                                                        {/* FUEL */}
                                                        <div
                                                            className={`hidden lg:flex absolute top-12 right-4 transition-all duration-300 ${isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 translate-y-2"
                                                                }`}
                                                        >
                                                            <p className="text-[14px] lg:text-[16px] text-white/60 px-4 py-1.5 bg-black rounded-full capitalize shadow-[0px_0px_1px_.5px_rgba(240,11,31,.5)]">
                                                                fuel type : <span className="text-white">{car.specs?.fuelType}</span>
                                                            </p>
                                                        </div>

                                                        {/* ENGINE */}
                                                        <div
                                                            className={`hidden lg:flex absolute top-40 left-4 transition-all duration-300 ${isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 translate-y-2"
                                                                }`}
                                                        >
                                                            <p className="text-[14px] lg:text-[16px] text-white/60 px-4 py-1.5 bg-black rounded-full capitalize shadow-[0px_0px_1px_.5px_rgba(240,11,31,.5)]">
                                                                engine : <span className="text-white">{car.specs?.engine}</span>
                                                            </p>
                                                        </div>

                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>
                </div>

                {/* carousel info */}
                <div className="w-full flex items-center justify-center absolute bottom-0 px-1 md:px-0">
                    <Button
                        onClick={() => api?.scrollPrev()}
                        className="cursor-pointer center bg-[rgba(240,11,31,0.1)] px-3 md:px-6 py-4 md:py-3 rounded-xl"
                    >
                        <Image src="svg/Arrow Right.svg" width={22} height={22} alt="svg" />
                    </Button>

                    <div className="w-full md:w-[540px] max-w-[540px] md:flex grid grid-cols-1 md:justify-between md:items-center items-start p-4 md:p-6 mx-2 md:mx-6 bg-white shadow-[0px_-5px_5px_1px_rgba(240,_11,_31,_.1)] rounded-t-2xl">

                        <div className="flex justify-between md:flex-col flex-row">
                            <p className="font-semibold text-[20px] text-[rgba(33,33,33,1)]">
                                {carousel[current]?.title}
                            </p>
                            <p className="text-[24px] font-semibold text-[var(--primary-text-color)]">
                                <Price value={carousel[current]?.price || 0} />
                            </p>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-2 w-auto mt-2 md:mt-0">
                            <CustomButton
                                path={`/inventory/${carousel[current]?.id}-${carousel[current]?.slug}`}
                                text="Details"
                                types="secondary"
                            />

                            <CustomButton
                                path="/about"
                                text="about us"
                                types="primary"
                                exception={true}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => api?.scrollNext()}
                        className="cursor-pointer center bg-[rgba(240,11,31,0.1)] px-3 md:px-6 py-4 md:py-3 rounded-xl"
                    >
                        <Image
                            src="svg/Arrow Right.svg"
                            width={22}
                            height={22}
                            alt="svg"
                            className="rotate-180"
                        />
                    </Button>

                </div>
            </div>
        </div>
    )
}
