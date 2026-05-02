"use client"
import NavBar from "@/components/NavBar";
import Footer from "../components/Footer";
import Script from "next/script"

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="afterInteractive"
            />
            <body
                suppressHydrationWarning={true}
                className="min-h-full font-[var(--font-urbanist)]"
            >
                <>
                    <NavBar change={true} />
                    {children}
                    <Footer />
                </>
            </body>
        </html>
    )
}