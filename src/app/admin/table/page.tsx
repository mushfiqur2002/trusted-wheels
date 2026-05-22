import React from 'react'
import AdminTable from '../components/AdminTable'
import AdminNavBar from '../components/AdminNavBar'

export default function AdminTablePage() {
    return (
        <div className="max-w-[1920px] w-full mx-auto">
            <AdminNavBar />
            <div className="mt-20 lg:px-12 md:px-6 px-4">
                <h1 className="capitalize lg:text-2xl">
                    {`admin > `}
                    <span className="text-[rgba(240,11,31,1)]">
                        table data
                    </span>
                </h1>

                <div className="mt-4">
                    <AdminTable />
                </div>
            </div>
        </div>
    )
}
