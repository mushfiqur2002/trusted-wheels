export type CarType = {
    name: string
    price: number
    image: string
    metaData: {
        bodyStyle: string
        fuel: string
        transmission: string
        engine: string
        mileage: string
    }
}

export type CarInfo = {
    id?: string
    slug?: string

    brand?: string
    model?: string
    year?: number
    title?: string

    price?: number
    discount?: number
    quantity?: number

    location?: string
    vin?: string
    mileage?: number

    condition?: string
    bodyStyle?: string

    engine?: string
    cylinders?: number
    transmission?: string
    drive?: string
    fuelType?: string

    exteriorColor?: string
    interiorColor?: string

    doors?: number
    seats?: number

    description?: string
    notes?: string[]
    features?: string[]

    options?: {
        title?: string
        items?: string[]
    }[]

    displayImage?: string
    images?: string[]

    createdAt?: string
    updatedAt?: string
}

export type TestimonialType = {
    imageSrc: string,
    name: string,
    location: string,
    comment: string,
    review: number
}

export type SocailType = {
    profileImageSrc: string,
    postImageSrc: string,
    name: string,
}

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "/inventory" },
    { name: "Financing", href: "/financing" },
    { name: "Trade-In", href: "/trade-in" },
    { name: "Contact", href: "/contact" },
]

export const cardList = [
    {
        imageSrc: "/svg/Shield Check.svg",
        text: "one price, no haggle"
    },
    {
        imageSrc: "/svg/Graph Down New.svg",
        text: "Rates as low as 5.99%."
    },
    {
        imageSrc: "/svg/User Check.svg",
        text: "Non-Commissioned Advisors."
    },
    {
        imageSrc: "/svg/File Check.svg",
        text: "oAll Credit Applications Accepted."
    },
]

export const companyInfoList = [
    {
        number: 100,
        param: "past inspection"
    },
    {
        number: 5,
        param: "years of experience"
    },
    {
        number: 10000,
        param: "happy customers"
    },
]

export const carsCarousel: CarType[] = [
    {
        name: "BMW i7",
        price: 119300,
        image: "/images/carousel/carousel02.png",
        metaData: {
            bodyStyle: "Sedan",
            fuel: "Electric",
            transmission: "Automatic",
            engine: "Dual Motor AWD",
            mileage: "296 miles",
        },
    },
    {
        name: "Audi A6",
        price: 56900,
        image: "/images/carousel/carousel02.png",
        metaData: {
            bodyStyle: "Sedan",
            fuel: "Petrol",
            transmission: "Automatic",
            engine: "2.0L Turbo",
            mileage: "30 mpg",
        },
    },
    {
        name: "Tesla Model S",
        price: 79990,
        image: "/images/carousel/carousel02.png",
        metaData: {
            bodyStyle: "Sedan",
            fuel: "Electric",
            transmission: "Automatic",
            engine: "Dual Motor",
            mileage: "405 miles",
        },
    },
    {
        name: "Mercedes EQS",
        price: 104400,
        image: "/images/carousel/carousel02.png",
        metaData: {
            bodyStyle: "Luxury Sedan",
            fuel: "Electric",
            transmission: "Automatic",
            engine: "Single Motor RWD",
            mileage: "350 miles",
        },
    },
    {
        name: "Porsche Taycan",
        price: 90500,
        image: "/images/carousel/carousel02.png",
        metaData: {
            bodyStyle: "Sports Sedan",
            fuel: "Electric",
            transmission: "Automatic",
            engine: "Dual Motor AWD",
            mileage: "246 miles",
        },
    },
]

