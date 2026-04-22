"use client"
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@base-ui/react";
import Price from "@/components/Price";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { carsCarousel } from "@/constants";
import type { EmblaCarouselType } from "embla-carousel";
import Title from "../../../components/Title";
import CustomButton from "@/components/CustomButton";
import { motion } from "motion/react";

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
                        className="2xl:max-w-[1920px] max-w-[1440px] w-full mx-auto w-full xl:pt-6 pt-2">
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
                                            className="md:basis-1/3 basis-full flex justify-center"
                                        >
                                            <div
                                                className={`transition-all duration-500 ${isActive
                                                    ? "scale-100"
                                                    : "scale-50 opacity-50"
                                                    }`}
                                            >
                                                <Card className="2xl:w-[860px] xl:w-[800px] lg:w-[550px] sm:w-[450px] w-[400px] 2xl:h-[550px] xl:h-[500px] lg:h-[400px] md:h-[350px] h-[325px] border-0 shadow-none bg-transparent">
                                                    <CardContent className="relative w-full h-full">


                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={car.image}
                                                                alt={car.name}
                                                                fill
                                                                className="object-contain object-top"
                                                            />
                                                        </div>

                                                        {/* bodyStyle */}
                                                        <span
                                                            className={`md:flex hidden absolute top-10 left-15 flex justify-start items-start transition-all duration-300 ${isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 translate-y-2 pointer-events-none"
                                                                }`}
                                                        >
                                                            <p className="capitalize text-white/60 px-4 py-1 bg-[var(--secondary-background-color)] rounded-full text-[14px]">
                                                                body styles:
                                                                <span className="text-white pl-1">
                                                                    {car.metaData?.bodyStyle}
                                                                </span>
                                                            </p>
                                                            <Image
                                                                src="svg/Frame 2147238816.svg"
                                                                alt="svg"
                                                                width={100}
                                                                height={100}
                                                                className="mt-3"
                                                            />
                                                        </span>

                                                        {/* fuel */}
                                                        <span
                                                            className={`md:flex hidden absolute top-5 right-50 flex flex-col justify-center items-center transition-all duration-300 ${isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 translate-y-2 pointer-events-none"
                                                                }`}
                                                        >
                                                            <p className="capitalize text-white/60 px-4 py-1 bg-[var(--secondary-background-color)] rounded-full text-[14px]">
                                                                fuel:
                                                                <span className="text-white pl-1">
                                                                    {car.metaData?.fuel}
                                                                </span>
                                                            </p>
                                                            <Image
                                                                src="svg/Frame 2147238816.svg"
                                                                alt="svg"
                                                                width={100}
                                                                height={100}
                                                                className="mt-3 origin-top-center rotate-90"
                                                            />
                                                        </span>

                                                        {/* engine */}
                                                        <span
                                                            className={`md:flex hidden absolute bottom-60 left-25 flex justify-center items-start transition-all duration-300 ${isActive
                                                                ? "opacity-100 translate-y-0"
                                                                : "opacity-0 translate-y-2 pointer-events-none"
                                                                }`}
                                                        >
                                                            <p className="capitalize text-white/60 px-4 py-1 bg-[var(--secondary-background-color)] rounded-full text-[14px]">
                                                                engine:
                                                                <span className="text-white pl-1">
                                                                    {car.metaData?.engine}
                                                                </span>
                                                            </p>
                                                            <Image
                                                                src="svg/Frame 2147238816.svg"
                                                                alt="svg"
                                                                width={100}
                                                                height={100}
                                                                className="mt-3"
                                                            />
                                                        </span>

                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    )
                                })}
                            </CarouselContent>
                        </Carousel>
                    </motion.div>
                </div>

                {/* carousel info */}
                <div className="w-full flex items-center justify-center absolute bottom-0 px-1 md:px-0">
                    <Button
                        onClick={() => api?.scrollPrev()}
                        className="center bg-[rgba(240,11,31,0.1)] px-3 md:px-6 py-4 md:py-3 rounded-xl"
                    >
                        <Image src="svg/Arrow Right.svg" width={22} height={22} alt="svg" />
                    </Button>

                    <div className="w-full md:w-[540px] max-w-[540px] md:flex grid grid-cols-1 md:justify-between md:items-center items-start p-4 md:p-6 mx-2 md:mx-6 bg-white shadow-[0px_-5px_5px_1px_rgba(240,_11,_31,_.1)] rounded-t-2xl">

                        <div className="flex justify-between md:flex-col flex-row">
                            <p className="font-semibold text-[20px] text-[rgba(33,33,33,1)]">
                                {carsCarousel[current]?.name}
                            </p>
                            <p className="text-[24px] font-semibold text-[var(--primary-text-color)]">
                                <Price value={carsCarousel[current]?.price} />
                            </p>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] gap-2 w-auto mt-2 md:mt-0">
                            <CustomButton
                                path="/"
                                text="Details"
                            />

                            <CustomButton
                                path="/"
                                text="contact us"
                                types="primary"
                                exception={true}
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => api?.scrollNext()}
                        className="center bg-[rgba(240,11,31,0.1)] px-3 md:px-6 py-4 md:py-3 rounded-xl"
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
