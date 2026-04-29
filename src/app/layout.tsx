"use client"

import "./globals.css"
import { Urbanist } from "next/font/google"
import { useState } from "react"
import Intro from "@/components/Intro"

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showIntro, setShowIntro] = useState<null | boolean>(() => {
    if (typeof window === "undefined") return null
    const visited = localStorage.getItem("visited")
    return !visited
  })

  const handleFinish = () => {
    localStorage.setItem("visited", "true")
    setShowIntro(false)
  }

  return (
    <html lang="en" className={urbanist.variable}>
      <head>
        <title>Trusted Wheels</title>
        <meta name="description" content="Trusted Wheels is a car dealership website that offers a wide range of high-quality vehicles. We are committed to providing our customers with the best possible service and ensuring that they find the perfect car for their needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/svg/logo.svg" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full font-[var(--font-urbanist)]"
      >
        {showIntro === true && <Intro onFinish={handleFinish} />}
        {showIntro === false && (
          <>
            {children}
          </>
        )}
      </body>
    </html>
  )
}