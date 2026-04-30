"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { FiX } from "react-icons/fi";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";

export type PropsType = {
    change?: boolean
}
const NavBar = ({ change = false }: PropsType) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`max-w-[1920px] w-full h-20 top-0 center z-100000000 ${isScrolled || isMobileMenuOpen ? "bg-[var(--primary-background-color)] fixed shadow-[0px_1px_15px_5px_rgba(240,_11,_31,_.06)]" : "bg-transparent absolute"}`}
            >
                <motion.div
                    className="max-w-[1440px] w-full flex justify-between items-center 2xl:px-16 xl:px-12 lg:px-10 md:px-12 px-5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {/* Logo */}
                    <motion.div
                        className=""
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isScrolled || isMobileMenuOpen ?
                            <Image width={220} height={100} src="/svg/full-logo.svg" alt="logo" /> :
                            (
                                change ?
                                    <Image width={220} height={100} src="/svg/full-logo.svg" alt="logo" /> :
                                    <Image width={220} height={100} src="/svg/full-logo-white.svg" alt="logo" />
                            )
                        }
                    </motion.div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex">
                        <ul className="center 2xl:gap-12 gap-6">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;

                                return (
                                    <li
                                        key={index}
                                        className={`font-normal text-md ${isActive
                                            ? "text-[rgba(240,11,31,1)]"
                                            : isScrolled
                                                ? "text-[#212121]"
                                                : change
                                                    ? "text-[#212121]"
                                                    : "text-white"
                                            }`}
                                    >
                                        <Link href={link.href}>{link.name}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Desktop Button */}
                    <motion.div className="">
                        <div className="hidden lg:flex gap-2">
                            <CustomButton
                                path={process.env.NEXT_PUBLIC_MAP_LINK || 'https://www.google.com/maps'}
                                blankTarget={true}
                                imageSrc="/svg/Map Point.svg"
                                onlySVG={true}
                                navbar={true}
                                types="secondary"
                            />
                            <CustomButton
                                imageSrc="/svg/Phone.svg"
                                types="primary"
                                reverse={true}
                                navbar={true}
                                contact={true}
                                blankTarget={true}
                            />
                        </div>
                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className="lg:hidden flex"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <FiX size={28} color="rgba(240,11,31,1)" /> : <Image width={28} height={28} alt="svg" src="/svg/Menu.svg" />}
                        </motion.button>
                    </motion.div>

                </motion.div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full absolute top-14 z-100 bg-[var(--primary-background-color)] backdrop-blur-md lg:hidden"
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center justify-center w-full h-[100vh] gap-6"
                            >
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={link.href}
                                            onClick={closeMobileMenu}
                                            className={`text-2xl font-bold transition-colors ${isActive
                                                ? "text-[rgba(240,11,31,1)]"
                                                : "text-[var(--secondary-text-color)]"
                                                }`}
                                        >
                                            {link.name}
                                        </motion.a>
                                    );
                                })}

                                <div className="flex lg:hidden gap-2 pt-12">
                                    <CustomButton
                                        path={process.env.NEXT_PUBLIC_MAP_LINK || 'https://www.google.com/maps'}
                                        blankTarget={true}
                                        imageSrc="/svg/Map Point.svg"
                                        onlySVG={true}
                                        navbar={true}
                                        types="secondary"
                                    />
                                    <CustomButton
                                        path="/"
                                        text="306-952-1207"
                                        imageSrc="/svg/Phone.svg"
                                        types="primary"
                                        reverse={true}
                                        navbar={true}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default NavBar;
