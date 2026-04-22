"use client"

import {
    motion,
    useMotionValue,
    useTransform,
    animate,
    useInView,
} from "framer-motion"
import { useEffect, useRef } from "react"

type NumberFormatProps = {
    value: number
}

export default function NumberFormat({ value }: NumberFormatProps) {
    const ref = useRef<HTMLSpanElement | null>(null)

    // 👀 detect when visible
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px", // trigger slightly early
    })

    const count = useMotionValue(0)

    // 🚀 start animation when in view
    useEffect(() => {
        if (!isInView) return

        const controls = animate(count, value, {
            duration: 3.5,
            ease: [0.22, 1, 0.36, 1],
        })

        return () => controls.stop()
    }, [isInView, value, count])

    // 🔢 format number (K, M, B)
    const formatted = useTransform(count, (latest) => {
        let num = latest
        let suffix = ""

        if (latest >= 1_000_000_000) {
            num = latest / 1_000_000_000
            suffix = "B"
        } else if (latest >= 1_000_000) {
            num = latest / 1_000_000
            suffix = "M"
        } else if (latest >= 1_000) {
            num = latest / 1_000
            suffix = "K"
        }

        return `${num.toFixed(1).replace(/\.0$/, "")}${suffix}`
    })

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.4 }}
        >
            {formatted}
        </motion.span>
    )
}