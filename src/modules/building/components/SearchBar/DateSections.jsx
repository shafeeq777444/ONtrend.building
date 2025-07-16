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
                    <div className="w-px h-12 bg-gray-300"></div>

                    {/* Check-in */}
                    <div
                        className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                        onClick={handleSectionClick}
                    >
                        <div className="text-xs font-semibold text-gray-900 mb-1">Check-in</div>
                        <div className="text-sm text-gray-600 min-w-[100px] text-start whitespace-nowrap">
                            {checkInDate ? format(checkInDate, "dd MMM yyyy") : "Add dates"}
                        </div>
                    </div>

                    {isSearchBar && <div className="w-px h-12 bg-gray-300"></div>}

                    {/* Check-out */}
                    <div
                        className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                        onClick={handleSectionClick}
                    >
                        <div className="text-xs font-semibold text-gray-900 mb-1">Check-out</div>
                        <div className="text-sm text-gray-600 min-w-[100px] text-start whitespace-nowrap">
                            {checkOutDate ? format(checkOutDate, "dd MMM yyyy") : "Add dates"}
                        </div>
                    </div>

                    {isSearchBar && <div className="w-px h-12 bg-gray-300"></div>}
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
                        className="absolute top-full left-40 right-40 mt-2 bg-white border border-gray-200 rounded-3xl shadow-lg px-5 py-4 z-[10000] flex flex-col items-center"
                    >
                        <DateRange
                            ranges={dateRange}
                            onChange={handleDateRangeChange}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            direction="horizontal"
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
