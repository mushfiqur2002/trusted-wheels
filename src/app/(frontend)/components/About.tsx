"use client"
import { cardList, companyInfoList } from '@/constants'
import Image from 'next/image'
import { useState } from 'react'
import Title from '../../../components/Title'
import { Button } from '@/components/ui/button'
import NumberFormat from '../../../components/NumberFormat'
import CustomButton from '../../../components/CustomButton'
import { motion } from "framer-motion"
export default function About() {
    const [activeTab, setActiveTab] = useState<"brands" | "types">("brands");
    return (
        <div className='max-w-[1440px] mx-auto w-full h-auto md:py-22 py-16 text-[var(--secondary-text-color)] flex flex-col md:gap-22 gap-16'>
            {/* first section value propositions */}
            <div className='flex flex-col lg:gap-16 gap-8 md:px-12 px-6'>
                <div>
                    <Title header='Why Choose' highlighted='trustedwheels?' paragraph={`We don't just sell cars; we build lasting relationships.`} />
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    {cardList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="sm:static sticky top-24 w-full min-h-[120px] p-5 bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                            >
                                <div className="w-fit h-fit bg-[rgba(240,11,31,0.08)] p-[10px] rounded-md">
                                    <Image
                                        src={item.imageSrc}
                                        alt="icon"
                                        width={20}
                                        height={20}
                                    />
                                </div>

                                <div className="pt-4">
                                    <p className="text-[16px] sm:text-[18px] font-medium capitalize leading-snug">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 2nd section -> inventory */}
            <div className='w-full flex flex-col lg:gap-16 md:gap-6 gap-4 md:px-12 px-6'>
                <div className='flex justify-between lg:items-center md:items-start items-center lg:flex-row flex-col lg:gap-0 md:gap-6 gap-4'>
                    <Title header='Find Your' highlighted='Perfect Fit' paragraph='Shop our extensive inventory by your favorite brand or vehicle type.' />
                    <div className="relative flex w-fit p-1 bg-white rounded-lg">

                        {/* Sliding Background */}
                        <div
                            className={`absolute top-1 bottom-1 w-1/2 rounded-md bg-[rgba(240,11,31,1)] transition-all duration-300 ${activeTab === "brands" ? "left-1" : "left-[49%]"}`}
                        />

                        {/* Buttons */}
                        <Button
                            onClick={() => setActiveTab("brands")}
                            className={`relative z-10 capitalize px-8 py-6 md:text-[16px] text-[14px] font-semibold bg-transparent shadow-none ${activeTab === "brands"
                                ? "text-white"
                                : "text-[rgba(33,33,33,.6)]"
                                }`}
                        >
                            explore brands
                        </Button>

                        <Button
                            onClick={() => setActiveTab("types")}
                            className={`relative z-10 capitalize px-8 py-6 md:text-[16px] text-[14px] font-semibold bg-transparent shadow-none ${activeTab === "types"
                                ? "text-white"
                                : "text-[rgba(33,33,33,.6)]"
                                }`}
                        >
                            explore types
                        </Button>
                    </div>
                </div>

                <div className=''>
                    {
                        activeTab === "brands" ?
                            (
                                <div className='w-full center bg-white py-12'>
                                    <h1 className='text-2xl capitalize'>brands</h1>
                                </div>
                            ) : (
                                <div className='w-full center bg-white py-12'>
                                    <h1 className='text-2xl capitalize'>types</h1>
                                </div>
                            )
                    }
                </div>

                <div className='center'>
                    <CustomButton
                        text='view more' path='/'
                        imageSrc='/svg/Arrow Left.svg'
                        types='secondary'
                    />
                </div>
            </div>

            {/* 3rd section -> trust building  */}
            <div className='w-full flex flex-col lg:gap-16 gap-8 md:px-12 px-6'>
                <div>
                    <Title header='Transparency and' highlighted='care in every deal' paragraph='Every vehicle goes through an extensive inspection process so you can drive away with absolute confidence.' />
                </div>

                <div className='grid lg:grid-cols-2 grid-cols-1 xl:gap-12 gap-6'>
                    <div className='relative w-full lg:h-[463px] md:h-[300px] h-[200px] lg:rounded-4xl rounded-xl overflow-hidden'>
                        <Image fill src="/images/section/woman-enjoying-her-financially-independence-while-buying-car 1.png" alt='image' objectFit="cover" objectPosition="center" />
                    </div>
                    <div className='center flex-col lg:gap-12 gap-6'>
                        <div className='relative w-full grid sm:grid-cols-3 grid-cols-1 bg-white md:p-6 p-4 rounded-xl md:gap-0 gap-6'>
                            {
                                companyInfoList.map((item, index) => {
                                    return (
                                        <div key={index} className='w-full h-full bg-white md:static sticky top-24 flex flex-col justify-center md:items-start items-center'>
                                            <p className='flex md:text-[32px] text-[28px] font-semibold'><NumberFormat value={item.number} /><span className='text-[rgba(240,11,31,1)]'>+</span></p>
                                            <p className='md:text-[16px] text-[12px] font-normal capitalize'>{item.param}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                            className='flex flex-col gap-6'>
                            <p className='md:text-[22px] text-[16px] font-medium text-justify'>We are committed to making your car-buying experience simple, honest, and stress-free. Every vehicle is carefully selected and inspected by experienced professionals to ensure quality you can trust. From start to finish, our focus is on transparency and customer satisfaction.</p>
                            <div className='flex lg:justify-end justify-center'>
                                <CustomButton
                                    path='/' text='read more'
                                    imageSrc='/svg/Arrow Left.svg'
                                    types='secondary'

                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 4th section */}
            <div className='flex flex-col gap-12 bg-[var(--secondary-background-color)] md:px-12 px-6 md:py-12 py-8'>
                <div>
                    <Title header='financing' highlighted='made simple' paragraph='Great credit, bad credit, or no credit? Our experienced finance managers will go' varient='dark' />
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 md:gap-12 gap-6'>
                    <div className='relative w-full h-[314px] flex flex-col justify-between items-start bg-white rounded-2xl p-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[24px] font-semibold'>Apply for Financing</h1>
                            <p className='text-[18px]'>Get pre-approved quickly and find the best payment plan that fits your budget.</p>
                        </div>
                        <div>
                            <CustomButton
                                path='/'
                                types='primary'
                                text='apply now'
                                imageSrc='/svg/Arrow Right White.svg'
                            />
                        </div>
                        <div className="absolute bottom-0 right-10">
                            <Image
                                src="/images/Frame.png"
                                alt="svg"
                                width={320}
                                height={320}
                                className="w-[250px] md:w-[300px] lg:w-[320px] h-auto"
                            />
                        </div>
                    </div>

                    <div className='relative w-full h-[314px] flex flex-col justify-between items-start bg-white rounded-2xl p-8'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[24px] font-semibold'>Appraise Your Trade-In</h1>
                            <p className='text-[18px]'>Get an instant estimate for your current vehicle and trade it in for something better.</p>
                        </div>
                        <div>
                            <CustomButton
                                path='/'
                                types='primary'
                                text='get your value'
                                imageSrc='/svg/Arrow Right White.svg'
                            />
                        </div>
                        <div className="absolute bottom-0 right-10">
                            <Image
                                src="/images/Frame.png"
                                alt="svg"
                                width={320}
                                height={320}
                                className="w-[250px] md:w-[300px] lg:w-[320px] h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
