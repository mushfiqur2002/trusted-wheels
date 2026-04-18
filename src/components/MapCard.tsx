import Image from 'next/image'
import React from 'react'
import CustomButton from './CustomButton'

export default function MapCard() {
    return (
        <div className='w-[216px] h-auto bg-white p-2 rounded-xl relative'>
            <div className='relative w-full flex flex-col gap-1 z-2'>
                <div className='w-full h-[120] rounded-xl overflow-hidden'>
                    <Image
                        width={100}
                        height={100}
                        alt="image"
                        src="/images/image 6.png"
                        className='w-full h-full object-cover'
                    />
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
                        path='/'
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
