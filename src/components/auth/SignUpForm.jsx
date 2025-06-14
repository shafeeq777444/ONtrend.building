// components/Auth/SignupForm.jsx
"use client";
import { useState } from "react";
import { registerUser } from "../../firebase/auth";

export default function SignupForm({ onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        await registerUser(email, password);
    };

    return (
        <form onSubmit={handleRegister} className="space-y-3">
            <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-xl bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-xl bg-white text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold">
                Sign Up
            </button>
            <button type="button" onClick={onBack} className="w-full text-sm underline text-center text-gray-400">
                Back
            </button>
        </form>
    );
}
