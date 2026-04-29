import NavBar from "@/components/NavBar";
import Footer from "../components/Footer";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
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