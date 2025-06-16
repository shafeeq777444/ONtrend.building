import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import FavoriteButton from "../common/FavouriteButton";
import { Star, Clock, MapPin } from "lucide-react";
import RatingStars from "../common/RatingStar";

const PharmacyCard = ({ pharmacy }) => {
  const {
    name,
    bannerImage,
    image,
    isOnline,
    estimatedTime,
    distance,
    Ratings,
    totalRatings,
  } = pharmacy;

  const averageRating =
    Ratings && totalRatings ? Ratings / totalRatings : 0;

  return (
    <div className="p-2 w-full">
      <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 bg-white">
        {/* Image Section */}
        <div className="relative h-40 w-full">
          {/* Main Image */}
          <img
            src={bannerImage?.[0]}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

          {/* Favorite Button */}
          <div className="absolute top-2 right-2 z-30">
            <FavoriteButton />
          </div>

          {/* Logo */}
          {image && (
            <div className="absolute top-2 left-2 w-10 h-10 rounded-full border border-white overflow-hidden z-20 shadow">
              <img
                src={image}
                alt={`${name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Status Overlay */}
          {!isOnline && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-25">
              <span className="text-white text-sm italic">Shop Closed</span>
            </div>
          )}

          {/* Name */}
          <div className="absolute bottom-2 left-2 z-20">
            <h3 className="text-white text-sm font-semibold drop-shadow">
              {name}
            </h3>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-3 space-y-2">
          {/* Info Badges */}
          <div className="flex flex-col gap-2 text-xs text-gray-700">
            {averageRating > 0 && (
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                <RatingStars rating={averageRating} />
                <span className="font-medium text-gray-600">({Ratings})</span>
              </div>
            )}
<div className="flex">
  
              {estimatedTime && (
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <Clock size={12} />
                  <span>{estimatedTime}</span>
                </div>
              )}
  
              {distance && (
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <MapPin size={12} />
                  <span>{distance} km</span>
                </div>
              )}
</div>
          </div>

          {/* Action */}
          {isOnline ? (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
              <FiShoppingBag size={16} />
              <span>Shop Now</span>
            </div>
          ) : (
            <div className="text-xs text-center text-gray-400 italic">Shop Closed</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
