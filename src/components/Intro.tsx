"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Intro({ onFinish }: { onFinish: () => void }) {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">

            <motion.div
                initial={{
                    scale: 0.5,
                    x: 0,
                    y: 0,
                    opacity: 1,
                }}
                animate={{
                    scale: [0.5, 1.3, 1, 1],
                    x: [
                        0,
                        0,
                        window.innerWidth < 768 ? "-25vw" : "-40vw",
                        window.innerWidth < 768 ? "-25vw" : "-40vw",
                    ],
                    y: [0, 0, "-46vh", "-46vh"],
                    opacity: [1, 1, 1, 1], // 👈 fade ONLY at end
                }}
                transition={{
                    duration: 3.5,
                    times: [0, 0.3, 0.8, 1],     
                    ease: "easeInOut",
                }}
                onAnimationComplete={onFinish}
            >
                <Image
                    width={220}
                    height={220}
                    src="/svg/full-logo-white.svg"
                    alt="logo"
                />
            </motion.div>

        </div>
    )
}