"use client"
import Title from "@/components/Title";
import dynamic from "next/dynamic";
import Image from "next/image";



export default function Footer() {
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
    })
    return (
        <div className="w-full center flex-col md:pt-22 pt-16">
            {/* first section */}
            <div className="w-full">
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
            <div className="w-full h-auto">
                <div className="md:mx-12 mx-6 bg-[var(--secondary-background-color)]">
                    <div>
                        <div>
                            <Image
                                width={200}
                                height={100}
                                src="svg/full-logo-white.svg"
                                alt="logo"
                            />
                            <p>We’re here to help you find the right car visit our showroom or reach out today.</p>
                        </div>
                        <div>
                            <div>
                                <h1>our hours</h1>
                                <div>
                                    <h2>monday-satrday</h2>
                                    <p>10:00 am - 06:00 am</p>
                                </div>
                                <div>
                                    <h2>sunday</h2>
                                    <p>by appointment only</p>
                                </div>
                            </div>
                            <div>
                                <h1>our contatacts</h1>
                                <h2>
                                    <span>
                                        <Image width={16} height={16} alt="svg" src="/svg/Phone White.svg" />
                                    </span>
                                    <span>
                                        306-952-1270
                                    </span>
                                </h2>
                                <h2>
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
                    <div></div>
                </div>
            </div>
        </div>
    )
}
