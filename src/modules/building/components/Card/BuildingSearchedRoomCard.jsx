import LazyImg from "@/shared/components/performanceOptimised/LazyImg";
import React from "react";

const fallbackImg = "/extras/imageLost.jpg";

const BuildingSearchedRoomCard = ({ room, handleViewDetails }) => {
  const imageSrc = room?.images?.[0] || fallbackImg;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 max-w-sm w-full mx-auto">
      {/* Room Image */}
      <div className="relative h-40">
        <LazyImg
          src={imageSrc}
          alt={room?.name || "Room"}
          className="w-full h-full object-cover rounded-t-3xl"
        />
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          ${room.price_per_night}/night
        </div>
      </div>
      
      {/* Room Details */}
      <div className="p-4">
        {/* Title + Number */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
          <span className="text-xs text-gray-500">Room {room.room_number}</span>
        </div>
        
        {/* Description */}
        
        {/* Room Type & Area */}
        <div className="flex justify-between items-center mb-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
            {room.room_type?.type}
          </span>
          <span className="text-sm text-gray-600">
            {room.area} {room.area_unit}
          </span>
        </div>
        
        {/* Capacity Info */}
        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
          <span>{room.max_adults} Adults</span>
          <span>{room.max_children} Children</span>
          <span>{room.bed_count} Beds</span>
          <span>Floor {room.floor}</span>
        </div>
        
        {/* Building Info */}
        <div className="text-xs text-gray-500 mb-3">
          {room.building_id?.city}, {room.building_id?.state}, {room.building_id?.country}
        </div>
        
        {/* Extra Charges */}
        {room.extra_person_charge > 0 && (
          <div className="text-xs text-gray-600 mb-1">
            Extra person: +${room.extra_person_charge}/night
          </div>
        )}
        {room.max_children > 0 && (
          <div className="text-xs text-gray-600 mb-3">
            Extra child: +${room.extra_child_charge}/night
          </div>
        )}
        
        {/* Availability + Button */}
        <div className="flex justify-between items-center mt-3">
          <span
            className={`px-2 py-1 rounded-lg text-xs font-semibold ${
              room.is_available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {room.is_available ? "Available" : "Not Available"}
          </span>
          <button
            onClick={() => handleViewDetails(room)}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingSearchedRoomCard;
