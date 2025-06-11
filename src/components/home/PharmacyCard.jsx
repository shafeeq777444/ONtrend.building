import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import FavoriteButton from "../common/FavouriteButton";

const PharmacyCard = ({ name, images, isOnline }) => {
  return (
    <div className="p-2">
      <div className="group relative rounded-xl shadow hover:shadow-md transition flex flex-col items-center text-center hover:scale-[1.02] duration-200 ease-in-out">
        
        <div className="w-full h-42 rounded-lg overflow-hidden mb-3 relative">
          {/* Favorite Button */}
          <FavoriteButton />

          {/* Image */}
          <img
            src={images?.[0]}
            alt={name}
            className="w-full h-full object-cover"
          />

          {/* Shop Closed Overlay */}
          {!isOnline && (
            <div className="absolute inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center cursor-default z-20">
              <div className="text-xs text-gray-400 italic">Shop closed</div>
            </div>
          )}

          {/* Hover Overlay with Title (for online only) */}
          {isOnline && (
            <div className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none">
              <div className="w-full bg-gradient-to-t from-black/70 via-black/30 to-transparent h-full p-2 flex justify-center pointer-events-auto transition-opacity duration-300 opacity-100 group-hover:opacity-0 absolute bottom-0">
                <h3 className="text-sm font-semibold text-white absolute bottom-4">
                  {name}
                </h3>
              </div>
            </div>
          )}
        </div>

        {/* Status Text */}
        {isOnline ? (
          <div className="flex items-center gap-1 p-2 text-sm font-medium text-green-600">
            <FiShoppingBag size={16} /> Shop Now
          </div>
        ) : (
          <div className="text-xs text-gray-400 p-2 italic">Shop closed</div>
        )}
      </div>
    </div>
  );
};

export default PharmacyCard;
