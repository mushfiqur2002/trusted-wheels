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

export const carInfo = [
    {
        id: "1",
        title: "2026 Nissan Kicks SV AWD",
        price: 10495,
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
        description: "Hit the road in 2026 Nissan Kicks SV, ready for everyday adventures.",
        images: [
            "/cars/kicks-main.jpg",
            "/cars/kicks-1.jpg",
            "/cars/kicks-2.jpg",
            "/cars/kicks-3.jpg",
            "/cars/kicks-4.jpg",
        ],
    },

    {
        id: "2",
        title: "2023 Toyota RAV4 XLE",
        price: 25900,
        location: "Toronto, ON",
        vin: "2T3W1RFV8PC123456",
        mileage: 42000,
        condition: "Used",
        bodyStyle: "truck",
        engine: "2.5L",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",
        exteriorColor: "Black",
        interiorColor: "Beige",
        doors: 4,
        seats: 5,
        description: "Reliable SUV with modern tech and comfort.",
        images: [
            "/cars/rav4-main.jpg",
            "/cars/rav4-1.jpg",
            "/cars/rav4-2.jpg",
            "/cars/rav4-3.jpg",
        ],
    },

    {
        id: "3",
        title: "2022 Honda CR-V Touring",
        price: 27999,
        location: "Calgary, AB",
        vin: "5J6RW2H98NL654321",
        mileage: 38000,
        condition: "Used",
        bodyStyle: "shedam",
        engine: "1.5L Turbo",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",
        exteriorColor: "Silver",
        interiorColor: "Black",
        doors: 4,
        seats: 5,
        description: "Spacious SUV with premium interior and smooth drive.",
        images: [
            "/cars/crv-main.jpg",
            "/cars/crv-1.jpg",
            "/cars/crv-2.jpg",
        ],
    },

    {
        id: "4",
        title: "2021 BMW X3 xDrive30i",
        price: 34999,
        location: "Vancouver, BC",
        vin: "WBX57DP05M9F98765",
        mileage: 31000,
        condition: "Used",
        bodyStyle: "SUV",
        engine: "2.0L Turbo",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",
        exteriorColor: "Blue",
        interiorColor: "Brown",
        doors: 4,
        seats: 5,
        description: "Luxury SUV with powerful performance and comfort.",
        images: [
            "/cars/bmw-main.jpg",
            "/cars/bmw-1.jpg",
            "/cars/bmw-2.jpg",
            "/cars/bmw-3.jpg",
        ],
    },

    {
        id: "5",
        title: "2020 Audi Q5 Premium",
        price: 31999,
        location: "Montreal, QC",
        vin: "WA1ANAFY0L2045678",
        mileage: 45000,
        condition: "Used",
        bodyStyle: "SUV",
        engine: "2.0L Turbo",
        cylinders: 4,
        transmission: "Automatic",
        drive: "AWD",
        fuelType: "Petrol",
        exteriorColor: "Gray",
        interiorColor: "Black",
        doors: 4,
        seats: 5,
        description: "Premium compact SUV with advanced tech and smooth ride.",
        images: [
            "/cars/audi-main.jpg",
            "/cars/audi-1.jpg",
            "/cars/audi-2.jpg",
            "/cars/audi-3.jpg",
            "/cars/audi-4.jpg",
        ],
    },
]