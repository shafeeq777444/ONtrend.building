import React from "react";
import GuestSelectionModal from "./GuestSelectionModal";

const WhoSection = ({
    showGuestSearch,
    setShowGuestSearch,
    setAdultCount,
    setChildrenCount,
    adultCount,
    childrenCount,
    showCalendar,
}) => {
    // --------------------------------   functions--------------------------------
    const handleGuestChange = (type, operation) => {
        if (type === "adults") {
            if (operation === "increase" && adultCount < 16) {
                setAdultCount(adultCount + 1);
            } else if (operation === "decrease" && adultCount > 1) {
                setAdultCount(adultCount - 1);
            }
        } else if (type === "children") {
            if (operation === "increase" && childrenCount < 10) {
                setChildrenCount(childrenCount + 1);
            } else if (operation === "decrease" && childrenCount > 0) {
                setChildrenCount(childrenCount - 1);
            }
        }
    };

    // -------------------------------- UI --------------------------------
    return (
        <>
            {!showGuestSearch && !showCalendar && (
                <div
                    className="select-none flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowGuestSearch(true);
                    }}
                >
                    <div className="text-xs font-semibold text-gray-900 mb-1">Who</div>
                    <div className="text-sm text-gray-600">
                        {adultCount} adult{adultCount !== 1 ? "s" : ""}, {childrenCount} child{childrenCount !== 1 ? "ren" : ""}
                    </div>
                </div>
            )}

            {showGuestSearch && (
                <div className="flex-1 px-6 py-4 bg-gray-50 rounded-full">
                    <div className="text-xs font-semibold text-gray-900 mb-1">Who</div>
                    <div className="text-sm text-gray-600">
                        {adultCount} adult{adultCount !== 1 ? "s" : ""}, {childrenCount} child{childrenCount !== 1 ? "ren" : ""}
                    </div>
                </div>
            )}

            <GuestSelectionModal
                setShowGuestSearch={setShowGuestSearch}
                showGuestSearch={showGuestSearch}
                adultCount={adultCount}
                childrenCount={childrenCount}
                handleGuestChange={handleGuestChange}
            />
        </>
    );
};

export default WhoSection;
