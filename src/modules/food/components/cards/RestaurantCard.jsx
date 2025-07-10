import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


import FavoriteButton from "@/shared/components/common/FavouriteButton";
import RatingStars from "@/shared/components/common/RatingStar";

 const  RestaurantCard = ({ restaurant,  isLiked }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const averageRating =
    restaurant.Ratings && restaurant.totalRatings
      ? restaurant.Ratings / restaurant.totalRatings
      : 0;
      console.log(restaurant,"--resturarent carf")

  return (
    <div className="px-1 pb-3">
      <div
        onClick={() => navigate(`/food/${restaurant?.id}`)}
        className="relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white group transition-transform hover:scale-[1.02] duration-300 ease-in-out hover:z-10"
      >
        {/* Busy Overlay */}
        {!restaurant.isOnline  && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <span className="text-white text-sm font-semibold">
              {isArabic ? "مشغول" : "Busy"}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <div className={`absolute top-2  z-30 ${isArabic?"left-16":"right-2"}`}>
          <FavoriteButton product={restaurant} isLiked={isLiked} />
        </div>

        {/* Banner Image */}
        <div className="relative w-full aspect-[4/3]">
          <img
            loading="lazy"
            src={restaurant.bannerImage?.[2] || restaurant.bannerImage?.[1]}
            alt={
              isArabic
                ? restaurant.restaurantArabicName
                : restaurant.restaurantName
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = restaurant.bannerImage?.[0];
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
        </div>

        {/* Bottom Info: RTL-aware */}
        <div
  className={`absolute bottom-4 flex items-start ${
    isArabic ? "right-3 gap-4 space-x-reverse" : "left-3"
  } space-x-3 z-20`}
>
  {/* Logo — will be on right in RTL */}
  <div className="rounded-lg w-14 h-14 shadow-md overflow-hidden bg-white shrink-0">
    <img
      loading="lazy"
      src={restaurant.image}
      alt={`${
        isArabic
          ? restaurant.restaurantArabicName
          : restaurant.restaurantName
      } Logo`}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Info Section — will be on left in RTL */}
  <div className={`text-white ${isArabic ? "text-right" : "text-left"}`}>
    {/* Name */}
    <h3 className="text-sm font-semibold max-w-[140px] break-words leading-tight">
      {isArabic
        ? restaurant.restaurantArabicName
        : restaurant.restaurantName}
    </h3>

    {/* Ratings */}
    {averageRating > 0 && (
      <div className="flex items-center gap-1 mt-0.5">
        <RatingStars rating={averageRating} />
      </div>
    )}

    {/* Distance & Time */}
    {(restaurant.distance || restaurant.estimatedTime) && (
      <p className="text-xs text-white/90 mt-0.5 flex items-center space-x-1 rtl:space-x-reverse">
        {restaurant.distance && (
          <span>
            {restaurant.distance.toFixed(1)} {isArabic ? "كم" : "km"}
          </span>
        )}
        {restaurant.distance && restaurant.estimatedTime && <span>•</span>}
        {restaurant.estimatedTime && (
          <span>
            {restaurant.estimatedTime} {isArabic ? "دقيقة" : "mins"}
          </span>
        )}
      </p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};


export default RestaurantCard