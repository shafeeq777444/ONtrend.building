import React from "react";
import {
  MapPin,
  Tag,
  UserPlus,
  Flame,
  Star,
  PlusSquare,
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
      icon: <MapPin size={18} />,
    },
    {
      label: isArabic ? "جديد في الترند" : "New OnTrend",
      value: "New OnTrend",
      icon: <UserPlus size={18} />,
    },
    {
      label: isArabic ? "الأكثر مبيعًا" : "Best Sellers",
      value: "Best Sellers",
      icon: <Flame size={18} />,
    },
    // More categories can be added similarly...
  ];

  return (
    <div className="flex overflow-x-auto bg-white px-6 sm:px-10 mt-6 py-3 space-x-4 sm:space-x-6 w-full no-scrollbar">
      {categories.map((cat, idx) => {
        const isActive = cat.value === categoryBar;
        return (
          <div
            key={idx}
            onClick={() => dispatch(setFoodCategory(cat.value))}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer
              ${isActive
                ? "bg-onRed text-white font-medium shadow"
                : "text-gray-600 hover:text-red-600 hover:bg-red-100"}`}
          >
            {cat.icon}
            <span className="text-sm">{cat.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBar;
