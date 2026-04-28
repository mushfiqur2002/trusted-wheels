import { motion } from "framer-motion"

type HeadingType = {
    header?: string,
    highlighted?: string,
    paragraph?: string,
    varient?: "dark" | "light",
    heroSection?: boolean,
    position?: "middle" | "left"
}
export default function Title({ header, highlighted, paragraph, heroSection = false, varient = 'light', position = "left" }: HeadingType) {
    return (
        <div className={`flex flex-col text-left 
                        ${varient === 'light' ? 'text-[rgba(33,33,33,1)]' : 'text-white'}
                        ${position === 'middle' ? 'items-center px-2' : 'items-start'}`}
        >
            <motion.h1
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`font-medium leading-tight 
                    ${heroSection
                        ? "xl:text-[52px] lg:text-[48px] sm:text-[42px] text-[32px] uppercase px-2"
                        : "text-[28px] md:text-[30px] lg:text-[36px] capitalize"
                    }
                    ${position === 'middle' ? 'text-center' : 'md:text-start text-center'}`}

            >
                <span>
                    {header}
                </span>
                <span className="effect ml-1 sm:ml-2 pl-1 sm:pl-2 inline-block">
                    {highlighted}
                </span>

            </motion.h1>

            <motion.p
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className={`md:mt-2 mt-1 max-w-[600px] font-extralight 
                ${heroSection ? 'text-[10px] sm:text-[14px] md:text-[16px] 2xl:text-[18px] text-center font-thin tracking-widest px-2' : 'text-[12px] sm:text-[14px] md:text-[16px] font-semibold text-[rgba(33,33,33,.6)]'}
                ${position === 'middle' ? 'text-center' : 'md:text-start text-center'}
                ${varient === 'light' ? 'text-[rgba(33,33,33,.6)]' : 'text-white/70'}
                `}>
                {paragraph}
            </motion.p>
        </div>
    )
}


