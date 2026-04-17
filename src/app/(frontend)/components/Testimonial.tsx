"use client"
import { socailList, testimonialList } from '@/app/constants'
import SocailCard from '@/components/SocailCard'
import TestimonialCard from '@/components/TestimonialCard'
import Title from '@/components/Title'
import Image from 'next/image'


export default function Testimonial() {
    // const [isStart, setIsStart] = useState(true)
    // const [isEnd, setIsEnd] = useState(false)
    // const scrollRef = useRef<HTMLDivElement>(null)

    // const handleScroll = () => {
    //     const el = scrollRef.current
    //     if (!el) return

    //     const { scrollLeft, scrollWidth, clientWidth } = el

    //     setIsStart(scrollLeft <= 5)
    //     setIsEnd(scrollLeft + clientWidth >= scrollWidth - 5)
    // }

    // useEffect(() => {
    //     handleScroll()
    // }, [])
    return (
        <div className='max-w-[1440px] mx-auto w-full h-auto text-[var(--secondary-text-color)] flex flex-col gap-16'>
            <div className='w-full center'>
                <Title
                    header='what our'
                    highlighted='community is saying'
                    paragraph={`Don't just take our word for it, see why our customers love their trustedwheels.`}
                    position='middle'
                />
            </div>
            <div className='flex flex-col gap-16 md:px-12 px-6'>
                {/* google */}
                <div className='flex flex-col gap-10'>
                    {/* bar */}
                    <div className='w-full center'>
                        <div className='w-full h-[2.5px] bg-[linear-gradient(90deg,rgba(240,11,31,0)5%,rgba(240,11,31,.4)100%)] rotate-0 rounded-full' />
                        <div className='center bg-white rounded-full px-8 py-1.5 mx-4 gap-2 shadow-[-5px_-7px_10px_-1px_rgba(0,_0,_0,_0.06)]'>
                            <Image width={18} height={18} alt="svg" src="/svg/google.svg" />
                            <p className='text-xl font-medium capitalize'>review</p>
                        </div>
                        <div className='w-full h-[2.5px] bg-[linear-gradient(90deg,rgba(240,11,31,.4)5%,rgba(240,11,31,0)100%)] rounded-full' />
                    </div>
                    {/* content */}
                    <div className="w-full relative">
                        <div
                            // ref={scrollRef}
                            // onScroll={handleScroll}
                            className="w-full flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-2"
                        >
                            {testimonialList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 snap-center"
                                >
                                    <TestimonialCard
                                        imageSrc={item.imageSrc}
                                        name={item.name}
                                        review={item.review}
                                        comment={item.comment}
                                        location={item.location}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* LEFT */}
                        {/* {!isStart && (
                            <div className="absolute top-0 -left-1 w-[80px] h-full 
                                            bg-[linear-gradient(90deg,rgba(255,255,255,1)_60%,rgba(255,255,255,0)_100%)] 
                                            pointer-events-none z-10"
                            />
                        )} */}

                        {/* RIGHT */}
                        {/* {!isEnd && (
                            <div className="absolute top-0 -right-1 w-[80px] h-full 
                                            bg-[linear-gradient(270deg,rgba(255,255,255,1)_60%,rgba(255,255,255,0)_100%)] 
                                            pointer-events-none z-10"
                            />
                        )} */}
                    </div>
                </div>

                {/* insta */}
                <div className='flex flex-col gap-10'>
                    {/* bar */}
                    <div className='w-full center'>
                        <div className='w-full h-[2.5px] bg-[linear-gradient(90deg,rgba(240,11,31,0)5%,rgba(240,11,31,.4)100%)] rotate-0 rounded-full' />
                        <div className='center bg-white rounded-full px-8 py-1.5 mx-4 gap-2 shadow-[-5px_-7px_10px_-1px_rgba(0,_0,_0,_0.06)]'>
                            <Image width={18} height={18} alt="svg" src="/svg/insta.svg" />
                            <p className='text-xl font-medium capitalize'>review</p>
                        </div>
                        <div className='w-full h-[2.5px] bg-[linear-gradient(90deg,rgba(240,11,31,.4)5%,rgba(240,11,31,0)100%)] rounded-full' />
                    </div>
                    {/* content */}
                    <div className="w-full relative">
                        <div
                            // ref={scrollRef}
                            // onScroll={handleScroll}
                            className="w-full flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar px-2"
                        >
                            {socailList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 snap-center"
                                >
                                    <SocailCard
                                        profileImageSrc={item.profileImageSrc}
                                        postImageSrc={item.postImageSrc}
                                        name={item.name}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* LEFT */}
                        {/* {!isStart && (
                            <div className="absolute top-0 -left-1 w-[80px] h-full 
                                            bg-[linear-gradient(90deg,rgba(255,255,255,1)_60%,rgba(255,255,255,0)_100%)] 
                                            pointer-events-none z-10"
                            />
                        )} */}

                        {/* RIGHT */}
                        {/* {!isEnd && (
                            <div className="absolute top-0 -right-1 w-[80px] h-full 
                                            bg-[linear-gradient(270deg,rgba(255,255,255,1)_60%,rgba(255,255,255,0)_100%)] 
                                            pointer-events-none z-10"
                            />
                        )} */}
                    </div>
                </div>

            </div>
        </div>
    )
}
