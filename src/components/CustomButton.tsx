import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

type LinkProps = {
    path: string
    text?: string
    imageSrc?: string,
    types: 'primary' | 'secondary' | 'normal',
    reverse?: boolean,
    onlySVG?: boolean,
    exception?: boolean,
    navbar?: boolean,
    fullWidth?: boolean,
}

export default function CustomButton({
    path,
    text,
    imageSrc,
    types = 'secondary',
    reverse = false,
    onlySVG = false,
    exception = false,
    navbar = false,
    fullWidth = false
}: LinkProps) {
    return (
        <Button
            className={`flex md:text-[16px] text-[14px] capitalize font-semibold cursor-pointer!
                ${types === 'secondary' && 'text-[rgba(240,11,31,1)] border-[rgba(240,11,31,.3)] bg-[rgba(240,11,31,.1)]'}
                ${types === 'primary' && 'bg-[rgba(240,11,31,1)] border-[rgba(240, 11, 31, .3)] text-white'}
                ${types === 'normal' && 'bg-white border-[rgba(33,33,33,.3)] text-[rgba(33,33,33,1)]'}
                ${onlySVG ? 'md:py-6 px-4 py-5' : 'md:p-6 p-5'}
                ${navbar && 'p-5!'}
                ${exception ? 'w-full' : 'w-auto'}
                ${fullWidth ? 'w-full!' : 'w-auto'}
                `}
        >
            <Link
                className={`flex items-center justify-center gap-2 ${reverse ? 'flex-row-reverse' : 'flex-row'} `}
                href={path}

            >
                {text && (
                    <p>{text}</p>
                )}

                {imageSrc && (
                    <Image
                        width={onlySVG ? 19 : 16}
                        height={onlySVG ? 19 : 16}
                        alt="icon"
                        src={imageSrc}
                    />
                )}

            </Link>
        </Button>
    )
}
