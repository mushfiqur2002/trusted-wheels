import Title from "@/components/Title";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full center flex-col md:pt-22 pt-16">
            {/* first section */}
            <div>
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
                <div>
                    {/* actual map  */}
                    <div className="w-[1920px] transform">
                        <Image
                            src="/images/Basemap image.png"
                            alt="map"
                            width={1920}
                            height={600}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                </div>
            </div>
            <div></div>
        </div>
    )
}
