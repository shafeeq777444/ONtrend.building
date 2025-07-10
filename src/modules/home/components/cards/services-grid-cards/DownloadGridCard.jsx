import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LazyImg from "@/shared/components/LazyImg";

const DownloadGridCard = () => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    return (
        <a
            target="_blank"
            href="https://ontrend.live/socials"
            className="bg-red-700 rounded-lg text-white flex flex-col md:flex-row items-center justify-around gap-6 p-4 w-full md:col-span-3 lg:col-span-2 shadow-md cursor-pointer"
        >
            {/* Logo + Title */}
            <div className="flex flex-col items-center text-center md:text-start">
                <LazyImg src="/ONtrend-logo.png" alt="ONtrend Logo" className="w-20 h-20 object-contain mb-2" />
                <h3 className="text-lg font-semibold">{isArabic ? "حمّل التطبيق" : "Download the App"}</h3>
            </div>

            {/* Store Buttons + Description */}
            <div
                className={`flex flex-col items-center md:items-start text-center md:text-start ${
                    isArabic ? "md:items-end md:text-end" : ""
                }`}
            >
                <div className={`flex gap-4 flex-wrap items-center justify-center ${isArabic ? "flex-row-reverse" : ""}`}>
                    <div className="flex items-center gap-2">
                        <FaApple size={18} />
                        <span>{isArabic ? "آب ستور" : "App Store"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGooglePlay size={18} />
                        <span>{isArabic ? "جوجل بلاي" : "Google Play"}</span>
                    </div>
                </div>

                <p className="text-sm text-white/90 mt-3 max-w-xs">
                    {isArabic
                        ? "ابقَ على تواصل معنا وتابع آخر التحديثات على وسائل التواصل الاجتماعي."
                        : "Stay connected with us and follow our latest updates on social media."}
                </p>
            </div>
        </a>
    );
};

export default DownloadGridCard;
