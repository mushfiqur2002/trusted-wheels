"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

import AdminForm from "./components/AdminForm";
import AdminNavBar from "./components/AdminNavBar";

export default function AdminHome() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const user = await account.get();
                const admins = [
                    process.env.NEXT_PUBLIC_FIRST_ADMIN_EMAIL,
                    process.env.NEXT_PUBLIC_SECOND_ADMIN_EMAIL,
                ];

                if (!admins.includes(user.email)) {
                    await account.deleteSession("current");

                    router.push("/admin/login");
                    return;
                }

                setLoading(false);

            } catch {
                router.push("/admin/login");
            }
        };
        checkAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-[1920px] w-full mx-auto">
            <AdminNavBar />
            <div className="mt-20 lg:px-12 md:px-6 px-4">
                <h1 className="capitalize lg:text-2xl">
                    {`admin > `}
                    <span className="text-[rgba(240,11,31,1)]">
                        input data
                    </span>
                </h1>

                <div className="mt-4">
                    <AdminForm />
                </div>
            </div>
        </div>
    );
}