/* eslint-disable no-unused-vars */
import { FaStar } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu"; // modern badge icon
import { motion } from "framer-motion";

const RoomGuestFavouriteBadge = () => {
    return (
        <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
            {/* Badge Section */}
            <div className="flex items-center gap-3">
                <motion.div
          className="p-2 bg-orange-100 text-orange-600 rounded-full"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.img
            className="w-10 h-10"
            src="/extras/roomFavourite2.png"
            alt="Guest Favourite"
          />
        </motion.div>
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
