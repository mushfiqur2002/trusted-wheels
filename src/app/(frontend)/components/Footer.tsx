"use client"
import { socailLink } from "@/app/constants";
import Title from "@/components/Title";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";



export default function Footer() {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
    })
    return (
        <div className="w-full center flex-col md:pt-22 pt-16 relative">
            {/* first section */}
            <div className="w-full z-1">
                {/* title  */}
                <div>
                    <Title
                        header="visit"
                        highlighted="our showroom"
                        paragraph="We're open Monday to Saturday, ready to help you find your next ride."
                        position="middle"
                    />
                </div>

                {/* actual map  */}
                <div className="w-full h-full overflow-hidden relative mt-12">
                    <div className="absolute top-0 left-0 w-full h-36 z-[9999] 
                                    bg-[linear-gradient(180deg,rgba(245,245,245,1)_10%,rgba(245,245,245,0.1)_90%)] 
                                    pointer-events-none"
                    />
                    <div className="z-1">
                        <Map />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-36 z-[9999] 
                                    bg-[linear-gradient(0deg,rgba(245,245,245,1)_10%,rgba(245,245,245,0.1)_90%)] 
                                    pointer-events-none"
                    />
                </div>
            </div>

            {/* footer */}
            <div className="w-full h-auto absolute -bottom-50 z-2">
                <div className="lg:mx-12 md:mx-6 mx-0 md:p-12 p-6 bg-[var(--secondary-background-color)] md:rounded-tr-4xl md:rounded-tl-4xl rounded-none">
                    <div className="w-full flex justify-between items-start text-white lg:flex-row flex-col lg:gap-0 gap-6">
                        <div className="flex flex-col md:gap-2 gap-3 md:items-start items-center">
                            <Image
                                width={200}
                                height={100}
                                src="svg/full-logo-white.svg"
                                alt="logo"
                            />
                            <p className="lg:max-w-[470px] w-auto text-[16px] font-thin md:text-start text-center">We’re here to help you find the right car visit our showroom or reach out today.</p>
                        </div>

                        <div className="w-full flex md:flex-row flex-col lg:justify-end md:justify-between justify-center lg:gap-12 md:gap-24 md:bg-transparent bg-white/10 md:p-0 p-6 md:rounded-none rounded-xl">
                            {/* hours  */}
                            <div className="flex flex-col lg:gap-6 gap-3">
                                <h1 className="text-[20px] font-semibold capitalize lg:text-end md:text-start">our hours</h1>
                                <div className="flex lg:flex-col md:flex-row flex-col md:gap-3 gap-2">
                                    <div className="flex md:flex-col flex-row md:justify-start justify-between lg:items-end md:items-start items-center">
                                        <h2 className="text-[16px] font-normal capitalize">monday-satrday</h2>
                                        <p className="md:text-[14px] text-[16px] font-thin capitalize">10:00 am - 06:00 am</p>
                                    </div>
                                    <div className="flex md:flex-col flex-row md:justify-start justify-between lg:items-end md:items-start items-center">
                                        <h2 className="text-[16px] font-normal capitalize">sunday</h2>
                                        <p className="md:text-[14px] text-[16px] font-thin capitalize">by appointment only</p>
                                    </div>
                                </div>
                            </div>

                            {/* line */}
                            <div className="md:hidden flex w-full center" >
                                <div className="w-[95%] h-[1.5px] bg-white/20 rounded-full my-8" />
                            </div>

                            {/* contacts */}
                            <div className="flex flex-col lg:gap-6 gap-3">
                                <h1 className="text-[20px] font-semibold capitalize lg:text-end md:text-end">our contacts</h1>
                                <div className="flex md:flex-col flex-row md:justify-start justify-between  lg:gap-3 gap-1">
                                    <h2 className="center md:justify-end! gap-1 text-[16px] font-normal">
                                        <span>
                                            <Image width={16} height={16} alt="svg" src="/svg/Phone White.svg" />
                                        </span>
                                        <span>
                                            306-952-1270
                                        </span>
                                    </h2>
                                    <h2 className="center md:justify-end! gap-1 text-[16px] font-normal">
                                        <span>
                                            <Image width={16} height={16} alt="svg" src="/svg/Mail.svg" />
                                        </span>
                                        <span>
                                            sals@startngo.ca
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex md:flex-row flex-col justify-between items-center text-white md:mt-12 mt-6 md:gap-0 gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[20px] font-semibold capitalize md:text-start text-center">our hours</h1>
                            <p className="center md:justify-start! gap-1 md:text-[14px] text-[16px] font-thin capitalize">
                                <span>
                                    <Image
                                        width={16}
                                        height={16}
                                        alt="svg"
                                        src="/svg/Map Point.svg"
                                    />
                                </span>
                                <span>
                                    1710 Idylwyld Dr N, Saskatoon, Saskatchewan, S7L 1B3
                                </span>
                            </p>
                        </div>
                        <div>
                            <ul className="flex gap-4">
                                {
                                    socailLink.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={item.path}>
                                                    <div className="md:p-4 p-3 bg-white/10 rounded-xl">
                                                        <Image
                                                            width={18}
                                                            height={18}
                                                            alt="svg"
                                                            src={item.icon}
                                                        />
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
