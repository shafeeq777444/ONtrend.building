import React from "react";
import { FaStar } from "react-icons/fa";
import { FiClock, FiMapPin } from "react-icons/fi";

const DiscountDealsCard = ({ vendor }) => {
    // console.log(vendor, "each vendor ");
    return (
        <div className="relative bg-white rounded-md shadow-md overflow-hidden w-full max-w-xs hover:scale-[1.02] transition-transform duration-200">
            <div className="h-36 w-full">
                <img src={vendor.bannerImage[0]} alt={vendor.restaurantName} className="w-full h-full object-cover" />
            </div>

            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow">
                {`${Math.floor(vendor.discountValue)}% Off ${vendor?.selectedItems && "selected items"}`}
            </div>

            <div className="p-3 space-y-1">
                <h3 className="font-bold text-gray-900">{vendor.restaurantName}</h3>
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
