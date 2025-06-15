import React from "react";
import {
  MapPin,
  Tag,
  UserPlus,
  Flame,
  Star,
  PlusSquare,
} from "lucide-react";

const categories = [
  { label: "Nearby", icon: <MapPin size={20} /> },
  { label: "Promotion", icon: <Tag size={20} /> },
  { label: "Newcomers", icon: <UserPlus size={20} /> },
  { label: "Best Sellers", icon: <Flame size={20} /> },
  { label: "Top Rated", icon: <Star size={20} /> },
  { label: "New Dishes", icon: <PlusSquare size={20} /> },
];

const CategoryBar = () => {
  return (
    <div className="flex overflow-x-auto bg-white px-10 mt-10 py-2 space-x-6  w-full">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="flex gap-6 items-center text-center text-sm text-gray-700 hover:text-orange-500 transition-colors duration-200"
        >
          {cat.icon}
          <span className="mt-1">{cat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
