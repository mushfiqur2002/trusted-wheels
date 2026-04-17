"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedMarkerProps {
    pos: { x: number; y: number }
}

export default function AnimatedMarker({ pos }: AnimatedMarkerProps) {
    return (
        <div
            className="absolute z-[999] w-20 h-20"
            style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -100%)",
            }}
        >

            {/* 🔴 Wave 1 */}
            <motion.span
                className="absolute w-full h-full rounded-full bg-[rgba(240,11,31,.25)]"
                animate={{
                    scale: [0, 1.8, 0],
                    opacity: [0.5, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.3, 1], // custom easing
                }}
            />

            {/* 🔴 Wave 2 (delayed but synced) */}
            <motion.span
                className="absolute w-full h-full rounded-full bg-[rgba(240,11,31,.25)]"
                animate={{
                    scale: [0, 1.8, 0],
                    opacity: [0.5, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1], // custom easing
                    delay: 1.65
                }}
            />


            {/* 📍 SVG Marker (SYNCED TIMING) */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileTap={{ y: [0, -25, 0] }}
                className="absolute flex items-center justify-center -top-2.5 left-2.5"
            >
                <Image
                    width={62}
                    height={62}
                    alt="svg"
                    src="/svg/location.svg"
                />
            </motion.div>

        </div>
    )
}