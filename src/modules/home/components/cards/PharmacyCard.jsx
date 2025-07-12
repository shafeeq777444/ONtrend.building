import React from "react";
import { FiShoppingBag } from "react-icons/fi";

import { Star, Clock, MapPin } from "lucide-react";

import { useTranslation } from "react-i18next";
import FavoriteButton from "@/shared/components/common/FavouriteButton";
import RatingStars from "@/shared/components/common/RatingStar";
import LazyImg from "@/shared/components/LazyImg";

const PharmacyCard = ({ pharmacy }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const {
    restaurantName,
    restaurantArabicName,
    bannerImage,
    image,
    isOnline,
    estimatedTime,
    distance,
    Ratings,
    totalRatings,
  } = pharmacy;

  const averageRating = Ratings && totalRatings ? Ratings / totalRatings : 0;
  const displayName = isArabic ? restaurantArabicName : restaurantName;

  return (
    <div className="p-2 w-full">
      <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 bg-white">
        {/* Image Section */}
        <div className="relative h-40 w-full">
          <LazyImg
            src={bannerImage?.[0]}
            alt={displayName}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

          <div className="absolute top-2 right-2 z-30">
            <FavoriteButton />
          </div>

          {image && (
            <div className="absolute top-2 left-2 w-10 h-10 rounded-full border border-white overflow-hidden z-20 shadow">
              <LazyImg
                src={image}
                alt={`${displayName} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {!isOnline && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-25">
              <span className="text-white text-sm italic">
                {isArabic ? "المتجر مغلق" : "Shop Closed"}
              </span>
            </div>
          )}

          <div className={`absolute bottom-2 z-20 ${!isArabic?"left-2 " : "right-2"}`}>
            <h3 className="text-white text-sm font-semibold drop-shadow">
              {displayName}
            </h3>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-3 space-y-2">
          <div className="flex flex-col gap-2 text-xs text-gray-700">
            {averageRating > 0 && (
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                <RatingStars rating={averageRating} />
                <span className="font-medium text-gray-600">({Ratings})</span>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {estimatedTime && (
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <Clock size={12} />
                  <span>{estimatedTime}</span>
                </div>
              )}

              {distance && (
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <MapPin size={12} />
                  <span>{distance} {isArabic ? "كم" : "km"}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action */}
          {isOnline ? (
            <div className="flex items-center gap-2 justify-center text-green-600 text-sm font-medium">
              <FiShoppingBag size={16} />
              <span className="text-center">
                {isArabic ? "تسوق الآن" : "Shop Now"}
              </span>
            </div>
          ) : (
            <div className="text-xs text-center text-gray-400 italic">
              {isArabic ? "المتجر مغلق" : "Shop Closed"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyCard;
