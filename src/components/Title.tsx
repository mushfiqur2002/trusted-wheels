import React from 'react'
type HeadingType = {
    header: string,
    highlighted: string,
    paragraph: string,
    varient?: "dark" | "light",
    heroSection?: boolean,
    position?: "middle" | "left"
}
export default function Title({ header, highlighted, paragraph, heroSection = false, varient = 'light', position = "left" }: HeadingType) {
    return (
        <div className={`flex flex-col text-center sm:text-left 
                        ${varient === 'light' ? 'text-[rgba(33,33,33,1)]' : 'text-white'}
                        ${position === 'middle' ? 'items-center' : 'items-start'}`
        }>
            <h1 className={`font-medium leading-tight ${heroSection ? 'xl:text-[64px] lg:text-[58px] sm:text-[42px] text-[32px] text-center uppercase' : 'text-[24px] sm:text-[32px] md:text-[36px] lg:text-[44px] capitalize'}`}>
                {header}
                <span className="effect ml-1 sm:ml-2 pl-1 sm:pl-2 inline-block">
                    {highlighted}
                </span>
            </h1>

            <p className={`mt-3 font-normal max-w-[600px] ${heroSection ? 'text-[10px] sm:text-[14px] md:text-[16px] 2xl:text-[18px] text-center' : 'text-[12px] sm:text-[14px] md:text-[18px]'}`}>
                {paragraph}
            </p>
        </div>
    )
}