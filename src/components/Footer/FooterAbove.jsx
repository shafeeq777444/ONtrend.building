/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const FooterAbove = () => {
    return (
        <motion.div
            className="bg-[#1a1a1a] min-h-[22rem] flex flex-col items-start justify-start px-5 "
            initial={{ opacity: 0,y: -30}}
            animate={{ opacity: 1,y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        >
            {/* Top Card */}
            <div className="relative bg-[#0e0e0e] text-white w-full rounded-b-4xl overflow-hidden flex flex-col-reverse md:flex-row shadow-2xl">
                {/* Left Side: Text Content */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="text-[#ffd56f] text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Download</div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">ONtrend Oman</h2>
                    <p className="text-gray-300 mb-5 text-sm sm:text-base">
                        The premium way to shop, order food, and unlock exclusive offers in Oman.
                    </p>
                    <a
                        href="https://ontrend.live/socials"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#ffd56f] cursor-pointer text-black font-semibold px-6 py-3 rounded-lg w-fit mb-2
              transition duration-200 ease-in-out 
              hover:bg-[#6a6550] hover:shadow-sm"
                    >
                        ⬇ DOWNLOAD NOW
                    </a>
                    <p className="mt-4 text-xs sm:text-sm text-gray-400">
                        Available on iOS & Android <br />
                        <span className="opacity-50">Version 1.7.5 • ONtrend Oman</span>
                    </p>
                </div>

                {/* Right Side: Logo */}
                <div className="w-full md:w-auto p-6 sm:p-8 flex items-center justify-center  bg-[#1a1a1a57] md:border-l border-white/10">
                    <img
                        src="/ONtrend-logo.png"
                        alt="ONtrend Logo"
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default FooterAbove;
