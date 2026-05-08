import Image from "next/image";
import AdminForm from "./components/AdminForm";


export default function AdminHome() {
    return (
        <div className="max-w-[1920px] w-full mx-auto">
            <div className="w-full lg:px-12 md:px-6 px-4 py-6 fixed top-0 left-0 bg-white">
                <Image
                    src="/svg/full-logo.svg"
                    alt="log"
                    width={230}
                    height={100}
                />
            </div>
            <div className="mt-20 lg:px-12 md:px-6 px-4 py-6">
                <h1 className="capitalize lg:text-2xl">{`admin > `}<span className="text-[rgba(240,11,31,1)]">input data</span></h1>
                <div className="mt-4">
                    <AdminForm />
                </div>
            </div>
        </div>
    )
}