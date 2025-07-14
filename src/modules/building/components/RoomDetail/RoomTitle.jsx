import React from "react";
import { useTranslation } from "react-i18next";

const RoomTitle = ({ name_en, name_ar, bedCount,bedType,max_adults,max_children }) => {
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    return (
        <div className="space-y-1 mt-4 "  dir={isArabic?"rtl":"ltr"}>
            <h2 className="text-2xl font-semibold text-gray-900">{isArabic ? name_ar : name_en}</h2>
            <p className="text-sm text-gray-500">{bedCount} {bedType} | {max_adults} Guests | {max_children} Children </p>
        </div>
    );
};

export default RoomTitle;
