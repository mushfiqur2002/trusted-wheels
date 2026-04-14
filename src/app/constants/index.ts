export type Car = {
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

export const navLinks = [
    { name: "Home", href: "/" },
    { name: "Inventory", href: "/inventory" },
    { name: "Financing", href: "/financing" },
    { name: "Trade-In", href: "/trade-in" },
    { name: "Contact", href: "/contact" },
];

export const carsCarousel: Car[] = [
    {
        name: "BMW i7",
        price: 119300,
        image: "/carousel02.png",
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
        image: "/carousel02.png",
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
        image: "/carousel02.png",
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
        image: "/carousel02.png",
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
        image: "/carousel02.png",
        metaData: {
            bodyStyle: "Sports Sedan",
            fuel: "Electric",
            transmission: "Automatic",
            engine: "Dual Motor AWD",
            mileage: "246 miles",
        },
    },
]

export const cardList = [
    {
        imageSrc: "/Shield Check.svg",
        text: "one price, no haggle"
    },
    {
        imageSrc: "/Graph Down New.svg",
        text: "Rates as low as 5.99%."
    },
    {
        imageSrc: "/User Check.svg",
        text: "Non-Commissioned Advisors."
    },
    {
        imageSrc: "/File Check.svg",
        text: "oAll Credit Applications Accepted."
    },
]