"use client"
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";


const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                className="w-full h-24 absolute top-0 center z-100"
            >
                <motion.div
                    className="w-full flex justify-between items-center 2xl:px-16 xl:px-12 lg:px-10 md:px-12 px-5"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {/* Logo */}
                    <motion.div
                        className=""
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Image width={220} height={100} src="/full-logo.svg" alt="logo" className="hidden lg:flex" />
                        <Image width={45} height={45} src="/logo.svg" alt="logo" className="flex lg:hidden" />
                    </motion.div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex">
                        <ul className="center 2xl:gap-12 gap-6">
                            {navLinks.map((link, index) => (
                                <li key={index} className="text-[#212121]">
                                    <Link href={link.href}>{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop Button */}
                    <motion.div className="center gap-2">
                        <Button className={"center bg-[rgba(240,11,31,0.1)] p-6 rounded-xl"}>
                            <Image width={16} height={16} alt="svg" src="/Magnifer Minimalistic.svg" />
                        </Button>
                        <div className="hidden lg:flex">
                            <Button className={"center bg-[rgba(240,11,31,1)] text-white p-6 rounded-lg text-[16px] font-semibold hidden lg:flex"}>
                                Browse Inventory
                            </Button>
                        </div>
                        {/* Mobile Menu Toggle */}
                        <motion.button
                            className="lg:hidden flex p-3 text-[rgba(255,255,255,.85)] bg-[rgba(240,11,31,1)] rounded-xl"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
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
                            className="w-full absolute top-24 z-100 bg-[var(--primary-background-color)] backdrop-blur-md lg:hidden"
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center justify-center w-full h-[100vh] gap-6"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                        className="text-4xl font-bold text-[var(--secondary-text-color)] transition-colors"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <div className="flex lg:hidden">
                                    <Button className={"center bg-[rgba(240,11,31,1)] text-white p-6 py-8 rounded-lg text-[24px] font-semibold"}>
                                        Browse Inventory
                                    </Button>
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
