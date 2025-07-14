import React from "react";
import { useTranslation } from "react-i18next";

const BuildingAmenities = ({ amenities }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";
  console.log(amenities,'amenities')

  return (
    <>
    <h2 className="text-2xl font-bold text-gray-800 p-4">
        {isArabic ? "ما ستحصل عليه" : "What You'll Get"}
      </h2>
    
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isArabic ? "text-right" : "text-left"} mb-8 md:max-w-4xl p-6`}>
      
      {amenities?.map((amenity, index) => {
        const name = isArabic ? amenity.name_ar : amenity.name;

        return (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            {/* Icon */}
            <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
              <img
                src={amenity.icon}
                alt={name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.target.src = '/extras/amanties.png';
                }}
              />
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="font-medium text-gray-800 text-sm">{name}</div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default BuildingAmenities;
