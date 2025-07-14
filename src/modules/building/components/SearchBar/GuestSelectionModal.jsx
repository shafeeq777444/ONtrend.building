import React, { useRef, useEffect } from 'react';

const GuestSelectionModal = ({ 
    showGuestSearch, 
    adultCount, 
    childrenCount, 
    handleGuestChange ,
    isSearchBar=true,
    setShowGuestSearch // <-- add this prop
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowGuestSearch(false);
            }
        }
        if (showGuestSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showGuestSearch, setShowGuestSearch]);

    if (!showGuestSearch) return null;

    return (
        <div ref={modalRef} className={`absolute ${isSearchBar ? 'top-full left-162 right-84 mt-2' : ' left-0 right-0'}  bg-white border border-gray-200 rounded-3xl shadow-lg px-5 py-4 z-50`}>
            <div className="space-y-6">
                {/* Adults */}
                <div className="flex bg-gray-50 p-4 rounded-full items-center justify-between">
                    <div className=''>
                        <div className="font-semibold text-gray-900">Adults</div>
                        <div className="text-sm text-gray-600">Ages 13 or above</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleGuestChange('adults', 'decrease')}
                            disabled={adultCount <= 1}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <span className="w-8 text-center font-semibold">{adultCount}</span>
                        <button
                            onClick={() => handleGuestChange('adults', 'increase')}
                            disabled={adultCount >= 16}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Children */}
                <div className="flex bg-gray-50 p-4 rounded-full items-center justify-between">
                    <div>
                        <div className="font-semibold text-gray-900">Children</div>
                        <div className="text-sm text-gray-600">Ages 0 to 12</div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleGuestChange('children', 'decrease')}
                            disabled={childrenCount <= 0}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <span className="w-8 text-center font-semibold">{childrenCount}</span>
                        <button
                            onClick={() => handleGuestChange('children', 'increase')}
                            disabled={childrenCount >= 10}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestSelectionModal; 