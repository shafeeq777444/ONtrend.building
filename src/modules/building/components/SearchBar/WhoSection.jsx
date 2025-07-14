import React from 'react';

const WhoSection = ({ 
    showGuestSearch, 
    setShowGuestSearch, 
    setShowLocationSearch, 
    adultCount, 
    childrenCount,
    showCalendar
}) => {
    return (
        <>
            {!showGuestSearch && !showCalendar && (
                <div 
                    className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowGuestSearch(true);
                        setShowLocationSearch(false);
                    }}
                >
                    <div className="text-xs font-semibold text-gray-900 mb-1">Who</div>
                    <div className="text-sm text-gray-600">
                        {adultCount + childrenCount} guest{adultCount + childrenCount !== 1 ? 's' : ''}
                    </div>
                </div>
            )}

            {showGuestSearch && (
                <>
                    <div className="flex-1 px-6 py-4 bg-gray-50 rounded-full">
                        <div className="text-xs font-semibold text-gray-900 mb-1">Who</div>
                        <div className="text-sm text-gray-600">
                            {adultCount + childrenCount} guest{adultCount + childrenCount !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <button
                        className="relative right-10 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100 rounded-full p-1"
                        onClick={e => {
                            e.stopPropagation();
                            setShowGuestSearch(false);
                        }}
                        aria-label="Close guest search"
                    >
                        <img className='w-5 h-5' src="https://img.icons8.com/?size=100&id=83977&format=png&color=000000" alt="" />
                    </button>
                </>
            )}
        </>
    );
};

export default WhoSection; 