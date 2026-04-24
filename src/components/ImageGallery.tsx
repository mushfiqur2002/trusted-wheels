"use client"

import { useRef, useState } from "react"
import Image from "next/image"


export default function ImageGallery({ gallery }: { gallery: string[] }) {
    console.log(gallery);
    const divRef = useRef<HTMLDivElement | null>(null);

    const [percentage, setPercentage] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(0)
    const [hover, setHover] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        // Get the bounding rectangle of the div
        const rect = divRef.current.getBoundingClientRect();

        // Calculate relative mouse position
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentages and clamp them between 0-100%
        const xPercent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        const yPercent = Math.min(Math.max((y / rect.height) * 100, 0), 100);

        setPercentage({ x: parseFloat(xPercent.toFixed(2)), y: parseFloat(yPercent.toFixed(2)) });
    }

    console.log(percentage);


    return (
        <div className="w-full grid grid-cols-2">
            <div className="flex flex-col gap-4">
                <div className="w-full h-[450px] rounded-lg overflow-hidden center relative cursor-zoom-in">
                    {/* MAIN IMAGE */}
                    <div
                        className="w-full h-full"
                        ref={divRef}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <Image
                            src={gallery[active]}
                            alt="car"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div
                        className={`absolute inset-0 pointer-events-none bg-no-repeat transition-opacity duration-200 ${hover ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            backgroundImage: `url(${gallery[active]})`,
                            backgroundSize: "200%",
                            backgroundPosition: `${percentage.x}% ${percentage.y}%`,
                        }}
                    />
                </div>
                {/* THUMBNAILS */}
                <div className="w-full flex gap-4 cursor-pointer overflow-x-auto scroll-smooth no-scrollbar">
                    {gallery.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setActive(index)}
                            className={`relative w-28 h-28 flex-shrink-0 border-2 rounded-xl overflow-hidden ${active === index
                                ? "border-red-500"
                                : "border-transparent brightness-60"
                                }`}

                        >
                            <Image
                                src={img}
                                alt="thumb"
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div></div>
        </div>
    )
}