import React from 'react'
type HeadingType = {
    header: string,
    highlighted: string,
    paragraph: string
}
export default function Title({ header, highlighted, paragraph }: HeadingType) {
    return (
        <div className="text-center sm:text-left">
            <h1 className="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[44px] font-medium capitalize leading-tight">
                {header}
                <span className="effect ml-1 sm:ml-2 pl-1 sm:pl-2 inline-block">
                    {highlighted}
                </span>
            </h1>

            <p className="mt-3 text-[12px] sm:text-[14px] md:text-[18px] text-[rgba(33,33,33,.6)] font-medium max-w-[600px]">
                {paragraph}
            </p>
        </div>
    )
}
