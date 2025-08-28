import React from "react";

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
      className="mt-4 md:mt-8 py-3 sticky top-18 bg-white z-30 shadow-b-xl"
      role="tablist"
      aria-label="Room detail sections"
    >
      <div
        className="flex gap-4 md:gap-6 px-2 md:px-4 overflow-x-auto scrollbar-hide"
      >
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
            className={`relative whitespace-nowrap pb-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500
              ${
                activeTab === tab
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
          >
            {tab}
            <span
              className={`absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-orange-500 transition-all duration-300
                ${
                  activeTab === tab
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomDetailSwitchingTab;
