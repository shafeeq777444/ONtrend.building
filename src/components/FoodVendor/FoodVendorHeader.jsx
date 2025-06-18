import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin } from "lucide-react";

const FoodVendorHeader = ({ currentVendor }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => setIsFavorite(!isFavorite);

    const handleShare = () => {
        alert("Share clicked!");
    };

    const rating =
        currentVendor?.Ratings && currentVendor?.totalRatings
            ? (currentVendor?.Ratings / currentVendor?.totalRatings).toFixed(1)
            : "0.0";

    return (
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
            {/* Banner Image */}
            <img
                src={currentVendor?.bannerImage?.[1]}
                alt="Food Vendor Banner"
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = currentVendor?.bannerImage?.[0];
                }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-black" />
                </button>

                <div className="flex gap-2">
                    <button
                        onClick={toggleFavorite}
                        className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-black"}`} />
                    </button>
                    <button onClick={handleShare} className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                        <Share2 className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>

            {/* Vendor Info & Stats */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                <div className="flex items-center gap-3">
                    <img
                        src={currentVendor?.image}
                        alt={currentVendor?.restaurantName}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-white"
                    />
                    <div>
                        <h2 className="text-white text-lg font-semibold">{currentVendor?.restaurantName}</h2>
                        <div className="flex items-center text-sm text-gray-200">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="line-clamp-1">{currentVendor?.businessAddress}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 backdrop-blur-sm bg-black/30 p-3 rounded-lg text-white flex justify-between text-center">
                    <div>
                        <div className="font-semibold flex items-center justify-center gap-1">
                            <img width="20" src="https://img.icons8.com/ios/50/rating-circled.png" alt="rating-circled" />
                            {rating} ({currentVendor?.Ratings})
                        </div>
                        <div className="text-xs text-gray-200">Reviews</div>
                    </div>
                    <div>
                        <div className="font-semibold">{currentVendor?.distance} km</div>
                        <div className="text-xs text-gray-200">Distance</div>
                    </div>
                    <div>
                        <div className="font-semibold">{currentVendor?.estimatedTime}</div>
                        <div className="text-xs text-gray-200">Delivery Time</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodVendorHeader;
