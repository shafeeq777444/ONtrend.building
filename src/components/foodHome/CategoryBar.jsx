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
import { setFoodCategory } from "../../features/food/foodSlice";

const categories = [
  { label: "Nearby", icon: <MapPin size={18} /> },
  // { label: "Promotion", icon: <Tag size={18} /> },
  { label: "New OnTrend", icon: <UserPlus size={18} /> },
  { label: "Best Sellers", icon: <Flame size={18} /> },
  // { label: "Top Rated", icon: <Star size={18} /> },
  // { label: "New Dishes", icon: <PlusSquare size={18} /> },
];

const CategoryBar = () => {
  const dispatch = useDispatch();
  const { categoryBar } = useSelector((state) => state.food);

  return (
    <div className="flex overflow-x-auto sticky top-14 z-50 bg-white px-6 sm:px-10 mt-6 py-3 space-x-4 sm:space-x-6 w-full no-scrollbar">
      {categories.map((cat, idx) => {
        const isActive = cat.label === categoryBar;
        return (
          <div
            key={idx}
            onClick={() => dispatch(setFoodCategory(cat.label))}
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
