// BookingSidebar.jsx
import { Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  setAdultCountSlice, setChildrenCountSlice } from "../../slices/buildingSlice";
import WhoSection from "../SearchBar/WhoSection";
import GuestSelectionModal from "../SearchBar/GuestSelectionModal";

const BuildingBookingSideBar = ({room,setActiveTab,onTabClick}) => {
    
    // ------------------ hooks ------------------------------
    const dispatch = useDispatch();
    // ------------------ states ------------------------------
    const { checkIn, checkOut, adultCount, childrenCount } = useSelector(state => state.building);
    console.log(checkIn, checkOut, adultCount, childrenCount,"checkIn, checkOut, adultCount, childrenCount");
    let totalPrice=0
    const [showGuestSearch, setShowGuestSearch] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [dateRange, setDateRange] = useState([
        {
            startDate: checkIn ? new Date(checkIn) : new Date(),
            endDate: checkOut ? new Date(checkOut) : new Date(new Date().setDate(new Date().getDate() + 1)),
            key: "selection",
        },
    ]);

    // Sync dateRange with Redux state
    useEffect(() => {
        setDateRange([{
            startDate: checkIn ? new Date(checkIn) : new Date(),
            endDate: checkOut ? new Date(checkOut) : new Date(new Date().setDate(new Date().getDate() + 1)),
            key: "selection",
        }]);
    }, [checkIn, checkOut]);

    // ------------------ functions ------------------------------
    const totalPricePerDay=()=>{
        totalPrice=room?.price_per_night
        
        if(adultCount>room?.max_adults){
            totalPrice+=(adultCount-room?.max_adults)*room?.extra_person_charge  
        }
        if(childrenCount>room?.max_children){
            totalPrice+=(childrenCount-room?.max_children)*room?.extra_person_charge
        }
        return totalPrice
    }

    const handleGuestChange = (type, operation) => {
        if (type === "adults") {
            if (operation === "increase" && adultCount < 16) {
                dispatch(setAdultCountSlice(adultCount + 1));
            } else if (operation === "decrease" && adultCount > 1) {
                dispatch(setAdultCountSlice(adultCount - 1));
            }
        } else if (type === "children") {
            if (operation === "increase" && childrenCount < 10) {
                dispatch(setChildrenCountSlice(childrenCount + 1));
            } else if (operation === "decrease" && childrenCount > 0) {
                dispatch(setChildrenCountSlice(childrenCount - 1));
            }
        }
    };

    // Update Redux state when dateRange changes

    const checkInDate = dateRange[0].startDate;
    const checkOutDate = dateRange[0].endDate;
// -------------------------- ui ------------------------------
    return (
        <div className="w-full max-w-sm pb-14 px-2 pt-2 rounded-xl border shadow-sm bg-white space-y-4  h-100  ">
            {/* Date Section */}
            <div className="relative">
                <div
                    onClick={() => {
                        onTabClick("Availability");
                        setActiveTab("Availability");
                    }}
                    className="border rounded-lg p-3 space-y-1 cursor-pointer hover:bg-gray-50 transition"
                >
                    <div className="flex items-center text-sm text-gray-500">
                        {/* You can add a calendar icon here if desired */}
                        Dates
                    </div>
                    <div className="text-sm font-medium">
                        {checkInDate && checkOutDate ? `${checkInDate.toDateString()} → ${checkOutDate.toDateString()}` : "Add dates"}
                    </div>
                </div>
            </div>
            <div className="w-full h-px bg-gray-200 my-2" />
            {/* Guests */}
            <div
                onClick={() => setShowGuestSearch(true)}
                className="border rounded-lg p-3 space-y-1 cursor-pointer hover:bg-gray-50 transition"
            >
                <div className="flex items-center text-sm text-gray-500">Guests</div>
                <div className="text-sm font-medium">
                    {adultCount} Adult{adultCount > 1 ? "s" : ""}
                    {childrenCount > 0 ? `, ${childrenCount} Child${childrenCount > 1 ? "ren" : ""}` : ""}
                </div>
            </div>
            <GuestSelectionModal
                isSearchBar={false}
                showGuestSearch={showGuestSearch}
                adultCount={adultCount}
                childrenCount={childrenCount}
                handleGuestChange={handleGuestChange}
                setShowGuestSearch={setShowGuestSearch}
            />
            {/* Special Rates */}
            <div className="border rounded-lg p-3 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                    <Tag className="w-4 h-4 mr-2" />
                    Special Rates
                </div>
                <div className="text-sm font-medium">Lowest Regular Rate</div>
            </div>
            <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                <span>Pricing</span>
                <span>
                  OMR {totalPricePerDay()}<span className="text-sm font-normal text-gray-500">/night</span>
                </span>
            </div>
            {/* Reserve Button */}
            <button
                type="button"
                className="w-full py-2 bg-black text-white rounded-md text-sm font-medium hover:opacity-90 transition"
            >
                Reserve
            </button>
        </div>
    );
};

export default BuildingBookingSideBar;
