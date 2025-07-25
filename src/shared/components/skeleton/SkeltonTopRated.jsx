import React from "react";
import { useTranslation } from "react-i18next";

const SkeltonTopRated = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section className="px-4 py-6 relative w-full">


 {/* heading */}
            <div className="h-6 w-40 ml-4 bg-gray-200 rounded mb-6 animate-pulse" />
        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              dir={isArabic ? "rtl" : "ltr"}
              className="animate-pulse rounded-md bg-white shadow-sm overflow-hidden w-full max-w-lg mx-auto relative"
            >
              {/* Banner Image Skeleton */}
              <div className="bg-gray-200 aspect-[4/3]" />

              {/* Bottom Overlay Section */}
              <div
                className="absolute bottom-0 left-0 w-full px-4 py-3 flex justify-between items-end
                backdrop-blur-[2px] bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-b-md"
              >
                {/* Left Section - Logo only */}
                <div className={`flex items-start gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
                  {/* Logo Placeholder */}
                  <div className="rounded-lg w-12 h-12 shadow-md bg-white shrink-0">
                    <div className="bg-gray-300 w-full h-full rounded-lg" />
                  </div>
                </div>

                {/* Right Section - Wishlist Icon Placeholder */}
                <div className="bg-gray-300 rounded-full w-8 h-8" />
              </div>
            </div>
          ))}
        </div>

    </section>
  );
};

export default SkeltonTopRated;
 