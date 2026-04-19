"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function RouteLoader() {
    const pathname = usePathname()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const showTimeout = setTimeout(() => {
            setLoading(true)
        }, 0)

        const hideTimeout = setTimeout(() => {
            setLoading(false)
        }, 400) // small delay for UX

        return () => {
            clearTimeout(showTimeout)
            clearTimeout(hideTimeout)
        }
    }, [pathname])

    if (!loading) return null

    return (
        <div className="fixed inset-0 z-[9998] bg-black/40 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
    )
}