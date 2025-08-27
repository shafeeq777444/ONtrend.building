import React, { useState } from "react";
import { ShoppingCart, Clock, MapPin, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RatingStars from "@/shared/components/common/RatingStar";
import FavoriteButton from "@/shared/components/common/FavouriteButton";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

const WishlistCard = ({ item, isLiked }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const isArabic = i18n.language === "ar";
  
  const averageRating =
    item.Ratings && item.totalRatings
      ? item.Ratings / item.totalRatings
      : 0;

  const logo = item.image;
  const background =
    item.bannerImage?.[2] || item.bannerImage?.[1] || item.bannerImage?.[0];

  const handleCardClick = () => {
    navigate(`/food/${item.id}`);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
   navigate(`/food/${item.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${isArabic ? item?.restaurantArabicName || item?.restaurantName : item?.restaurantName}`}
    >
      {/* Banner Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageError && background ? (
          <LazyImg
            src={background}
            alt={`${item.restaurantName} banner`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8" />
              </div>
              <p className="text-sm">{t("Image not available")}</p>
            </div>
          </div>
        )}

        {/* Status Overlays */}
        {!item.isOnline && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {t("Currently Busy")}
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button 
            onClick={handleQuickView}
            className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-white transition-colors flex items-center gap-2 cursor-pointer"
            aria-label={`Quick view ${item.restaurantName}`}
          >
            <Eye className="w-4 h-4" />
            {t("Quick View")}
          </button>
        </div>

        {/* Action Icons */}
        <div className={`absolute ${isArabic ? "left-3" : "right-3"} top-3 z-20`}>
          <FavoriteButton product={item} isLiked={isLiked} />
        </div>

        {/* Rating Badge */}
        {averageRating > 0 && (
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
            <RatingStars rating={averageRating} size="sm" />
            <span className="text-xs font-medium text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Restaurant Info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0">
            {!logoError && logo ? (
              <LazyImg
                src={logo}
                alt={`${item.restaurantName} logo`}
                className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                onError={() => setLogoError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-lg font-bold">
                  {(isArabic ? item?.restaurantArabicName || item?.restaurantName : item?.restaurantName)?.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 truncate">
              {isArabic ? item?.restaurantArabicName || item?.restaurantName : item?.restaurantName}
            </h3>
            {item.cuisine && (
              <p className="text-sm text-gray-600 truncate">
                {item.cuisine}
              </p>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            {item.distance && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{item.distance.toFixed(1)} {t('km')}</span>
              </div>
            )}
            {item.estimatedTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{item.estimatedTime} {t("mins")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default WishlistCard;
