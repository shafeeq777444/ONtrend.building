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
    <div className="w-full bg-white py-3 mt-6 overflow-x-auto">
      <div className="flex px-4 sm:px-6 gap-3 sm:gap-5 snap-x snap-mandatory scroll-smooth no-scrollbar">
        {categories.map((cat, idx) => {
          const isActive = cat.value === categoryBar;
          return (
            <div
              key={idx}
              onClick={() => dispatch(setFoodCategory(cat.value))}
              className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer snap-start
                ${isActive
                  ? "bg-onRed text-white font-medium shadow"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-100"
                }`}
            >
              {cat.icon}
              <span className="text-sm sm:text-base">{cat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
