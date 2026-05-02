"use client";

import { useEffect, useState } from "react";

export default function ScheduleForm() {
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState<null | "success" | "error">(null)
    const [message, setMessage] = useState("")
    const inputStyle = "w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px] focus:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.4)] transition"
    useEffect(() => {
        if (popup) {
            const timer = setTimeout(() => setPopup(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [popup])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPopup(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const selectedDate = new Date(data.date as string);

        const day = selectedDate.getDay();
        const hours = selectedDate.getHours();

        console.log("Date:", selectedDate);
        console.log("Day:", day);
        console.log("Hours:", hours);

        if (day === 5 || day === 6) {
            setPopup("error");
            setMessage("We are closed on Fridays and Saturdays. Please select another day.");
            return;
        }

        if (hours < 8 || hours >= 20) {
            setPopup("error");
            setMessage("Our working hours are from 8 AM to 8 PM. Please select a time within this range.");
            return;
        }

        try {
            setLoading(true)
            const res = await fetch("/api/schedule", {
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
    };

    return (
        <div className="w-full flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full shadow-lg p-6 space-y-5"
            >
                <h2 className="text-2xl font-semibold text-center">
                    Schedule a Test Drive
                </h2>

                {/* Name */}
                <input
                    name="name"
                    placeholder="Full Name"
                    required
                    className={inputStyle}
                />

                {/* Email */}
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    className={inputStyle}
                />

                {/* Phone */}
                <input
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className={inputStyle}
                />
                <p className="text-[rgba(240,11,31,.6)]">Our hours are 8:00 AM to 8:00 PM, Sunday – Thursday. We are closed on Fridays and Saturdays</p>
                {/* Date & Time */}
                <input
                    type="datetime-local"
                    name="date"
                    required
                    className={inputStyle}
                />

                {/* Booking Type */}
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="type"
                            value="in-person"
                            defaultChecked
                        />
                        In Person
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="type"
                            value="zoom"
                        />
                        Zoom
                    </label>
                </div>

                {/* Message */}
                {popup && (
                    <div
                        className={`text-sm px-3 py-2 rounded ${popup === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {popup === "success"
                            ? "✅ Booking submitted successfully!"
                            : (<p>❌ Something went wrong. Try again. <br></br>{message}</p>)}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`cursor-pointer rounded-lg mt-4 px-6 py-3 flex md:text-[16px] text-[14px] capitalize font-semibold border-[rgba(240,11,31,.3)] text-white transition
                                        ${loading ? "bg-[rgba(240,11,31,.25)]" : "bg-[rgba(240,11,31,1)] hover:bg-[rgba(240,11,31,.85)]"}`}
                >
                    {loading ? "sending..." : "submit"}
                </button>
            </form>
        </div>
    );
}