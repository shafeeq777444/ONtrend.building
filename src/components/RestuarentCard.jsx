import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./common/FavouriteButton";

const RestuarentCard = ({ restaurant, favorites, toggleFavorite, topRestuarents = false }) => {
    const navigate = useNavigate();
    return (
        <div className="p-1">
            <div
                onClick={() => navigate("/food/id")}
                className={`relative rounded-md overflow-hidden shadow-md min-w-[220px] group transition-transform hover:scale-[1.02] duration-300 ease-in-out hover:z-10 `}
            >
                {/* Busy Overlay */}
                {!restaurant.isOnline && topRestuarents && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <span className="text-white text-sm font-semibold">Busy</span>
                    </div>
                )}

                {/* Heart Button */}
                <FavoriteButton
                    isLiked={favorites.includes(restaurant.id)}
                    onToggle={() => toggleFavorite(restaurant.id)}
                />

                {/* Main Image */}
                <div className="relative w-full aspect-[4/4]">
                    <img
                        loading="lazy"
                        src={restaurant.bannerImage?.[2]}
                        alt={restaurant.restaurantName}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
                </div>

                {/* Logo */}
                <div className="absolute bottom-4 left-3 flex items-start  space-x-3 z-20">
                    {/* Logo */}
                    <div className="rounded-md w-14 h-14 shadow-md overflow-hidden">
                        <img
                            loading="lazy"
                            src={restaurant.image}
                            alt={`${restaurant.restaurantName} Logo`}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

                    {/* Name */}
                    <div className="text-white">
                        <h3 className="text-sm font-semibold max-w-[130px] break-words mt-2">
                            {restaurant.restaurantName}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestuarentCard;
