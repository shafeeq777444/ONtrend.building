/* eslint-disable no-unused-vars */
import { FaStar } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu"; // modern badge icon
import { motion } from "framer-motion";

const RoomGuestFavouriteBadge = () => {
    return (
        <div className=" mt-6 rounded-2xl border border-gray-200 pr-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm md: max-w-4xl">
            {/* Badge Section */}
            <div className="flex items-center gap-3">
        <img src="/extras/shield.gif"></img>
                <div>
                    <p className="text-sm font-semibold text-gray-800">Ontrend Guest Favourite</p>
                    <p className="text-sm text-gray-600">Top-rated on Ontrend, Guests call it their happy place</p>
                </div>
            </div>

            {/* Rating Section */}
                <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">4.87</p>
                    <div className="flex justify-center text-black-500 text-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                </div>

            <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-gray-300 pt-4 sm:pt-0 sm:pl-6">
                <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">15</p>
                    <p className="text-xs text-gray-500">Reviews</p>
                </div>
            </div>
        </div>
    );
};

export default RoomGuestFavouriteBadge;
