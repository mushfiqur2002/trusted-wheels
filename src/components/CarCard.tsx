import Image from 'next/image'
import CustomButton from './CustomButton'
import { useCars } from '@/app/hooks/cars/useCars'
import { useState } from 'react'
import { Button } from './ui/button'

export default function CarCard() {
    const [page, setPage] = useState(1)
    const { data, limit, totalPage, totalCar, currentPage } = useCars({ page })
    console.log(data);
    console.log(limit);
    console.log(totalPage);
    console.log(totalCar);
    console.log(currentPage);
    return (
        <div className='flex flex-col'>
            <div className='w-full flex flex-wrap gap-4'>
                {
                    data.map((item, index) => (
                        <div
                            key={index}
                            className='w-[295px] h-full bg-white p-2 relative rounded-lg shadow-[0px_0px_10px_2px_rgba(0,_0,_0,_0.025)]'
                        >
                            <div className='absolute top-5 left-5'>
                                <img
                                    alt='image'
                                    src="/images/brand/ford.png"
                                    className='object-contain w-[50px] h-fit'
                                />
                            </div>
                            <div>
                                <div className='w-full h-[160px] center bg-[#F5F5F5] rounded-lg overflow-hidden'>
                                    <img className='w-auto h-auto' src={item.displayImage} />
                                </div>
                                <div className='flex flex-col gap-3 mt-2'>
                                    <h1 className='text-[20px] font-semibold'>{item.title}</h1>
                                    <ul className='flex flex-col gap-2'>
                                        <li className='center justify-between!'>
                                            <span className='center justify-start! gap-1'>
                                                <Image width={20} height={20} src="/svg/total_run.svg" alt="svg" />
                                                <p className='text-[18px] capitalize text-black/50'>total run</p>
                                            </span>
                                            <span className='center justify-start! gap-1'>
                                                <p className='text-[18px] capitalize font-medium'>
                                                    {item.mileage} km
                                                </p>
                                            </span>
                                        </li>
                                        <li className='center justify-between!'>
                                            <span className='center justify-start! gap-1'>
                                                <Image width={20} height={20} src="/svg/body_style.svg" alt="svg" />
                                                <p className='text-[18px] capitalize text-black/50'>body style</p>
                                            </span>
                                            <span className='center justify-start! gap-1'>
                                                <p className='text-[18px] capitalize font-medium'>
                                                    {item.bodyStyle}
                                                </p>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className='mt-auto bg-[#f5f5f5] center justify-between! p-1 rounded-lg'>
                                        <p className='text-[20px] font-semibold ml-1 flex gap-.5'>
                                            $ {
                                                item.discount !== undefined && item.discount > 0 ? (
                                                    <span className="flex gap-2 items-center">
                                                        <span>
                                                            {Math.round(item.price - (item.price * item.discount) / 100).toLocaleString()}
                                                        </span>
                                                        <span className="text-gray-400 line-through">
                                                            {item.price.toLocaleString()}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span>{item.price.toLocaleString()}</span>
                                                )
                                            }
                                        </p>
                                        <CustomButton path={`/inventory/${item.id}-${item.slug}`} text='details' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='center justify-end! mt-4'>
                <div className="center gap-2">
                    <Button
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className={'shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.05)] p-3 cursor-pointer'}
                    >
                        <Image
                            width={18}
                            height={18}
                            alt='svg'
                            src="/svg/Arrow Right.svg"
                        />
                    </Button>

                    <h1 className='text-[20px] px-2'>
                        {page} / {totalPage}
                    </h1>

                    <Button
                        disabled={page >= totalPage}
                        onClick={() => setPage((p) => p + 1)}
                        className={'shadow-[0px_0px_0px_1px_rgba(0,_0,_0,_0.05)] p-3 cursor-pointer'}
                    >
                        <Image
                            width={18}
                            height={18}
                            alt='svg'
                            src="/svg/Arrow Left.svg"
                        />
                    </Button>
                </div>
            </div>
        </div>
    )
}
