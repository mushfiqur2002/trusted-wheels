"use client"
import CustomButton from "@/components/CustomButton";
import NumberFormat from "@/components/NumberFormat";
import Title from "@/components/Title";
import { companyInfoList } from "@/constants";

export default function Hero() {
    return (
        <div className="w-full h-auto md:pt-28 pt-20 center flex-col overflow-hidden relative">
            {/* tile floor */}
            <div className="w-full h-full flex flex-col justify-between absolute top-0 inset-0 z-1">
                {/* top */}
                <div className="w-full top-tile-floor"></div>
            </div>

            <div className="w-full grid md:grid-cols-2 grid-cols-1 xl:px-32 lg:px-12 px-6 z-2">
                {/* content */}

                <div className="w-full center md:items-start! flex-col text-[var(--secondary-text-color)] gap-4">
                    <div className="capitalize p-[.9px] mb-1 rounded-full bg-[rgba(240,11,31,.2)]">
                        <div className="px-3.5 py-1.5 rounded-full bg-[var(--primary-background-color)]">
                            <p className="md:text-[12px] text-[10px] text-[var(--secondary-text-color)]">
                                About <span className="text-[var(--primary-text-color)]">Trustedwheels</span>
                            </p>
                        </div>
                    </div>

                    <Title
                        header="Driven by Trust"
                        highlighted="Built for You"
                        paragraph="We’re redefining the car-buying experience with transparency, simplicity, and a customer-first approach."
                        varient="light"
                        heroSection={true}
                    />

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
                </div>

                {/* image */}
                <div className="w-full h-auto relative top-0 center">
                    <div className='relative center w-fit xl:h-[450px] lg:h-[400px] md:h-[300px] h-[250px] lg:rounded-4xl rounded-xl overflow-hidden'>
                        <img src="/images/section/car.png" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-20 z-[9999] 
                                                bg-[linear-gradient(0deg,rgba(245,245,245,1)_10%,rgba(245,245,245,0.1)_90%)] 
                                                pointer-events-none"
                    />
                </div>
            </div>
        </div>
    )
}
