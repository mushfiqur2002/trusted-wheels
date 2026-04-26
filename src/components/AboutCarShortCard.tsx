import Image from 'next/image'
import React from 'react'

type AboutCarShortCardProps = {
    title: string,
    value: string

}

export default function AboutCarShortCard({ title, value }: AboutCarShortCardProps) {
    return (
        <div className='w-auto lg:p-5 md:p-3 p-2  rounded-lg bg-white shadow-[0px_0px_0px_.5px_rgba(0,_0,_0,_.2)] center justify-start! gap-4'>
            <div className='bg-[#f5f5f5] center xl:p-4 p-3 rounded-lg'>
                <Image
                    width={24}
                    height={24}
                    src={`/svg/${title}.svg`}
                    alt='svg'
                />
            </div>
            <div className='flex flex-col gap-1'>
                <h1 className='text-[16px] font-medium capitalize text-[rgba(33,33,33,.5)]'>{title}</h1>
                <p className='lg:text-[22px] font-semibold'>{value}</p>
            </div>
        </div>
    )
}
