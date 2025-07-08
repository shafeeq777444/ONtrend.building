import React, { useState } from "react";

const tabs = [
  "Overview",       // General summary
  "Rooms & Details", // Room types, capacity, pricing info
  "Availability",    // Date picker or calendar
  "Amenities",       
  "House Rules",     // Renamed from "Policies" for clarity
  "Reviews",         
  "Location",        // Renamed from "Map" for natural feel
];

const RoomDetailSwitchingTab = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="border-b mt-8 md:max-w-4xl">
      <div className="flex space-x-6 px-4 gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-3 text-sm font-medium transition-colors duration-300 ${
              activeTab === tab ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-orange-500 transition-all duration-300 ${
                activeTab === tab ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomDetailSwitchingTab;
