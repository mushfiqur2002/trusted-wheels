"use client";

import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";
import { useState, useEffect } from "react";

export default function AdminLogin() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [locked, setLocked] = useState(false);

    const MAX_ATTEMPTS = 3;
    const LOCK_MINUTES = 15;

    const inputStyle = "w-full p-4 shadow-[0px_0px_0px_1px_rgba(33,33,33,.15)] rounded-lg border-none outline-none text-[18px] focus:shadow-[0px_0px_0px_2px_rgba(0,0,0,0.4)] transition";
    useEffect(() => {
        const lockedUntil = localStorage.getItem("lockedUntil");

        if (
            lockedUntil &&
            new Date(lockedUntil) > new Date()
        ) {
            setLocked(true);
        } else {
            localStorage.removeItem("lockedUntil");
            localStorage.removeItem("attempts");
        }
    }, []);

    const handleLogin = () => {
        if (locked) {
            setError("Login temporarily locked. Try later.");
            return;
        }

        let attempts = Number(
            localStorage.getItem("attempts") || 0
        );

        // compare with your env values
        const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_ID;
        const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS;

        if (
            id === ADMIN_ID &&
            password === ADMIN_PASS
        ) {
            localStorage.removeItem("attempts");
            localStorage.removeItem("lockedUntil");

            alert("Login successful");
            return;
        }

        attempts++;
        localStorage.setItem(
            "attempts",
            attempts.toString()
        );

        if (attempts >= MAX_ATTEMPTS) {
            const lockTime = new Date();
            lockTime.setMinutes(
                lockTime.getMinutes() + LOCK_MINUTES
            );

            localStorage.setItem(
                "lockedUntil",
                lockTime.toISOString()
            );

            setLocked(true);
            setError(
                `Too many attempts. Locked for ${LOCK_MINUTES} minutes`
            );
        } else {
            setError(
                `Wrong credentials. Remaining attempts: ${MAX_ATTEMPTS - attempts
                }`
            );
        }
    };

    const googleLogin = async () => {
        try {
            account.createOAuth2Session(
                OAuthProvider.Google,
                `${window.location.origin}/admin`,
                `${window.location.origin}/admin/login`
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">

                <h1 className="text-2xl font-bold text-center mb-6">
                    Admin Login
                </h1>

                {/* Google Section */}
                <div className="mb-6">
                    <button
                        onClick={googleLogin}
                        className="w-full border p-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>

                <div className="relative mb-6">
                    <hr />
                    <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm">
                        OR
                    </span>
                </div>

                {/* ID + Password Section */}

                <div className="space-y-4">
                    <input
                        className={inputStyle}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Admin ID"
                    />

                    <input
                        type="password"
                        className={inputStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <button
                        className="w-full text-white center rounded-lg py-3 bg-[rgba(220,11,31,1)] cursor-pointer"
                        disabled={locked}
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
}
