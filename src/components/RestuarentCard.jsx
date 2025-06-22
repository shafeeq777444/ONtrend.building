import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import FavoriteButton from "./common/FavouriteButton";

// Optional: Simple RatingStars (you can customize this if needed)
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

const RestuarentCard = ({ restaurant, topRestuarents = false, isLiked }) => {
  const navigate = useNavigate();
  const averageRating = restaurant.Ratings && restaurant.totalRatings
    ? restaurant.Ratings / restaurant.totalRatings
    : 0;
// console.log(isLiked,restaurant?.id)
  return (
    <div className="px-1 pb-3">
      <div
        onClick={() => navigate(`/food/${restaurant?.id}`)}
        className="relative rounded-lg overflow-hidden shadow-md min-w-[220px] bg-white group transition-transform hover:scale-[1.02] duration-300 ease-in-out hover:z-10"
      >
        {/* Busy Overlay */}
        {!restaurant.isOnline && topRestuarents && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <span className="text-white text-sm font-semibold">Busy</span>
          </div>
        )}

        {/* Favorite (Heart) Button */}
        <FavoriteButton
        product ={restaurant}
        isLiked={isLiked}
        />

        {/* Banner Image */}
        <div className="relative w-full aspect-[4/3]">
          <img
            loading="lazy"
            src={restaurant.bannerImage?.[2] || restaurant.bannerImage?.[1]}
            alt={restaurant.restaurantName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = restaurant.bannerImage?.[0];
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-3 flex items-start space-x-3 z-20">
          {/* Logo */}
          <div className="rounded-lg w-14 h-14 shadow-md overflow-hidden  bg-white">
            <img
              loading="lazy"
              src={restaurant.image}
              alt={`${restaurant.restaurantName} Logo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="text-white">
            <h3 className="text-sm font-semibold max-w-[140px] break-words leading-tight">
              {restaurant.restaurantName}
            </h3>

            {/* Ratings */}
            {averageRating > 0 && (
              <div className="flex items-center gap-1 mt-0.5">
                <RatingStars rating={averageRating} />
                <span className="text-xs text-white/80">
                  ({restaurant.Ratings || 0})
                </span>
              </div>
            )}

            {/* Distance & Time */}
            {(restaurant.distance || restaurant.estimatedTime) && (
              <p className="text-xs text-white/90 mt-0.5 flex items-center space-x-1">
                {restaurant.distance && <span>{restaurant.distance.toFixed(1)} km</span>}
                {restaurant.distance && restaurant.estimatedTime && <span>•</span>}
                {restaurant.estimatedTime && <span>{restaurant.estimatedTime}</span>}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestuarentCard;
