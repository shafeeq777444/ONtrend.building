import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

const FooterConnectEmail = () => {
    return (
        <div className="w-full max-w-md mx-auto space-y-4  rounded-2xl shadow-md p-4">
            {/* Email display box */}
            <div className="flex items-center cursor-default bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                {/* Mail icon */}
                <HiOutlineMail className="h-5 w-5 text-gray-500 mr-3" />

                {/* Email address */}
                <div className="flex-1 text-gray-800 font-medium truncate">ONtrend@gmail.com</div>
            </div>

            {/* Connect Button */}
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-full hover:scale-105 hover:bg-gray-700 transition-all shadow-sm">
                <FaPaperPlane className="text-white text-base" />
                <span className="font-semibold text-sm tracking-wide">Connect via Email</span>
            </button>
        </div>
    );
};

export default FooterConnectEmail;
