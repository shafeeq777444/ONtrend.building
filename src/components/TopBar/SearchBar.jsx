import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function SearchBar({ onDebouncedSearch }) {
    const { t, i18n } = useTranslation();
    const [inputText, setInputText] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const isArabic = i18n.language === "ar";

    const placeholders = [
        t("placeholder.search"),
        t("placeholder.hungry"),
        t("placeholder.ride"),
        t("placeholder.essentials"),
        t("placeholder.hotels"),
        t("placeholder.groceries"),
    ];

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(inputText);
        }, 400);

        return () => clearTimeout(handler);
    }, [inputText]);

    useEffect(() => {
        if (debouncedInput !== "") {
            onDebouncedSearch?.(debouncedInput);
        }
    }, [debouncedInput, onDebouncedSearch]);

    return (
        <div className="w-full">
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-8 pl-9 pr-3 py-0 text-white text-sm leading-none border border-gray-300 rounded-md focus:outline-none"
                    placeholder=""
                />
                {inputText === "" && (
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-sm text-gray-400 transition-all duration-300 ${
                            isArabic ? "right-10 text-right" : "left-10 text-left"
                        }`}
                    >
                        <div className="overflow-hidden h-[1.5rem] relative">
                            <div className="loop-animation">
                                {placeholders.map((text, index) => (
                                    <div key={index} className="h-[1.5rem] leading-[1.5rem]">
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}