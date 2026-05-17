"use client"

import '../globals.css'
import { Urbanist } from "next/font/google"

const urbanist = Urbanist({
    subsets: ["latin"],
    variable: "--font-urbanist",
})

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={urbanist.variable}>
            <head>
                <title>Trusted Wheels Admin</title>
                <meta name="description" content="Trusted Wheels is a car dealership website that offers a wide range of high-quality vehicles. We are committed to providing our customers with the best possible service and ensuring that they find the perfect car for their needs." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/svg/logo.svg" />
            </head>
            <body
                suppressHydrationWarning
                className="min-h-full font-[var(--font-urbanist)]"
            >
                <>
                    {children}
                </>
            </body>
        </html>
    )
}