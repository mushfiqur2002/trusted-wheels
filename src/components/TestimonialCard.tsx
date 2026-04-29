import { TestimonialType } from "@/constants";
import Image from "next/image";

export default function TestimonialCard({ imageSrc, name, location, comment, review }: TestimonialType) {
    return (
        <div className="xl:w-[380px] w-[300px] h-full rounded-xl bg-white p-4 flex flex-col items-start justify-between overflow-hidden gap-4">
            <div className="flex justify-start items-center gap-3">
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                    <Image
                        width={100}
                        height={100}
                        alt="image"
                        src={imageSrc} className="w-full h-full"
                    />
                </div>
                <div className="flex flex-col gap-0">
                    <p className="text-[20px] font-normal capitalize">{name}</p>
                    <p className="text-[16px] font-light text-[var(--third-text-color)] capitalize">{location}</p>
                </div>
            </div>

            <div>
                <p className="tracking-normal lg:text-[18px] text-[16px] font-medium">{comment}</p>
                <div className="flex justify-end items-center mt-2 gap-1">
                    {
                        [...Array(5)].map((_, index) => {
                            return (
                                <Image
                                    key={index}
                                    width={22}
                                    height={22}
                                    alt="svg"
                                    src={index >= review ? "/svg/Empty Star.svg" : "/svg/Star.svg"}
                                />
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}
