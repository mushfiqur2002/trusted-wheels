"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { adminNavLinks } from '@/constants';
import { FiX } from 'react-icons/fi';
import { LogOutIcon } from 'lucide-react';
import { account } from '@/lib/appwrite';

export default function AdminNavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const [userData, setUserData] = useState<string>();
    const router = useRouter()
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await account.get();
                setUserData(user.email);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logoutUser = async () => {
        try {
            await account.deleteSession("current");
            alert('log out successfully')
            router.push('/')
        } catch (error) {
            alert(error)
        }
    }

    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    return (
        <div className={`max-w-[1920px] w-full h-20 top-0 center justify-between! lg:px-12 md:px-6 px-4 z-100000000 ${isScrolled || isMobileMenuOpen ? "bg-[var(--primary-background-color)] fixed shadow-[0px_1px_15px_5px_rgba(240,_11,_31,_.06)]" : "bg-transparent absolute"}`}>

            {/* logo */}
            <div>
                <div className='hidden lg:flex'>
                    {isScrolled || isMobileMenuOpen ?
                        <Image width={220} height={100} src="/svg/full-logo.svg" alt="logo" /> :
                        <Image width={220} height={100} src="/svg/full-logo.svg" alt="logo" />
                    }
                </div>
                <div className='flex lg:hidden'>
                    <Image width={40} height={40} alt='svg' src="/svg/logo.svg" />
                </div>
            </div>


            {/* Desktop Nav Links */}
            <div className="hidden lg:flex">
                <ul className="center 2xl:gap-12 gap-6">
                    {adminNavLinks.map((link, index) => {
                        const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);

                        return (
                            <li
                                key={index}
                                className={`font-normal text-md ${isActive
                                    ? "text-[rgba(240,11,31,1)]"
                                    : isScrolled ? "text-[#212121]" : "text-[#212121]"}`
                                }
                            >
                                <Link href={link.href}>{link.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full absolute top-20 z-100 bg-[var(--primary-background-color)] backdrop-blur-md lg:hidden"
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center justify-center w-full h-[100vh] gap-6"
                        >
                            {adminNavLinks.map((link, index) => {
                                const isActive = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
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
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='center md:gap-4 gap-2'>
                <div>
                    <p>{userData}</p>
                </div>
                <button
                    onClick={logoutUser}
                    className='capitalize text-md px-2.5 py-2.5  text-[rgba(240,11,31,1)] rounded-full'>
                    <LogOutIcon size={20} />
                </button>
                {/* Mobile Menu Toggle */}
                <motion.button
                    className="lg:hidden flex"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? <FiX size={28} color="rgba(240,11,31,1)" /> : <Image width={28} height={28} alt="svg" src="/svg/Menu.svg" />}
                </motion.button>
            </div>
        </div>
    )
}
