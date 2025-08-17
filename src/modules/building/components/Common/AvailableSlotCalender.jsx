'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { setCheckInSlice, setCheckOutSlice } from '../../slices/buildingSlice';
import AirbnbCalendar, { bookedDates } from './AirbnbCalendar';

// ==== Main Component ====
export default function AvailableSlotCalender() {
  const dispatch = useDispatch();
  const { checkIn, checkOut } = useSelector(state => state.building);
  
  const [isOpen, setIsOpen] = useState(true);
  const [selectedRange, setSelectedRange] = useState({ 
    startDate: checkIn ? new Date(checkIn) : null, 
    endDate: checkOut ? new Date(checkOut) : null 
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Sync Redux state with local state
  useEffect(() => {
    setSelectedRange({
      startDate: checkIn ? new Date(checkIn) : null,
      endDate: checkOut ? new Date(checkOut) : null
    });
  }, [checkIn, checkOut]);

  const handleDateSelect = (date) => {
    const { startDate, endDate } = selectedRange;
  
    if (!startDate || endDate) {
      setSelectedRange({ startDate: date, endDate: null });
      // Update Redux state for check-in date
      dispatch(setCheckInSlice(date.getTime()));
      dispatch(setCheckOutSlice(null));
    } else {
      const rangeStart = date < startDate ? date : startDate;
      const rangeEnd = date < startDate ? startDate : date;
  
      // Check if any date in the range is booked
      const hasUnavailableDate = bookedDates.some((booked) =>
        booked >= rangeStart && booked <= rangeEnd
      );
  
      if (hasUnavailableDate) {
        toast.error('selected range are unavailable');
        setSelectedRange({ startDate: null, endDate: null });
        dispatch(setCheckInSlice(null));
        dispatch(setCheckOutSlice(null));
        return; // Don't update the range
      }
  
      setSelectedRange({ startDate: rangeStart, endDate: rangeEnd });
      
      // Update Redux state
      dispatch(setCheckInSlice(rangeStart.getTime()));
      dispatch(setCheckOutSlice(rangeEnd.getTime()));
    }
  };
  

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const formatRangeHeader = () => {
    const { startDate, endDate } = selectedRange;
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    }
    if (startDate) return `${startDate.toLocaleDateString()} - Select checkout`;
    return 'Plan Your Stay';
  };

  if (!isOpen) {
    return (
      <div className="max-w-sm mx-auto mt-8 px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full border border-gray-300 rounded-lg p-4 text-left hover:border-gray-400 transition-colors"
        >
          <div className="text-xs text-gray-600 mb-1 font-medium">CHECK-IN · CHECK-OUT</div>
          <div className="text-sm text-gray-900">
            {checkIn && checkOut
              ? `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`
              : checkIn
              ? `${new Date(checkIn).toLocaleDateString()} - Select checkout`
              : 'Add dates'}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 md:mt-8 px-2">
      <div className="flex items-center justify-center p-2 md:p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] md:max-h-[90vh] overflow-auto md:overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
            <h1 className="text-base md:text-lg font-semibold text-gray-900 truncate">{formatRangeHeader()}</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full touch-manipulation"
              aria-label="Close calendar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full touch-manipulation">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="flex gap-4 md:gap-8 text-xs md:text-sm text-gray-600 font-medium">
              <span className="text-center">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <span className="text-center hidden md:block">{new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full touch-manipulation">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Responsive Calendars */}
          <div className="flex flex-col md:flex-row">
            <AirbnbCalendar
              currentMonth={currentMonth}
              selectedRange={selectedRange}
              onDateSelect={handleDateSelect}
            />

            {/* Show second calendar only on md+ screens */}
            <div className="hidden md:block w-px bg-gray-200"></div>
            <div className="hidden md:block flex-1 px-2 py-4">
              <AirbnbCalendar
                currentMonth={new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)}
                selectedRange={selectedRange}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 gap-3 md:gap-4 border-t border-gray-200 text-xs md:text-sm text-gray-600">
            <div className="flex flex-wrap gap-3 md:gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-black rounded-full"></div>Selected</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 rounded-full"></div>Range</div>
              <div className="flex items-center gap-2"><span className="line-through text-gray-400">15</span>Unavailable</div>
            </div>
            {(checkIn || checkOut) && (
              <button
                onClick={() => {
                  setSelectedRange({ startDate: null, endDate: null });
                  dispatch(setCheckInSlice(null));
                  dispatch(setCheckOutSlice(null));
                }}
                className="underline hover:text-gray-900 touch-manipulation py-1 px-2 -mx-2 text-sm md:text-base font-medium"
              >
                Clear dates
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
