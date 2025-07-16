import React from "react";
import { FaBed, FaUserFriends, FaChild, FaRulerCombined } from "react-icons/fa";
import { MdLayers, MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BuildingRoomCard = ({ room }) => {
  const navigate=useNavigate()
  console.log(room,'-rrom')
  
  // Fallback values
  const fallbackData = {
    name: "Deluxe Room",
    roomType: "Standard",
    price: "50",
    bedCount: "2",
    bedType: "Queen",
    maxAdults: "2",
    maxChildren: "1",
    roomNumber: "101",
    floor: "1"
  };

  return (
    <div onClick={()=>navigate(`/building/${room?.building_id}/room/${room?.id}`)} className="w-full bg-white rounded-xl shadow-md overflow-hidden h-[280px]">
       {/* Image */}
       <div className="px-4 pb-3">
        <img
          src={
            room?.images?.[0] ||
            "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000"
          }
          alt={room?.name || "Room"}
          className="w-full h-[140px] object-cover rounded-lg"
        />
      </div>
      {/* Header with Room Info */}
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {room?.name || fallbackData.name}
            </h3>
            <p className="text-sm text-gray-600">
              {room?.room_type?.type || fallbackData.roomType}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {room?.price_per_night || fallbackData.price} OMR
            </div>
            <div className="text-xs text-gray-500">per night</div>
          </div>
        </div>
      </div>

     

      {/* Room Details */}
      <div className="px-4 pb-3">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <FaBed className="text-gray-400" />
            <span>{room?.bed_count || fallbackData.bedCount} {room?.bed_type?.type || fallbackData.bedType} Beds</span>
            <span className="text-gray-300">•</span>
            <FaUserFriends className="text-gray-400" />
            <span>{room?.max_adults || fallbackData.maxAdults} Adults</span>
            <span className="text-gray-300">•</span>
            <FaChild className="text-gray-400" />
            <span>{room?.max_children || fallbackData.maxChildren} Child</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLayers className="text-gray-400" />
            <span>Room {room?.room_number || fallbackData.roomNumber}</span>
            <span className="text-gray-300">•</span>
            <span>Floor {room?.floor || fallbackData.floor}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BuildingRoomCard;
