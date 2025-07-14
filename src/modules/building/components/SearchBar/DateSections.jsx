import React from 'react';
import { format } from 'date-fns';

const DateSections = ({ checkInDate, checkOutDate, onSectionClick }) => {
    return (
        <>
            <div className="w-px h-12 bg-gray-300"></div>

            {/* Check-in */}
            <div
                className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                onClick={() => onSectionClick('checkin')}
            >
                <div className="text-xs font-semibold text-gray-900 mb-1">Check-in</div>
                <div className="text-sm text-gray-600">
                    {checkInDate ? format(checkInDate, 'dd MMM yyyy') : 'Add dates'}
                </div>
            </div>

            <div className="w-px h-12 bg-gray-300"></div>

            {/* Check-out */}
            <div
                className="flex-1 px-6 py-4 hover:bg-gray-50 rounded-full cursor-pointer transition-colors"
                onClick={() => onSectionClick('checkout')}
            >
                <div className="text-xs font-semibold text-gray-900 mb-1">Check-out</div>
                <div className="text-sm text-gray-600">
                    {checkOutDate ? format(checkOutDate, 'dd MMM yyyy') : 'Add dates'}
                </div>
            </div>

            <div className="w-px h-12 bg-gray-300"></div>
        </>
    );
};

export default DateSections;
