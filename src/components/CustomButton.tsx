import Image from 'next/image'
import Link from 'next/link'

type LinkProps = {
    path?: string | undefined
    text?: string
    imageSrc?: string,
    types?: 'primary' | 'secondary' | 'normal' | 'socail',
    reverse?: boolean,
    onlySVG?: boolean,
    exception?: boolean,
    navbar?: boolean,
    fullWidth?: boolean,
    blankTarget?: boolean,
    contact?: boolean
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
    fullWidth = false,
    blankTarget = false,
    contact = false
}: LinkProps) {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const businessMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? '';
    return (
        <Link
            className={`flex items-center justify-center gap-2 md:text-[16px] text-[14px] capitalize font-semibold cursor-pointer! rounded-lg
                ${types === 'secondary' && 'text-[rgba(240,11,31,1)] border-[rgba(240,11,31,.3)] bg-[rgba(240,11,31,.1)]'}
                ${types === 'primary' && 'bg-[rgba(240,11,31,1)] border-[rgba(240,11,31,.5)] text-white'}
                ${types === 'normal' && 'bg-white border border-[rgba(33,33,33,.1)] text-[rgba(33,33,33,1)]'}
                ${types === 'socail' && 'bg-[rgba(255,255,255,.1)] text-[rgba(33,33,33,1)]'}
                ${onlySVG ? 'p-4' : 'px-4.5 py-3'}
                ${navbar && 'px-4 py-3!'}
                ${exception ? 'w-full' : 'w-auto'}
                ${fullWidth ? 'w-full!' : 'w-auto'}
                ${reverse ? 'flex-row-reverse' : 'flex-row'}
                `}
            href={contact ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(businessMessage)}` : path || '/'}
            target={blankTarget ? '_blank' : '_self'}
        >
            {text && (
                <p>{text}</p>
            )}
            {contact && (
                <p>{whatsappNumber}</p>
            )}

            {
                imageSrc && (
                    <Image
                        width={onlySVG ? 19 : 16}
                        height={onlySVG ? 19 : 16}
                        alt="icon"
                        src={imageSrc}
                    />
                )
            }

        </Link >
    )
}
