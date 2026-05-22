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

//  Specs
export type CarSpecs = {
    engine?: string
    cylinders?: number
    transmission?: string
    drive?: string
    fuelType?: string
}

//  Appearance
export type CarAppearance = {
    exteriorColor?: string
    interiorColor?: string
    doors?: number
    seats?: number
}

//  Options (grouped features)
export type CarOption = {
    title?: string
    items?: string[]
}

//  Images
export type CarImages = {
    display?: string
    gallery?: string[]
}

// 🔹 Main Car Type
export type CarInfoType = {
    id?: string
    slug?: string
    carousel?: boolean | undefined

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

    specs?: CarSpecs
    apperance?: CarAppearance
    appearance?: CarAppearance

    description?: string
    notes?: string[]
    features?: string[]

    options?: CarOption[]

    images?: CarImages
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
    { name: "About Us", href: "/about" }
]

export const adminNavLinks = [
    { name: "Home", href: "/admin" },
    { name: "Table", href: "/admin/table" }
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