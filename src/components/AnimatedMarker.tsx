"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import MapCard from "./MapCard"

interface AnimatedMarkerProps {
    pos: { x: number; y: number }
}

export default function AnimatedMarker({ pos }: AnimatedMarkerProps) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const handleClick = () => setOpen(false)
        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)
    }, [])

    return (
        <div
            className="absolute z-[999] w-20 h-20"
            style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -100%)",
            }}
        >
            <div className="w-full h-full relative">

                {/* Waves */}
                <motion.span
                    className="absolute w-full h-full rounded-full bg-[rgba(240,11,31,.25)]"
                    animate={{ scale: [0, 1.8, 0], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                <motion.span
                    className="absolute w-full h-full rounded-full bg-[rgba(240,11,31,.25)]"
                    animate={{ scale: [0, 1.8, 0], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1.65 }}
                />

                {/* Marker */}
                <motion.div
                    onClick={(e) => { e.stopPropagation(); setOpen(!open)}}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    whileTap={{ y: -25 }}
                    className="absolute flex flex-col items-center justify-center -top-2.5 left-2.5 cursor-pointer"
                >

                    {/* 🔥 Popup */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2"
                            >
                                <MapCard />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Icon */}
                    <Image
                        width={62}
                        height={62}
                        alt="svg"
                        src="/svg/location.svg"
                    />
                </motion.div>

            </div>
        </div>
    )
}