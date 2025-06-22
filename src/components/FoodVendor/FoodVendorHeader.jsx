import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin } from "lucide-react";

const FoodVendorHeader = ({ currentVendor }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const handleShare = () => alert("Share clicked!");

  const rating =
    currentVendor?.Ratings && currentVendor?.totalRatings
      ? (currentVendor?.Ratings / currentVendor?.totalRatings).toFixed(1)
      : "0.0";

  return (
    <div className="relative w-full h-[120px] sm:h-[140px] rounded-xl overflow-hidden shadow">

      {/* Blurry Background Image */}
      <img
        src={currentVendor?.bannerImage?.[1]}
        alt="Banner"
        className="absolute w-full h-full object-cover blur-sm brightness-50"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = currentVendor?.bannerImage?.[0];
        }}
      />

      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* Top Buttons */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-20">
        <button onClick={() => navigate(-1)} className="bg-white p-1 rounded-full shadow">
          <ArrowLeft className="w-4 h-4 text-black" />
        </button>
        <div className="flex gap-1">
          <button onClick={toggleFavorite} className="bg-white p-1 rounded-full shadow">
            <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-black"}`} />
          </button>
          <button onClick={handleShare} className="bg-white p-1 rounded-full shadow">
            <Share2 className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-2">
        <div className="flex items-center gap-2">
          <img
            src={currentVendor?.image}
            alt={currentVendor?.restaurantName}
            className="w-10 h-10 rounded-lg object-cover border-2 border-white"
          />
          <div className="text-white">
            <h2 className="text-sm font-semibold line-clamp-1">{currentVendor?.restaurantName}</h2>
            <div className="flex items-center text-[10px] text-gray-200">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="line-clamp-1">{currentVendor?.businessAddress}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 backdrop-blur bg-black/30 px-2 py-1 rounded text-white text-[10px] flex justify-between text-center">
          <div className="flex-1">
            <div className="font-semibold flex items-center justify-center gap-1">
              <img width="12" src="https://img.icons8.com/ios/50/rating-circled.png" alt="rating" />
              {rating} ({currentVendor?.Ratings})
            </div>
            <div className="text-[9px] text-gray-300">Reviews</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold">{currentVendor?.distance} km</div>
            <div className="text-[9px] text-gray-300">Distance</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold">{currentVendor?.estimatedTime}</div>
            <div className="text-[9px] text-gray-300">Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorHeader;