export const testimonialList: TestimonialType[] = [
    {
        imageSrc: '/socail/profile/image01.png',
        name: 'john d.',
        location: 'winchester us',
        comment: 'Lorem ipsum dolor sit amet consectetur. Tincidunt quisque nisl turpis egestas enim lorem. Dui faucibus enim gravida consequat aliquet',
        review: 5
    },
    {
        imageSrc: '/socail/profile/image02.png',
        name: 'john d.',
        location: 'winchester us',
        comment: 'Lorem ipsum dolor sit amet consectetur. Tincidunt quisque nisl turpis egestas enim lorem. Dui faucibus enim gravida consequat aliquet',
        review: 3
    },
    {
        imageSrc: '/socail/profile/image03.png',
        name: 'john d.',
        location: 'winchester us',
        comment: 'Lorem ipsum dolor sit amet consectetur. Tincidunt quisque nisl turpis egestas enim lorem. Dui faucibus enim gravida consequat aliquet',
        review: 4
    },
    {
        imageSrc: '/socail/profile/image04.png',
        name: 'john d.',
        location: 'winchester us',
        comment: 'Lorem ipsum dolor sit amet consectetur. Tincidunt quisque nisl turpis egestas enim lorem. Dui faucibus enim gravida consequat aliquet',
        review: 4
    },
    {
        imageSrc: '/socail/profile/image01.png',
        name: 'john d.',
        location: 'winchester us',
        comment: 'Lorem ipsum dolor sit amet consectetur. Tincidunt quisque nisl turpis egestas enim lorem. Dui faucibus enim gravida consequat aliquet',
        review: 5
    },
    {
        imageSrc: '/socail/profile/image02.png',
        name: 'john d.',
        location: 'winchester us',
        comment: 'Lorem ipsum dolor sit amet consectetur. Tincidunt quisque nisl turpis egestas enim lorem. Dui faucibus enim gravida consequat aliquet',
        review: 4
    },
]

export const socailList: SocailType[] = [
    {
        profileImageSrc: "/socail/profile/image03.png",
        postImageSrc: "/socail/post/image 3011.png",
        name: "jhon d."
    },
    {
        profileImageSrc: "/socail/profile/image01.png",
        postImageSrc: "/socail/post/image 3012.png",
        name: "jhon d."
    },
    {
        profileImageSrc: "/socail/profile/image02.png",
        postImageSrc: "/socail/post/image 3011.png",
        name: "jhon d."
    },
    {
        profileImageSrc: "/socail/profile/image03.png",
        postImageSrc: "/socail/post/image 3012.png",
        name: "jhon d."
    },
    {
        profileImageSrc: "/socail/profile/image01.png",
        postImageSrc: "/socail/post/image 3011.png",
        name: "jhon d."
    },
]

export const socailLink = [
    {
        icon: '/svg/X.svg',
        path: '/'
    },
    {
        icon: '/svg/FaceBook.svg',
        path: '/'
    },
    {
        icon: '/svg/InstaIcon.svg',
        path: '/'
    }
]

export const carInfo: CarInfo[] = [
    {
        id: "1",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
    {
        id: "2",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
    {
        id: "3",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
    {
        id: "4",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
    {
        id: "5",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
    {
        id: "6",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
    {
        id: "7",
        slug: "2026-nissan-kicks-sv-awd",

        brand: "Nissan",
        model: "Kicks",
        year: 2026,
        title: "Nissan Kicks SV AWD",

        price: 10495,
        discount: 30,
        quantity: 3,

        location: "Saskatoon, SK",
        vin: "3N8AP6CB5TL386420",
        mileage: 213000,

        condition: "Used",
        bodyStyle: "SUV",

        engine: "2.0L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",

        exteriorColor: "White",
        interiorColor: "Gray",

        doors: 4,
        seats: 5,

        description: "Hit the road in 2026 Nissan Kicks SV...",
        notes: [
            "Clean carfax, no claim",
            "Rates starting as low as 5.79%"
        ],
        features: [
            "AWD",
            "Keyless entry",
            "Push button start"
        ],

        options: [
            {
                title: "Safety",
                items: [
                    "Side impact beams",
                    "Blind spot warning",
                    "Emergency braking"
                ]
            }
        ],

        displayImage: "/images/cars_info/display.png",
        images: [
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase03.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase01.png",
            "/images/cars_info/showcase04.png",
            "/images/cars_info/showcase03.png",
        ]
    },
]