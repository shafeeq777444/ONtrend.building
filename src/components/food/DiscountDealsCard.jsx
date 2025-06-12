import React from "react";
import { FaStar } from "react-icons/fa";
import { FiClock, FiMapPin } from "react-icons/fi";
import { useGetAllFoodVendors } from "../../hooks/queries/useVendors";

const DiscountDealsCard = ({ vendor }) => {
  const{data}=useGetAllFoodVendors()
  console.log(data,"--all food vendors")
  return (
    <div className="relative bg-white rounded-md shadow-md overflow-hidden w-full max-w-xs hover:scale-[1.02] transition-transform duration-200">
      <div className="h-36 w-full">
        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
        {vendor.discount}
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-bold text-gray-900">{vendor.name}</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-500" />
            {vendor.rating}
          </div>
          <div className="flex items-center gap-1">
            <FiMapPin />
            {vendor.distance}
          </div>
          <div className="flex items-center gap-1">
            <FiClock />
            {vendor.deliveryTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountDealsCard;
