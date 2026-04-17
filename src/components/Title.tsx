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
        <div className={`flex flex-col text-left 
                        ${varient === 'light' ? 'text-[rgba(33,33,33,1)]' : 'text-white'}
                        ${position === 'middle' ? 'items-center' : 'items-start'}`}
        >
            <h1 className={`font-medium leading-tight ${heroSection ? 'xl:text-[52px] lg:text-[48px] sm:text-[42px] text-[32px] text-center uppercase px-2' : 'text-[28px] md:text-[30px] lg:text-[36px] capitalize'}`}>
                {header}
                <span className="effect ml-1 sm:ml-2 pl-1 sm:pl-2 inline-block">
                    {highlighted}
                </span>
            </h1>

            <p className={`md:mt-2 mt-1 max-w-[600px] font-extralight 
                ${heroSection ? 'text-[10px] sm:text-[14px] md:text-[16px] 2xl:text-[18px] text-center font-thin tracking-widest px-2' : 'text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[rgba(33,33,33,.6)]'}
                ${varient === 'light' ? 'text-[rgba(33,33,33,.6)]' : 'text-white/70'}
                `}>
                {paragraph}
            </p>
        </div>
    )
}