import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Heart, Share2, MapPin } from "lucide-react";
import { IoIosArrowBack } from "react-icons/io";
import FavoriteButton from "../common/FavouriteButton";
import { IoIosShareAlt } from "react-icons/io";
import { FaStar } from "react-icons/fa";

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
        <div className="fixed top-14 right-0 w-full">
            <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden  shadow-md">
                {/* Banner Image */}
                <img
                    src={currentVendor?.bannerImage?.[1]}
                    alt="Food Vendor Banner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = currentVendor?.bannerImage?.[0];
                    }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent " />
                {/* Top Controls */}
                <div className="absolute top-6 left-6 right-4 flex justify-between items-center ">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition"
                    >
                       <IoIosArrowBack width={16} height={16}/>
                    </button>
                    <div className="flex gap-2">
                         <button
                            onClick={handleShare}
                            className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow hover:bg-white transition"
                        >
                            <IoIosShareAlt />
                        </button>
                        {/* <div className="relative"><FavoriteButton/></div> */}
                       
                    </div>
                </div>
                {/* Vendor Info */}
                <div className="absolute bottom-0 left-0 right-0  px-4 pb-4">
                    <div className="flex items-end gap-4">
                        <img
                            src={currentVendor?.image}
                            alt={currentVendor?.restaurantName}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                        />
                        <div className="flex-1">
                            <h2 className="text-white text-xl font-bold leading-tight line-clamp-1">
                                {currentVendor?.restaurantName}
                            </h2>
                            <div className="flex items-center text-sm text-gray-200 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="line-clamp-1">{currentVendor?.businessAddress}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 text-white text-sm shadow-sm">
                        <div className="flex-1 text-center">
                            <div className="flex justify-center items-center gap-1 font-medium">
                                <FaStar />
                                {rating} 
                            </div>
                            <div className="text-xs text-gray-200">Reviews</div>
                        </div>
                        <div className="flex-1 text-center border-x border-white/20">
                            <div className="font-medium">{currentVendor?.distance} km</div>
                            <div className="text-xs text-gray-200">Distance</div>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="font-medium">{currentVendor?.estimatedTime}</div>
                            <div className="text-xs text-gray-200">Delivery Time</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodVendorHeader;
