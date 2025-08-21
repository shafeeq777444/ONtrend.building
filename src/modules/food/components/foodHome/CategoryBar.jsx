import React from "react";
import {
  MapPin,
  UserPlus,
  Flame,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setFoodCategory } from "@/shared/slices/food/foodSlice";

const CategoryBar = () => {
  const dispatch = useDispatch();
  const { categoryBar } = useSelector((state) => state.food);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const categories = [
    {
      label: isArabic ? "بالقرب منك" : "Nearby",
      value: "Nearby",
      icon: <MapPin size={16} />,
    },
    {
      label: isArabic ? "جديد في الترند" : "New OnTrend",
      value: "New OnTrend",
      icon: <UserPlus size={16} />,
    },
    {
      label: isArabic ? "الأكثر مبيعًا" : "Best Sellers",
      value: "Best Sellers",
      icon: <Flame size={16} />,
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-3 mt-6 overflow-x-auto scrollbar-hide">
      <div className="flex px-3 sm:px-6 gap-2 sm:gap-3 md:gap-5 snap-x snap-mandatory scroll-smooth">
        {categories.map((cat, idx) => {
          const isActive = cat.value === categoryBar;
          return (
            <div
              key={idx}
              onClick={() => dispatch(setFoodCategory(cat.value))}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer snap-start min-w-fit
                ${isActive
                  ? "bg-onRed text-white font-medium shadow"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-100"
                }`}
            >
              <span className="flex-shrink-0">{cat.icon}</span>
              <span className="text-xs sm:text-sm md:text-base">{cat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
