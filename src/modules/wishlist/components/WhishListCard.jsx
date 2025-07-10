import React from "react";
import { ShoppingCart } from "lucide-react";
import FavoriteButton from "../common/FavouriteButton";
import { useNavigate } from "react-router-dom";
import RatingStars from "../common/RatingStar";
import { useTranslation } from "react-i18next";

const WishlistCard = ({ item, isLiked }) => {
  const navigate = useNavigate();
  const{t,i18n}=useTranslation()
  const isArabic = i18n.language === "ar";
  const averageRating =
    item.Ratings && item.totalRatings
      ? item.Ratings / item.totalRatings
      : 0;

  const logo = item.image;
  const background =
    item.bannerImage?.[2] || item.bannerImage?.[1] || item.bannerImage?.[0];

  return (
    <div
      onClick={() => navigate(`/food/${item.id}`)}
      className="group relative w-[220px] overflow-hidden rounded-xl shadow-md bg-white transition-transform hover:scale-[1.02]"
    >
      {/* Banner Image */}
      <div
        className="relative h-[180px] bg-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Busy Overlay only on image */}
        {!item.isOnline && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="text-white text-sm font-semibold">{t("busy")}</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300" />

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100 z-10">
          <button className="rounded-full bg-white/90 px-4 py-1 text-xs font-medium text-black shadow hover:bg-white">
            Quick View
          </button>
        </div>

        {/* Action Icons */}
        <div className={`absolute ${isArabic ?"left-16 ":"right-2  " } items-end top-2 flex flex-col gap-2 z-20`}>
          <FavoriteButton product={item} isLiked={isLiked} />
        </div>
        
      </div>

      {/* Bottom Info */}
      <div className="flex items-start gap-3 bg-white p-3">
        <img
          src={logo}
          alt={`${item.restaurantName} logo`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="text-sm font-semibold">
            {isArabic? item?.restaurantArabicName || item?.restaurantName : item?.restaurantName}
          </h4>
          <div className="flex items-center space-x-1 mt-0.5">
            <RatingStars rating={averageRating} />
          </div>

          {/* Distance & Time */}
          {(item.distance || item.estimatedTime) && (
            <p className="text-xs text-gray-500 mt-0.5">
              {item.distance && (
                <span>{item.distance.toFixed(1)} { t('km')}</span>
              )}
              {item.distance && item.estimatedTime && <span> • </span>}
              {item.estimatedTime && <span>{item.estimatedTime} {t("mins")}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
