import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Urbanist } from 'next/font/google'
import NavBar from "@/components/NavBar";

const urbanist = Urbanist({
  subsets: ['latin'],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
// src/app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"
        cz-shortcut-listen="true"
        data-new-gr-c-s-check-loaded="14.1282.0"
        data-gr-ext-installed="">
        <NavBar />
        {children}
      </body>
    </html >
  )
}

