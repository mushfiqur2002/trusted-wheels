import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AdminNavBar() {
    return (
        <div className="w-full lg:px-12 md:px-6 px-4 py-6 fixed top-0 left-0 bg-white">
            <Image
                src="/svg/full-logo.svg"
                alt="log"
                width={230}
                height={100}
            />
            <div>
                <ul>
                    <li>
                        <Link href="/admin">Admin Home</Link>
                        <Link href="/admin/table">Admin table</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
