import React from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

const AuthScreen = () => {
    return (
        <div className="flex h-screen">
            {/* Left Side - Form */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-1/2 flex items-center justify-center p-6"
            >
                <div className="max-w-md w-full">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold">Set new password</h2>
                        <p className="text-gray-500 text-sm">Must be at least 8 characters.</p>
                    </div>

                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring"
                        />
                        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium">
                            Log in
                        </button>

                        <div className="flex items-center gap-2 my-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="text-sm text-gray-500">or</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg"
                        >
                            <FaGoogle />
                            Continue with Google
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Right Side - Testimonial */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative p-6"
            >
                <div className="text-white absolute inset-0 bg-black/20 bg-opacity-30 z-10" />
                <img
                    src="/login/loginui.png" // Replace with your actual image
                    alt="testimonial"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="z-20 absolute bottom-2 text-white max-w-xl">
                    <p className="text-xl font-semibold">
                        OnTrend helped us save hours every day by combining food, grocery, pharmacy, and even rental
                        services into one powerful delivery platform.
                    </p>
                    <p className="mt-4 text-sm">
                        Emira Kensington
                        <br />
                        Business Partner, OnTrend
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthScreen;
