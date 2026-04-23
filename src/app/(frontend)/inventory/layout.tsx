import NavBar from "@/components/NavBar";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning
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