/* eslint-disable no-unused-vars */
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const RoomGuestFavouriteBadge = () => {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-sm max-w-4xl">
      {/* 🛡️ Badge Section */}
      <div className="flex items-start sm:items-center gap-3 flex-1">
        <img
          src="/extras/shield.gif"
          alt="Badge"
          className="w-12 h-12 object-contain"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Ontrend Guest Favourite
          </p>
          <p className="text-sm text-gray-600 leading-snug">
            Top-rated on Ontrend, Guests call it their happy place
          </p>
        </div>
      </div>

      {/* ⭐ Rating Section */}
      <div className="text-center sm:border-l sm:pl-6 sm:border-gray-300">
        <p className="text-lg font-bold text-gray-900">4.87</p>
        <div className="flex justify-center text-yellow-500 text-sm gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>

      {/* 📝 Reviews Section */}
      <div className="text-center sm:border-l sm:pl-6 sm:border-gray-300">
        <p className="text-lg font-bold text-gray-900">15</p>
        <p className="text-xs text-gray-500">Reviews</p>
      </div>
    </div>
  );
};

export default RoomGuestFavouriteBadge;
