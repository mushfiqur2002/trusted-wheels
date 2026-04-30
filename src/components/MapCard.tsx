import Image from 'next/image'
import React from 'react'
import CustomButton from './CustomButton'

export default function MapCard() {
    return (
        <div className='w-[216px] h-auto bg-white p-2 rounded-xl relative'>
            <div className='relative w-full flex flex-col gap-1 z-2'>
                <div className='w-full h-[120] rounded-xl overflow-hidden relative'>
                    <Image
                        width={100}
                        height={100}
                        alt="image"
                        src="/images/image 6.png"
                        className='w-full h-full object-cover'
                    />
                    <div className="absolute top-2.5 right-3 p-[2px] rounded-full bg-[rgba(255,255,255,.15)] backdrop-blur-[5px] center">

                        <div className="flex items-center gap-1.5 py-[1px] px-2 rounded-full bg-[rgba(0,0,0,.25)] text-white">

                            <Image
                                width={16}
                                height={16}
                                alt="star"
                                src="/svg/White Star.svg"
                            />

                            <span className="text-[14px] font-medium">5.5</span>

                        </div>

                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-[24px] font-medium'>Start N Go Autos</h1>
                    <p className='flex items-center gap-1 text-[14px] font-medium'>
                        <span>
                            <Image
                                width={16}
                                height={16}
                                alt='svg'
                                src="/svg/Map Point Black.svg"
                            />
                        </span>
                        <span>
                            Saskatchewan, S7L 1B3
                        </span>
                    </p>
                    <CustomButton
                        path={process.env.NEXT_PUBLIC_MAP_LINK || 'https://www.google.com/maps'}
                        blankTarget={true}
                        text='Get Direction'
                        imageSrc='/svg/Arrow Right White.svg'
                        types='primary'
                        exception={true}
                    />
                </div>
            </div>

            <div className='absolute w-10 h-10 bg-white rotate-45 -bottom-5 left-0 right-0 mx-auto -z-1' />
        </div>
    )
}
