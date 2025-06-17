import { Star, Heart, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

// RatingStars Component
const RatingStars = ({ rating }) => {

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => {
        const full = rating >= i + 1;
        const half = rating > i && rating < i + 1;

        return (
          <div key={i} className="relative w-4 h-4">
            <Star size={12} stroke="#facc15" fill="none" className="absolute top-0 left-0" />
            {full && (
              <Star size={12} stroke="#facc15" fill="#facc15" className="absolute top-0 left-0" />
            )}
            {half && (
              <Star
                size={12}
                stroke="#facc15"
                fill="#facc15"
                className="absolute top-0 left-0"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const TopRatedCards = ({ vendor }) => {
    const navigate=useNavigate()
  const averageRating =
    vendor.Ratings && vendor.totalRatings
      ? vendor.Ratings / vendor.totalRatings
      : 0;

  return (
    <div onClick={()=>navigate(`/food/${vendor?.id}`)} className="rounded-md bg-white shadow-sm relative w-full max-w-lg mx-auto group overflow-hidden">
      {/* Banner Image */}
      {vendor.bannerImage?.length > 0 && (
        <img
          loading="lazy"
          src={vendor.bannerImage[1]}
          alt="Food Item"
          className="aspect-4/3 object-cover rounded-md group-hover:scale-[1.02] duration-300 ease-in transition-all"
        />
      )}

      {/* Overlay Section */}
      <div className="absolute bottom-0 left-0 w-full px-4 py-3 flex justify-between items-end backdrop-blur-[2px] rounded-b-md bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        {/* Left Info */}
        <div className="flex items-start space-x-3">
          {/* Logo */}
          <div className="rounded-lg w-12 h-12 shadow-md overflow-hidden bg-white shrink-0">
            <img
              loading="lazy"
              src={vendor.image}
              alt={`${vendor.restaurantName} Logo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Info */}
          <div className="text-white">
            {/* Restaurant Name */}
            <h3 className="text-sm font-semibold max-w-[160px] break-words leading-tight">
              {vendor.restaurantName}
            </h3>

            {/* Ratings */}
            {averageRating > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <RatingStars rating={averageRating} />
                <span className="text-xs text-white/80">
                  ({vendor.Ratings || 0})
                </span>
              </div>
            )}

            {/* Distance and Time */}
            {(vendor.estimatedTime || vendor.distance) && (
              <div className="flex items-center gap-3 mt-1 text-xs text-white/80">
                {vendor.estimatedTime && (
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-white/60" />
                    {vendor.estimatedTime}
                  </div>
                )}
                {vendor.distance && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-white/60" />
                    {vendor.distance} km
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Wishlist Icon */}
        <div className="flex flex-col gap-2 items-center">
          <button
            className="p-1.5 rounded-full hover:bg-white/10 transition-all duration-200 ease-in-out transform hover:scale-105"
            title="Add to Wishlist"
          >
            <Heart size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRatedCards;
