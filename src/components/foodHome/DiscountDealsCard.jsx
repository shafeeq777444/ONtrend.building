import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FavoriteButton from "../common/FavouriteButton";
import RatingStars from "../common/RatingStar";

const DiscountRestaurantCard = ({ restaurant, isLiked }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const averageRating =
    restaurant?.Ratings && restaurant?.totalRatings
      ? restaurant.Ratings / restaurant.totalRatings
      : 0;

  return (
    <div
      onClick={() => navigate(`/food/${restaurant.id}`)}
      className="flex flex-col sm:flex-row w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer hover:shadow-lg transition"
    >
      {/* Image Section */}
      <div className="relative w-full sm:w-40 h-40 flex-shrink-0">
        <img
          src={restaurant?.bannerImage?.[2] || restaurant?.bannerImage?.[1]}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = restaurant.bannerImage?.[0];
          }}
          alt={
            isArabic
              ? restaurant?.restaurantArabicName
              : restaurant?.restaurantName
          }
          className="w-full h-full object-cover"
        />

        {/* Gradient Discount Badge like DiscountDealsCard */}
        {!!restaurant?.discountValue && (
          <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-red-600 to-red-400 text-white text-[11px] px-3 py-1 rounded-full shadow-lg font-semibold tracking-wide">
            <span className="whitespace-nowrap">
              {`${Math.floor(restaurant?.discountValue)}% ${
                isArabic ? "خصم" : "OFF"
              }`}
              {restaurant?.selectedItems
                ? ` ${isArabic ? "• عناصر محددة" : "• Selected Items"}`
                : ""}
            </span>
          </div>
        )}

        {/* Heart Button */}
        <div className="absolute top-2 left-2 z-20">
          <FavoriteButton product={restaurant} isLiked={isLiked} />
        </div>
      </div>

      {/* Right Side Content */}
      <div className="flex flex-col justify-between p-3 flex-grow h-40">
        <div className="overflow-hidden">
          {/* Name */}
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
            {isArabic
              ? restaurant?.restaurantArabicName
              : restaurant?.restaurantName}
          </h3>

          {/* Rating */}
          {averageRating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <RatingStars rating={averageRating} />
            </div>
          )}

          {/* Distance and Estimated Time */}
          <p className="text-xs text-gray-500 mt-1 flex flex-wrap gap-1">
            {restaurant?.distance && (
              <span>
                {restaurant?.distance.toFixed(1)} {isArabic ? "كم" : "km"}
              </span>
            )}
            {restaurant?.estimatedTime && (
              <span>
                • {restaurant?.estimatedTime} {isArabic ? "دقيقة" : "mins"}
              </span>
            )}
          </p>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-start mt-2">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm bg-white">
            <img
              src={restaurant?.image}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountRestaurantCard;
