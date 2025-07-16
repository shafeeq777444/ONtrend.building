import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const mockPlaces = [
  { name: 'Near Me', subDetail: 'Use current location', icon: '📍' },
  { name: 'Muscat', subDetail: 'Capital City', icon: '🏙️' },
  { name: 'Salalah', subDetail: 'Dhofar Governorate', icon: '🌴' },
  { name: 'Nizwa', subDetail: 'Al Dakhiliyah', icon: '🏰' },
  { name: 'Sohar', subDetail: 'Al Batinah North', icon: '⚓' },
  { name: 'Sur', subDetail: 'Ash Sharqiyah South', icon: '🚤' },
  { name: 'Al Buraimi', subDetail: 'Al Buraimi Governorate', icon: '🏜️' },
  { name: 'Ibri', subDetail: 'Al Dhahirah', icon: '⛰️' },
  { name: 'Rustaq', subDetail: 'Al Batinah South', icon: '🏞️' },
  { name: 'Khasab', subDetail: 'Musandam', icon: '🌊' },
  { name: 'Bahla', subDetail: 'Al Dakhiliyah', icon: '🏯' },
];

const WhereSection = ({inputValue, setInputValue}) => {
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const inputRef = useRef(null);
  const whereRef = useRef(null);
  const locationRef = useRef(null);
  const locationInputRef = useRef(null);


  // Focus input
  useEffect(() => {
    if (showLocationSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showLocationSearch]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        whereRef.current &&
        !whereRef.current.contains(event.target)
      ) {
        setShowLocationSearch(false);
      }
    };
  
    const handleScroll = () => {
      setShowLocationSearch(false);
    };
  
    if (showLocationSearch) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [showLocationSearch]);

  const filteredPlaces = mockPlaces?.filter((place) =>
    place.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    place.subDetail.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      {  (
        <div
          className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors relative"
          ref={locationInputRef}
        >
          {/* CLICK TRIGGER */}
          <div
          className='select-none'
            ref={whereRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowLocationSearch((prev) => !prev);

            }}
          >
            <div className="text-xs font-semibold text-gray-900 mb-1">Where</div>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
              readOnly={!showLocationSearch}
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus={showLocationSearch}
            />
          </div>

          {/* SUGGESTION MODAL */}
          <AnimatePresence>
            {showLocationSearch && (
              <motion.div
                ref={locationRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-7 w-full bg-white shadow-lg rounded-xl border p-2 z-50"
              >
                {filteredPlaces.length > 0 ? (
                  filteredPlaces.map((place, idx) => (
                    <motion.div
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInputValue(place.name);
                        setShowLocationSearch(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                    >
                      <span className="text-2xl">{place.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 text-sm">{place.name}</span>
                        <span className="text-xs text-gray-500">{place.subDetail}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-sm text-gray-400 px-3 py-2">No places found</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default WhereSection;
