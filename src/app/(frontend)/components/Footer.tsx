"use client"
import Title from "@/components/Title";
import dynamic from "next/dynamic";



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

                {/* base map  */}
                <div className="">
                    {/* actual map  */}
                    <div className="w-full h-full overflow-hidden">
                        <Map />
                    </div>

                </div>
            </div>
            <div></div>
        </div>
    )
}
