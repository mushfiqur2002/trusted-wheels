import React from 'react'

export default function About() {
    const list = [
        {
            title: 'Integrity',
            description: 'Commit to honesty, transparency, and ethical behavior in all aspects of our business.'
        },
        {
            title: 'Quality',
            description: 'Deliver high-quality vehicles and services, ensuring customer trust and satisfaction with every purchase.'
        },
        {
            title: 'Customer Focus',
            description: 'Prioritize customer satisfaction by understanding their needs, providing exceptional service, and building lasting relationships.'
        },
        {
            title: 'Accountability',
            description: 'Take responsibility for our actions and decisions, continuously learning and adapting to better serve our customers and community.'
        },
        {
            title: 'Environmental Responsibility',
            description: 'Take responsibility for our actions and decisions, continuously learning and adapting to better serve our customers and community.'
        }
    ]
    return (
        <div className='w-full xl:px-32 lg:px-12 px-6'>
            <div className='bg-white p-6 rounded-lg flex flex-col gap-6'>
                <div className='flex flex-col gap-1.5'>
                    <h1 className='capitalize text-[24px] font-semibold'>about us</h1>
                    <p className='text-[18px] text-justify font-medium text-[rgba(33,33,33,.7)]'>
                        At Start N Go Autos, we don’t just sell cars, we build trust. Every vehicle we bring in goes through an extensive inspection process so you can drive away with confidence knowing your investment has been carefully checked inside and out.
                        <br></br>
                        With over 20 years of combined industry experience in our office, our team brings unmatched knowledge and professionalism to every deal. We specialize in working with all credit situations, whether you have great credit, bad credit, or no credit history at all, we’ll work hard to get you approved and driving.
                        <br></br>
                        Our support doesn’t stop when you leave the lot. We provide a full range of aftermarket services including warranty, GAP protection, and other coverage options designed to protect you and your vehicle for the long term.
                        <br></br>
                        <br></br>
                        What sets us apart is simple: professionalism, transparency, and care. We’re here to guide you every step of the way, from f inding the right vehicle to securing financing that fits your budget, and protecting your purchase after the sale.
                        <br></br>
                        Come experience the difference at Start N Go Autos, where professionalism, trust, and customer care drive everything we do.
                    </p>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <h1 className='capitalize text-[24px] font-semibold'>core values</h1>
                    <p className='text-[18px] text-justify font-medium text-[rgba(33,33,33,.7)]'>
                        Whether you’re in the market for a sleek sedan, a rugged SUV, or a powerful truck, Start N Go Autos is your one-stop destination for quality, reliability, and customer satisfaction.
                    </p>
                </div>
                <div>
                    <ul className='flex flex-col gap-4'>
                        {
                            list.map((item, index) => (
                                <li key={index} className='flex flex-col gap-1.5'>
                                    <h2 className='capitalize text-[20px] font-semibold'>{item.title}</h2>
                                    <p className='text-[16px] text-justify font-medium text-[rgba(33,33,33,.7)]'>{item.description}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
