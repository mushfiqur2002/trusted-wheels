"use client"
import AboutCarShortCard from "@/components/AboutCarShortCard";
import CustomButton from "@/components/CustomButton";
import ImageGallery from "@/components/ImageGallery";
import { CarInfo, carInfo } from "@/constants";
import Image from "next/image";
import { useParams } from "next/navigation";

function formatTitle(title: string): string {
    return title
        .replace(/([A-Z])/g, " $1").toLowerCase()
}
function getAboutCar(data: CarInfo) {
    if (!data) return []

    const result: { title: string; value: string }[] = []

    const pushEntries = (obj: Record<string, unknown>) => {
        Object.entries(obj).forEach(([title, value]) => {
            if (value == null || typeof value === "object") return

            result.push({
                title: formatTitle(title),
                value: String(value),
            })
        })
    }

    pushEntries({
        bodyStyle: data.bodyStyle,
        condition: data.condition,
        mileage: data.mileage,
    })

    pushEntries(data.specs || {})
    pushEntries(data.appearance || {})

    return result
}
export default function InventoryDetails({ }) {
    const { id } = useParams()
    const slugId = typeof id === 'string' ? id.split('-') : []
    const ID = slugId[0]
    const data = carInfo.find((item) => item.id === ID);

    const aboutCar = data ? getAboutCar(data) : [];

    console.log(aboutCar);


    return (
        <div className="w-full flex flex-col xl:px-12 md:px-6 px-4 mt-20 text-[var(--secondary-text-color)] bg-[var(--primary-background-color)] gap-6">
            <h1 className="capitalize flex gap-1 text-[18px] font-medium">
                <span>inventory</span>
                <span>{`>`}</span>
                <span className="text-[rgba(240,11,31,1)]">details</span>
            </h1>

            <div className="grid md:grid-cols-[1fr_.5fr] grid-cols-1 xl:gap-12 gap-6">
                {/* image gallery */}
                <div>
                    <ImageGallery gallery={data?.images?.gallery ?? []} />
                </div>

                <div className="w-full flex flex-col lg:gap-6 gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="uppercase lg:text-[18px] md:text-[16px] text-[14px] font-semibold">vin : {data?.vin}</h2>
                        <h1 className="lg:text-[36px] md:text-[24px] text-[28px] font-semibold">{data?.title}</h1>
                    </div>
                    <div className="bg-white lg:p-4 md:p-2 p-3.5 rounded-xl capitalize flex flex-col lg:gap-8 gap-4">
                        <div className='bg-[#f5f5f5] center justify-between! px-3 p-2 rounded-lg'>
                            <p className="lg:text-[18px] text-[16px] font-semibold">
                                price
                            </p>
                            <p className='center gap-1 text-[rgba(33,33,33,1)] lg:text-[24px] md:text-[20px] text-[24px] font-semibold'>
                                $ {
                                    data?.price ? (
                                        data?.discount !== undefined && data?.discount > 0 ? (
                                            <span className="flex gap-2 center text-[rgba(240,11,31,1)]">
                                                <span>
                                                    {Math.round(data?.price - (data?.price * data?.discount) / 100).toLocaleString()}
                                                </span>
                                                <span className="text-gray-400 line-through text-[16px]">
                                                    {data?.price.toLocaleString()}
                                                </span>
                                            </span>
                                        ) : (
                                            <span className="text-[rgba(240,11,31,1)]">{data?.price.toLocaleString()}</span>
                                        )
                                    ) : (
                                        <span>Price not available</span>
                                    )
                                }
                            </p>
                        </div>
                        <div className="flex flex-col lg:gap-4 gap-2">
                            <CustomButton
                                path="/"
                                text="appointment"
                                types="primary"
                                fullWidth={true}
                            />
                            <CustomButton
                                path="/"
                                text="contact us"
                                types="secondary"
                                fullWidth={true}
                            />
                            <div className="center">
                                <div className='w-full h-[1.5px] bg-[linear-gradient(90deg,rgba(33,33,33,0)1%,rgba(33,33,33,.4)100%)] rotate-0 rounded-full' />
                                <p className="uppercase lg:text-[18px] text-[16px] font-medium px-4">or</p>
                                <div className='w-full h-[1.5px] bg-[linear-gradient(90deg,rgba(33,33,33,.4)1%,rgba(33,33,33,0)100%)] rounded-full' />
                            </div>
                            <CustomButton
                                path="/"
                                text="View Video"
                                types="normal"
                                fullWidth={true}
                            />
                            <CustomButton
                                path="/"
                                text="Schedule a Test Drive"
                                types="normal"
                                fullWidth={true}
                            />


                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white px-6 py-4 flex flex-col gap-4">
                <h1 className="capitalize font-semibold text-[24px]">about vehicles</h1>
                <div className="w-full grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 gap-4">
                    {
                        aboutCar.map((item, index) => {
                            console.log(item.title, item.value);

                            return (
                                <AboutCarShortCard key={index} title={item.title} value={item.value} />
                            )
                        })
                    }
                </div>
            </div>

            <div className="bg-white px-6 py-4 flex flex-col gap-6">
                {/* description */}
                <div className="flex flex-col gap-2">
                    <h1 className="capitalize font-semibold text-[24px]">description</h1>
                    <h1 className="text-[20px] font-medium">
                        {data?.description}
                    </h1>
                    <ul className="flex flex-col gap-1">
                        {data?.notes?.map((i, index) => (
                            <li className="text-[18px] font-medium" key={index}>- {i}</li>
                        ))}
                    </ul>
                </div>
                {/* features  */}
                <div className="flex flex-col gap-2">
                    <h1 className="capitalize font-semibold text-[24px] md:relative sticky md:top-0 top-19 z-2 bg-white">features</h1>

                    <ul className="md:gap-3 gap-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                        {data?.features?.map((i, index) => (
                            <li
                                className="text-[18px] font-medium center justify-start! gap-2 bg-white md:relative sticky md:top-0 top-32"
                                key={index}>
                                <Image
                                    width={12}
                                    height={12}
                                    src="/svg/Star 1.svg"
                                    alt="svg"
                                />
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-white px-6 py-4 flex flex-col gap-6">
                {
                    data?.options?.map((i, index) => (
                        <div
                            className="flex flex-col gap-2 relative"
                            key={index}>
                            <h1 className="capitalize font-semibold text-[24px] md:relative sticky md:top-0 top-20 z-2 bg-white">{i.title}</h1>
                            <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                                {i.items?.map((n, index) => (
                                    <li className="text-[18px] font-medium border border-[rgba(33,33,33,.25)] bg-white p-3 md:relative sticky md:top-0 top-32" key={index}> {n}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }

            </div>
        </div >
    )
}
