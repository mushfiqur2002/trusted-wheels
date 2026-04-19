"use client"

import "./globals.css"
import { Urbanist } from "next/font/google"
import { useEffect, useState } from "react"
import Intro from "@/components/Intro"
import RouteLoader from "@/components/RouteLoader"

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showIntro, setShowIntro] = useState<null | boolean>(null)

  useEffect(() => {
    const visited = localStorage.getItem("visited")
    setShowIntro(!visited)
  }, [])

  const handleFinish = () => {
    localStorage.setItem("visited", "true")
    setShowIntro(false)
  }

  return (
    <html lang="en" className={urbanist.variable}>
      <body
        suppressHydrationWarning
        className="min-h-full font-[var(--font-urbanist)]"
      >
        {showIntro === true && <Intro onFinish={handleFinish} />}
        {showIntro === false && (
          <>
            <RouteLoader />
            {children}
          </>
        )}
      </body>
    </html>
  )
}