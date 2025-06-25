// DiscountDealsCard.jsx
import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => {
        const isFull = i < fullStars;
        const isHalf = i === fullStars && halfStar;

        return (
          <Star
            key={i}
            size={12}
            stroke="#facc15"
            fill={isFull || isHalf ? "#facc15" : "none"}
            style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : {}}
          />
        );
      })}
    </div>
  );
};

const DiscountDealsCard = ({ vendor, favorites, toggleFavorite }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const averageRating =
    vendor.Ratings && vendor.totalRatings
      ? vendor.Ratings / vendor.totalRatings
      : vendor.rating || 0;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white group transition-transform hover:scale-[1.02] duration-300 ease-in-out hover:z-10"
      onClick={() => navigate(`/food/${vendor.id}`)}
    >
      {vendor.discountValue && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-red-400 text-white text-[11px] px-3 py-1 rounded-full shadow-lg z-20 font-semibold tracking-wide">
          <span className="whitespace-nowrap">
            {`${Math.floor(vendor.discountValue)}% ${isArabic ? "خصم" : "OFF"}`}
            {vendor.selectedItems ? ` ${isArabic ? "• عناصر محددة" : "• Selected Items"}` : ""}
          </span>
        </div>
      )}

      <div className="relative w-full aspect-[4/3]">
        <img
          src={vendor.bannerImage?.[0]}
          alt={vendor.restaurantName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
      </div>

      <div
        className={`absolute bottom-4 ${isArabic ? "right-3 gap-4" : "left-3"} flex items-start space-x-3 rtl:space-x-reverse z-20`}
      >
        <div className="rounded-lg w-14 h-14 shadow-md overflow-hidden bg-white">
          <img
            src={vendor.image}
            alt={`${vendor.restaurantName} Logo`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className={`text-white ${isArabic ? "text-right" : "text-left"}`}>
          <h3 className="text-sm font-semibold max-w-[140px] break-words leading-tight">
            {isArabic ? vendor.restaurantArabicName : vendor.restaurantName}
          </h3>

          {averageRating > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <RatingStars rating={averageRating} />
              <span className="text-xs text-white/80">
                ({vendor.Ratings || vendor.totalRatings || 0})
              </span>
            </div>
          )}

          {(vendor.distance || vendor.duration) && (
            <p className="text-xs text-white/90 mt-0.5 flex items-center space-x-1 rtl:space-x-reverse">
              {vendor.distance && (
                <span>
                  {parseFloat(vendor.distance).toFixed(1)} {isArabic ? "كم" : "km"}
                </span>
              )}
              {vendor.distance && vendor.duration && <span>•</span>}
              {vendor.duration && <span>{vendor.duration}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountDealsCard;
