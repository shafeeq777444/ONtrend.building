import React from "react";

// Tab labels
const tabs = [
  "Overview",
  "Rooms & Details",
  "Availability",
  "Amenities",
  "House Rules",
  "Location",
  "Reviews",
];

const RoomDetailSwitchingTab = ({ activeTab, setActiveTab, onTabClick }) => {
  return (
    <div
      className="mt-8 sticky top-20 md:top-14 z-30 backdrop-blur-3xl bg-white/50 rounded-b-2xl p-4  "
      role="tablist"
      aria-label="Room detail sections"
    >
      {/* Scrollable tab container */}
      <div className="flex px-4 gap-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => {
              if (activeTab !== tab) {
                setActiveTab(tab);
                if (onTabClick) onTabClick(tab);
              }
            }}
            className={`relative pb-3 shrink-0 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
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
