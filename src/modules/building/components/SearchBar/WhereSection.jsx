// File: WhereSection.jsx
import React, { useRef, useEffect, useState } from 'react';
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

const WhereSection = ({ showLocationSearch, setShowLocationSearch, setShowGuestSearch, locationRef, showCalendar,locationInputRef }) => {
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (showLocationSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showLocationSearch]);

    const filteredPlaces = mockPlaces.filter(place =>
        place.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        place.subDetail.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <>
            {!showCalendar && (
                <div
                ref={locationInputRef}
                    className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors relative"
                    onClick={() => {
                        setShowLocationSearch(true);
                        setShowGuestSearch(false);
                    }}
                >
                    <div  className="text-xs font-semibold  text-gray-900 mb-1">Where</div>
                    <input
                        type="text"
                        placeholder="Search destinations"
                        className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
                        readOnly={!showLocationSearch}
                        ref={inputRef}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        autoFocus={showLocationSearch}
                    />
                    <AnimatePresence>
                        {showLocationSearch && (
                            <motion.div
                                ref={locationRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 mt-7 w-full bg-white shadow-lg rounded-xl border p-2 z-10"
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

            <AnimatePresence>
                {showLocationSearch && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="relative right-10 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100 rounded-full p-1"
                        onClick={e => {
                            e.stopPropagation();
                            setShowLocationSearch(false);
                        }}
                        aria-label="Close location search"
                    >
                        <img className='w-5 h-5' src="https://img.icons8.com/?size=100&id=83977&format=png&color=000000" alt="" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default WhereSection;
