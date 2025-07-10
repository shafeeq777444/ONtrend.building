import React from 'react';
import { format } from 'date-fns';

const DateRangeSelectorDisplay = ({ startDate, endDate }) => {
  return (
    <div className="flex justify-center items-center gap-8 bg-white p-6 rounded-xl shadow-md">
      {/* Start Date */}
      <div className="text-center">
        <p className="text-sm text-pink-600 font-medium mb-1">Start date</p>
        <p className="text-4xl font-bold text-gray-800">
          {format(startDate, 'dd')}
        </p>
        <p className="text-sm text-gray-600 uppercase tracking-widest">
          {format(startDate, 'MMM yyyy')}
        </p>
        <p className="text-xs text-gray-500 mt-1">{format(startDate, 'EEEE')}</p>
      </div>

      {/* Arrow */}
      {/* <span className="text-pink-500 text-3xl">→</span> */}
      <img className='rotate-270 ' src='/extras/arrow.png'/>

      {/* End Date */}
      <div className="text-center">
        <p className="text-sm text-pink-600 font-medium mb-1">End date</p>
        <p className="text-4xl font-bold text-gray-800">
          {format(endDate, 'dd')}
        </p>
        <p className="text-sm text-gray-600 uppercase tracking-widest">
          {format(endDate, 'MMM yyyy')}
        </p>
        <p className="text-xs text-gray-500 mt-1">{format(endDate, 'EEEE')}</p>
      </div>
    </div>
  );
};

export default DateRangeSelectorDisplay;
