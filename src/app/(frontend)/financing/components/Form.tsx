"use client"

import React, { useState, useEffect } from "react"

export default function Form() {
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState<null | "success" | "error">(null)
    useEffect(() => {
        if (popup) {
            const timer = setTimeout(() => setPopup(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [popup])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPopup(null)

        const form = e.currentTarget
        const formData = new FormData(form)
        const data = Object.fromEntries(formData)

        try {
            setLoading(true)
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (!res.ok || !result.success) {
                throw new Error("Failed")
            }

            setPopup("success")
            form.reset()
        } catch (err) {
            console.error(err)
            setPopup("error")
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = "w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px] focus:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.4)] transition"

    const labelStyle =
        "capitalize text-[18px] font-medium flex items-center justify-start gap-1"
    return (
        <div className="w-full xl:px-12 px-6 lg:mt-16 mt-12 flex flex-col lg:gap-6 gap-2 relative text-[#212121]">
            <h1 className="text-[32px] font-semibold">Apply For Credit</h1>
            <div className="flex flex-col gap-6 bg-white px-8 py-6 rounded-xl">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[24px] font-semibold capitalize">Get approved from home!</h1>
                    <p className="text-[16px] font-medium ">Please fill out the secure credit application below.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {popup && (
                        <div className="fixed top-18 left-12 z-50">
                            <div
                                className={`px-6 py-4 rounded-lg shadow-lg text-white text-[16px] font-medium transition-all
                                            ${popup === "success" ? "bg-green-600" : "bg-red-600"}`}
                            >
                                {popup === "success"
                                    ? "✅ Form submitted successfully!"
                                    : "❌ Something went wrong. Try again."}
                            </div>
                        </div>
                    )}
                    {/* Personal Info */}
                    <div className="flex flex-col gap-4">
                        <h1 className="lg:text-[20px] text-[18px] font-semibold uppercase">
                            Personal Information
                        </h1>

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
                            {/* First Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>first name</span>
                                    <span className="text-red-600 text-[20px] font-bold">*</span>
                                </label>
                                <input
                                    required
                                    name="firstName"
                                    type="text"
                                    placeholder="EX: Mushfiqur"
                                    className={inputStyle}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>last name</span>
                                    <span className="text-red-600 text-[20px] font-bold">*</span>
                                </label>
                                <input
                                    required
                                    name="lastName"
                                    type="text"
                                    placeholder="EX: Rahman"
                                    className={inputStyle}
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>phone</span>
                                    <span className="text-red-600 text-[20px] font-bold">*</span>
                                </label>
                                <input
                                    required
                                    name="phone"
                                    type="text"
                                    placeholder="EX: 015......"
                                    className={inputStyle}
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>email</span>
                                    <span className="text-red-600 text-[20px] font-bold">*</span>
                                </label>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="EX: xyz@gmail.com"
                                    className={inputStyle}
                                />
                            </div>

                            {/* Marital Status */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>Marital Status</span>
                                    <span className="text-red-600 text-[20px] font-bold">*</span>
                                </label>
                                <select name="maritalStatus" className={inputStyle}>
                                    <option value="married">married</option>
                                    <option value="unmarried">unmarried</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div className="flex flex-col gap-1">
                                <label className={labelStyle}>
                                    <span>birth of date</span>
                                    <span className="text-red-600 text-[20px] font-bold">*</span>
                                </label>
                                <input
                                    required
                                    name="dob"
                                    type="date"
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-4">
                        <h1 className="lg:text-[20px] text-[18px] font-semibold uppercase">
                            Current Residence
                        </h1>

                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-3">
                            {/* Address */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>address</span>
                                </label>
                                <input
                                    name="address"
                                    type="text"
                                    placeholder="EX: Address"
                                    className={inputStyle}
                                />
                            </div>

                            {/* City */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>city</span>
                                </label>
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="EX: Dhaka"
                                    className={inputStyle}
                                />
                            </div>

                            {/* Province */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>Province</span>
                                </label>
                                <input
                                    name="province"
                                    type="text"
                                    placeholder="EX: Dhaka Division"
                                    className={inputStyle}
                                />
                            </div>

                            {/* Post Code */}
                            <div className="flex flex-col gap-1.5">
                                <label className={labelStyle}>
                                    <span>post code</span>
                                </label>
                                <input
                                    name="postcode"
                                    type="text"
                                    placeholder="EX: 1207"
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex center justify-end!">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`cursor-pointer rounded-lg mt-4 px-6 py-3 flex md:text-[16px] text-[14px] capitalize font-semibold border-[rgba(240,11,31,.3)] text-white transition
                                        ${loading ? "bg-[rgba(240,11,31,.25)]" : "bg-[rgba(240,11,31,1)] hover:bg-[rgba(240,11,31,.85)]"}
                                    `}
                        >
                            {loading ? "sending..." : "apply"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // disabled: opacity - 75
    )
}
