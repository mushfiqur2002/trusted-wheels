import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'
import { CarInfoType } from '@/constants';
import CarCard from './CarCard';

interface CarCardProps {
    data: CarInfoType[];
    totalPage?: number;
}
export default function CarCardCollection({ data, totalPage }: CarCardProps) {
    const [page, setPage] = useState(1)
    return (
        <div className='flex flex-col'>
            {
                data.length > 0 ? (
                    <div className='w-full grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                        {
                            data.map((item, index) => (
                                <CarCard key={index} item={item} />
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        <h1 className='text-xl capitalize font-semibold'>does not match of any document what you expected to find </h1>
                    </div>
                )
            }

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
                        disabled={page >= totalPage!}
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
