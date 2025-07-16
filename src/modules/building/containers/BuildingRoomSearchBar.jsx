/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhereSection from "../components/SearchBar/WhereSection";
import WhoSection from "../components/SearchBar/WhoSection";
import SearchButton from "../components/SearchBar/SearchButton";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DateRangePickerSection from "../components/SearchBar/DateSections";

const BuildingRoomSearchBar = () => {
    // --------------------------------   states------------------------------------

    const [showGuestSearch, setShowGuestSearch] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [dateRange, setDateRange] = useState([{ startDate: null, endDate: null, key: "selection" }]);
    const [locationInputValue, setLocationInputValue] = useState('');

    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // functions
    const onClickSearch = () => {
        console.log("dateRange :",dateRange, "adultCount:", adultCount, "childrenCount:", childrenCount, "LocationinputValue:", locationInputValue, "search");
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
    animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.4 }}
    className="sticky top-16 z-50"
>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg p-2 max-w-4xl mx-auto"
            >
                <div className="hidden lg:flex items-center justify-between">
                    {/* location section */}
                    <WhereSection inputValue={locationInputValue} setInputValue={setLocationInputValue} />
                    {/* Date section */}
                    <DateRangePickerSection dateRange={dateRange} setDateRange={setDateRange} isSearchBar={true} />
                    {/* guest amount section */}
                    <WhoSection
                        showGuestSearch={showGuestSearch}
                        setShowGuestSearch={setShowGuestSearch}
                        setAdultCount={setAdultCount}
                        setChildrenCount={setChildrenCount}
                        adultCount={adultCount}
                        childrenCount={childrenCount}
                    />
                    <SearchButton onClick={onClickSearch} />
                </div>
            </motion.div>

            {/* guest selection modal */}
        </motion.div>
    );
};

export default BuildingRoomSearchBar;
