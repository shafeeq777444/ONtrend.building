/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhereSection from "../components/SearchBar/WhereSection";
import WhoSection from "../components/SearchBar/WhoSection";
import SearchButton from "../components/SearchBar/SearchButton";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangePickerSection from "../components/SearchBar/DateSections";
import { useDispatch, useSelector } from "react-redux";
import { setWhereSlice,setCheckInSlice,setCheckOutSlice,setAdultCountSlice,setChildrenCountSlice } from "../slices/buildingSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const BuildingRoomSearchBar = () => {
    // --------------------------------   states------------------------------------
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { where, checkIn, checkOut, adultCount, childrenCount } = useSelector(state => state.building);

    const [showGuestSearch, setShowGuestSearch] = useState(false);
    const [hasUserChangedGuests, setHasUserChangedGuests] = useState(false);
    
    // Get URL parameters
    const urlParams = new URLSearchParams(location.search);
    const urlCheckIn = urlParams.get('checkIn');
    const urlCheckOut = urlParams.get('checkOut');
    const urlAdults = urlParams.get('adults');
    const urlChildren = urlParams.get('children');
    const urlLocation = urlParams.get('location');
    
    // Initialize state from URL params first, then Redux, then defaults
    const [locationInputValue, setLocationInputValue] = useState(urlLocation || where || "");
    
    // Initialize dateRange from URL params first, then Redux state, then default values
    const [dateRange, setDateRange] = useState([
        {
            startDate: urlCheckIn ? new Date(urlCheckIn) : (checkIn ? new Date(checkIn) : null),
            endDate: urlCheckOut ? new Date(urlCheckOut) : (checkOut ? new Date(checkOut) : null),
            key: "selection",
        },
    ]);
    
    // Initialize Redux state from URL params if they exist
    useEffect(() => {
        if (urlLocation) dispatch(setWhereSlice(urlLocation));
        if (urlCheckIn) dispatch(setCheckInSlice(new Date(urlCheckIn).getTime()));
        if (urlCheckOut) dispatch(setCheckOutSlice(new Date(urlCheckOut).getTime()));
        if (urlAdults) dispatch(setAdultCountSlice(parseInt(urlAdults)));
        if (urlChildren) dispatch(setChildrenCountSlice(parseInt(urlChildren)));
    }, [dispatch, urlLocation, urlCheckIn, urlCheckOut, urlAdults, urlChildren]);

    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // functions
    const handleGuestChange = (type, operation) => {
        setHasUserChangedGuests(true);
        const currentAdultCount = hasUserChangedGuests ? adultCount : (urlAdults ? parseInt(urlAdults) : adultCount);
        const currentChildrenCount = hasUserChangedGuests ? childrenCount : (urlChildren ? parseInt(urlChildren) : childrenCount);
        
        if (type === "adults") {
            if (operation === "increase" && currentAdultCount < 16) {
                dispatch(setAdultCountSlice(currentAdultCount + 1));
            } else if (operation === "decrease" && currentAdultCount > 1) {
                dispatch(setAdultCountSlice(currentAdultCount - 1));
            }
        } else if (type === "children") {
            if (operation === "increase" && currentChildrenCount < 10) {
                dispatch(setChildrenCountSlice(currentChildrenCount + 1));
            } else if (operation === "decrease" && currentChildrenCount > 0) {
                dispatch(setChildrenCountSlice(currentChildrenCount - 1));
            }
        }
    };

    // Update Redux state when dateRange changes
    const handleDateRangeChange = (newDateRange) => {
        setDateRange(newDateRange);
        dispatch(setCheckInSlice(newDateRange[0].startDate?.getTime() || ""));
        dispatch(setCheckOutSlice(newDateRange[0].endDate?.getTime() || ""));
    };

    // Update Redux state when location changes
    const handleLocationChange = (value) => {
        setLocationInputValue(value);
        dispatch(setWhereSlice(value));
    };

    const onClickSearch = () => {
        dispatch(setWhereSlice(locationInputValue));
        dispatch(setCheckInSlice(dateRange[0].startDate?.getTime() || ""));
        dispatch(setCheckOutSlice(dateRange[0].endDate?.getTime() || ""));
        dispatch(setAdultCountSlice(adultCount || 0));
        dispatch(setChildrenCountSlice(childrenCount || 0));
        console.log("dateRange:", dateRange, "adultCount:", adultCount, "childrenCount:", childrenCount, "LocationinputValue:", locationInputValue, "search");
        const params = {};
        if (locationInputValue) params.location = locationInputValue;
        if (dateRange[0]?.startDate) params.checkIn = dateRange[0].startDate.toISOString();
        if (dateRange[0]?.endDate) params.checkOut = dateRange[0].endDate.toISOString();
        if (adultCount) params.adults = adultCount;
        if (childrenCount) params.children = childrenCount;

        const queryParams = new URLSearchParams(params).toString();
        navigate(`/building/search${queryParams ? `?${queryParams}` : ''}`);
        toast.success("search Completed");
    };
    // ------------------ Scroll Handler ------------------
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // --------------------------------  UI return------------------------------------
    return (
        <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: isVisible ? 0 : 0, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="sticky top-16 z-20"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg p-2 max-w-4xl mx-auto"
            >
                <div className="hidden lg:flex items-center justify-between">
                    {/* location section */}
                    <WhereSection inputValue={locationInputValue} setInputValue={handleLocationChange} />
                    {/* Date section */}
                    <DateRangePickerSection dateRange={dateRange} setDateRange={handleDateRangeChange} isSearchBar={true} />
                    {/* guest amount section */}
                    <WhoSection
                        showGuestSearch={showGuestSearch}
                        setShowGuestSearch={setShowGuestSearch}
                        handleGuestChange={handleGuestChange}
                        adultCount={hasUserChangedGuests ? adultCount : (urlAdults ? parseInt(urlAdults) : adultCount)}
                        childrenCount={hasUserChangedGuests ? childrenCount : (urlChildren ? parseInt(urlChildren) : childrenCount)}
                    />
                    <SearchButton onClick={onClickSearch} />
                </div>
            </motion.div>

            {/* guest selection modal */}
        </motion.div>
    );
};

export default BuildingRoomSearchBar;
