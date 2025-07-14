// File: BuildingRoomSearchBar.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhereSection from '../components/SearchBar/WhereSection';
import DateSections from '../components/SearchBar/DateSections';
import WhoSection from '../components/SearchBar/WhoSection';
import SearchButton from '../components/SearchBar/SearchButton';
import GuestSelectionModal from '../components/SearchBar/GuestSelectionModal';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const BuildingRoomSearchBar = () => {
    const [showLocationSearch, setShowLocationSearch] = useState(false);
    const [showGuestSearch, setShowGuestSearch] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
    const locationRef = useRef(null);
    const locationInputRef = useRef(null);


    const [dateRange, setDateRange] = useState([
        { startDate: null, endDate: null, key: 'selection' },
    ]);

    const handleGuestChange = (type, operation) => {
        if (type === 'adults') {
            if (operation === 'increase' && adultCount < 16) {
                setAdultCount(adultCount + 1);
            } else if (operation === 'decrease' && adultCount > 1) {
                setAdultCount(adultCount - 1);
            }
        } else if (type === 'children') {
            if (operation === 'increase' && childrenCount < 10) {
                setChildrenCount(childrenCount + 1);
            } else if (operation === 'decrease' && childrenCount > 0) {
                setChildrenCount(childrenCount - 1);
            }
        }
    };

    const handleDateSectionClick = () => {
        setShowCalendar(pre=>!pre);
        setShowLocationSearch(false);
        setShowGuestSearch(false);
    };

    const handleDateRangeChange = (item) => {
        setDateRange([item.selection]);
    };

    const checkInDate = dateRange[0].startDate;
    const checkOutDate = dateRange[0].endDate;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current &&!locationInputRef.current.contains(event.target) && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

    useEffect(() => {
      const handleClickOutside = (event) => {
          if (locationRef.current && !locationRef.current.contains(event.target)) {
              setShowLocationSearch(false);
          }
      };
  
      if (showLocationSearch) {
          const timeout = setTimeout(() => {
              document.addEventListener('mousedown', handleClickOutside);
          }, 0);
          return () => {
              clearTimeout(timeout);
              document.removeEventListener('mousedown', handleClickOutside);
          };
      }
  }, [showLocationSearch]);
  

    return (
        <div className="relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg p-2 max-w-4xl mx-auto"
            >
                <div className="hidden lg:flex items-center justify-between">
                    <WhereSection
                    locationInputRef={locationInputRef}
                        showLocationSearch={showLocationSearch}
                        setShowLocationSearch={setShowLocationSearch}
                        setShowGuestSearch={setShowGuestSearch}
                        locationRef={locationRef}
                        showCalendar={showCalendar}
                    />
                    {!showLocationSearch && !showGuestSearch && (
                        <DateSections
                            checkInDate={checkInDate}
                            checkOutDate={checkOutDate}
                            onSectionClick={handleDateSectionClick}
                        />
                    )}
                    <WhoSection
                        showGuestSearch={showGuestSearch}
                        setShowGuestSearch={setShowGuestSearch}
                        setShowLocationSearch={setShowLocationSearch}
                        adultCount={adultCount}
                        childrenCount={childrenCount}
                        showCalendar={showCalendar}
                    />
                    <SearchButton />
                </div>
            </motion.div>

            {/* Calendar Modal Animation */}
            <AnimatePresence>
                {showCalendar && (
                    <motion.div
                        ref={calendarRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute top-full left-40 right-40 mt-2 bg-white border border-gray-200 rounded-3xl shadow-lg px-5 py-4 z-50 flex flex-col items-center"
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

            <GuestSelectionModal
                showGuestSearch={showGuestSearch}
                adultCount={adultCount}
                childrenCount={childrenCount}
                handleGuestChange={handleGuestChange}
            />
        </div>
    );
};

export default BuildingRoomSearchBar;
