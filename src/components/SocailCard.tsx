import { SocailType } from "@/app/constants";
import Image from "next/image";

export default function SocailCard({ profileImageSrc, postImageSrc, name }: SocailType) {
    return (
        <div className="xl:w-[380px] w-[300px] h-full rounded-xl bg-white py-[24px] flex flex-col items-start justify-between overflow-hidden gap-4">
            {/* header */}
            <div className="w-full flex justify-between items-center px-[24px]">
                <div className="center gap-2">
                    <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                        <Image
                            width={100}
                            height={100}
                            alt="image"
                            src={profileImageSrc} className="w-full h-full"
                        />
                    </div>
                    <p className="text-[20px] font-normal capitalize">{name}</p>
                </div>

                <div>
                    <Image width={18} height={18} alt="svg" src="/svg/Menu Dots.svg" />
                </div>
            </div>

            {/* post image */}
            <div className="w-full h-[190px]">
                <Image
                    width={100}
                    height={100}
                    alt="post"
                    src={postImageSrc}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* svg */}
            <div className="w-full flex justify-between items-center px-[24px]">
                <div className="flex gap-3">
                    <Image
                        width={20}
                        height={20}
                        alt="svg"
                        src="/svg/Heart.svg"
                    />
                    <Image
                        width={20}
                        height={20}
                        alt="svg"
                        src="/svg/Comment.svg"
                    />
                </div>
                <div>
                    <Image
                        width={20}
                        height={20}
                        alt="svg"
                        src="/svg/Bookmark.svg"
                    />
                </div>
            </div>
        </div>
    )
}
