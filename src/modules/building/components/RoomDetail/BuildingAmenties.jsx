import React from "react";
import { useTranslation } from "react-i18next";

const BuildingAmenities = ({ amenities }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";

  return (
    <>
    <h2 className="text-2xl font-bold text-gray-800 p-4">
        {isArabic ? "ما ستحصل عليه" : "What You'll Get"}
      </h2>
    
    <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"} mb-8 md:max-w-4xl p-6`}>
      
      {/* Section Title */}
      

      {amenities?.map((item, index) => {
        const amenity = item.amenities;
        const name = isArabic ? amenity.name_ar : amenity.name_en;
        const description = amenity.description;

        return (
          <div
            key={index}
            className={`flex items-start space-x-4 ${
              isArabic ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            {/* Icon */}
            <div className="bg-gray-100 p-2 rounded-full">
              <img
                src={amenity.icon_url}
                alt={name}
                className="w-6 h-6 mt-1 object-contain"
              />
            </div>

            {/* Text */}
            <div>
              <div className="font-semibold text-gray-800">{name}</div>
              {description && (
                <div className="text-sm text-gray-600">{description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default BuildingAmenities;
