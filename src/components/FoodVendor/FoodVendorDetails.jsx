import React from "react";
import { MapPin } from "lucide-react";
import { Star as StarIcon } from "lucide-react";

const FoodVendorDetails = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Woke Ramen"
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">Woke Ramen</h2>
          <p className="text-sm text-gray-500">Woke Ramen serves bold flavors</p>
          
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Changi Airport Terminal 1</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mt-1">
            <StarIcon className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="mr-2">4.2 (120)</span>
            <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">Chinese</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between bg-gray-100 mt-4 rounded-xl p-3 text-center">
        <div>
          <div className="font-semibold text-black">₹18.50</div>
          <div className="text-xs text-gray-500">Price</div>
        </div>
        <div>
          <div className="font-semibold text-black">0.7 km</div>
          <div className="text-xs text-gray-500">Distance</div>
        </div>
        <div>
          <div className="font-semibold text-black">00:18</div>
          <div className="text-xs text-gray-500">Delivery Time</div>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorDetails;
