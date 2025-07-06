import React, { useState } from "react";

const tabs = ["Overview", "Amenities", "Policies", "Reviews", "Map", "Availability"];

const RoomDetailSwitchingTab = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="border-b mt-8">
      <div className="flex space-x-6 max-w-6xl mx-auto px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-6 text-sm font-medium relative transition-colors duration-300 ${
              activeTab === tab ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomDetailSwitchingTab;
