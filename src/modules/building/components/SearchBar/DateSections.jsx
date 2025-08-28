/* eslint-disable no-unused-vars */
// File: DateRangePickerSection.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePickerSection = ({ dateRange, setDateRange, isSearchBar = true }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const calendarRef = useRef(null);
    const dateRangeRef = useRef(null);

    const handleSectionClick = () => {
        setShowCalendar((prev) => !prev);
    };

    const handleDateRangeChange = (item) => {
        setDateRange([item.selection]);
    };

    const checkInDate = dateRange[0].startDate;
    const checkOutDate = dateRange[0].endDate;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target) &&
                dateRangeRef.current &&
                !dateRangeRef.current.contains(event.target)
            ) {
                setShowCalendar(false);
            }
        };
    
        const handleScroll = () => {
            setShowCalendar(false);
        }
    
        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
            window.addEventListener("scroll", handleScroll); 
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [showCalendar]);

    return (
        <>
            {/* Check-in & Check-out section */}
            {isSearchBar && (
                <div ref={dateRangeRef} className="flex select-none items-center space-x-1">
                    <div className="w-px h-8 sm:h-12 bg-gray-300"></div>

                    {/* Check-in */}
                    <div
                        className="flex-1 px-3 sm:px-6 py-2 sm:py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                        onClick={handleSectionClick}
                    >
                        <div className="text-xs font-semibold text-gray-900 mb-1">Check-in</div>
                        <div className="text-xs sm:text-sm text-gray-600 min-w-[80px] sm:min-w-[100px] text-start whitespace-nowrap">
                            {checkInDate ? format(checkInDate, "dd MMM yyyy") : "Add dates"}
                        </div>
                    </div>

                    {isSearchBar && <div className="w-px h-8 sm:h-12 bg-gray-300"></div>}

                    {/* Check-out */}
                    <div
                        className="flex-1 px-3 sm:px-6 py-2 sm:py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                        onClick={handleSectionClick}
                    >
                        <div className="text-xs font-semibold text-gray-900 mb-1">Check-out</div>
                        <div className="text-xs sm:text-sm text-gray-600 min-w-[80px] sm:min-w-[100px] text-start whitespace-nowrap">
                            {checkOutDate ? format(checkOutDate, "dd MMM yyyy") : "Add dates"}
                        </div>
                    </div>

                    {isSearchBar && <div className="w-px h-8 sm:h-12 bg-gray-300"></div>}
                </div>
            )}

            {/* Calendar Modal */}
            <AnimatePresence>
                {showCalendar && (
                    <motion.div
                        ref={calendarRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-2 right-2 sm:left-20 sm:right-20 lg:left-40 lg:right-40 mt-2 bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg px-2 sm:px-5 py-2 sm:py-4 z-[10000] flex flex-col items-center"
                    >
                        <DateRange
                            ranges={dateRange}
                            onChange={handleDateRangeChange}
                            moveRangeOnFirstSelection={false}
                            months={isMobile ? 1 : 2}
                            direction={isMobile ? "vertical" : "horizontal"}
                            showDateDisplay={false}
                            rangeColors={["#000"]}
                            minDate={new Date()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DateRangePickerSection;
