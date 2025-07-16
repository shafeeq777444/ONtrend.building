'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

// ==== Helpers ====
const bookedDates = [
  new Date(2025, 6, 10),
  new Date(2025, 6, 11),
  new Date(2025, 6, 14),
  new Date(2025, 6, 21),
  new Date(2025, 6, 25),
  new Date(2025, 6, 28),
  new Date(2025, 7, 3),
  new Date(2025, 7, 8),
  new Date(2025, 7, 15),
];

const isSameDate = (a, b) => a?.toDateString?.() === b?.toDateString?.();
const isBooked = (d) => bookedDates.some((b) => isSameDate(b, d));
const isToday = (d) => isSameDate(d, new Date());
const isInRange = (d, start, end) => start && end && d > start && d < end;
const isStartDate = (d, start) => isSameDate(d, start);
const isEndDate = (d, end) => isSameDate(d, end);

const generateMonthDays = (year, month) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = Array(first.getDay()).fill(null);
  for (let i = 1; i <= last.getDate(); i++) days.push(new Date(year, month, i));
  return days;
};

// ==== Calendar ====
function AirbnbCalendar({ currentMonth, selectedRange, onDateSelect }) {
  const { startDate, endDate } = selectedRange;
  const days = generateMonthDays(currentMonth.getFullYear(), currentMonth.getMonth());

  return (
    <div className="flex-1 px-2 py-4">
      <div className="grid grid-cols-7 mb-1 text-xs text-gray-500 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, i) => {
          if (!date) return <div key={i} className="h-10"></div>;

          const isDisabled = isBooked(date) || date < new Date().setHours(0, 0, 0, 0);
          const inRange = isInRange(date, startDate, endDate);
          const isStart = isStartDate(date, startDate);
          const isEnd = isEndDate(date, endDate);

          return (
            <div key={i} className="relative h-10 w-full flex items-center justify-center">
              {inRange && !(isStart || isEnd) && (
                <div className="absolute w-full h-8 bg-gray-100 rounded-md"></div>
              )}
              {(isStart || isEnd) && (
                <div className="absolute w-8 h-8 bg-gray-800 rounded-full z-0"></div>
              )}
              <button
                onClick={() => !isDisabled && onDateSelect(date)}
                disabled={isDisabled}
                className={`z-10 w-8 h-8 text-sm rounded-full transition-all flex items-center justify-center 
                  ${isDisabled ? 'text-gray-300 line-through ' :
                  isStart || isEnd ? 'text-white font-semibold' :
                  isToday(date) ? 'border border-gray-800 text-gray-900' :
                  'text-gray-700 hover:bg-gray-200 hover:text-black'}`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==== Main Component ====
export default function AvailableSlotCalender() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedRange, setSelectedRange] = useState({ startDate: null, endDate: null });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date) => {
    const { startDate, endDate } = selectedRange;
  
    if (!startDate || endDate) {
      setSelectedRange({ startDate: date, endDate: null });
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
        return; // Don't update the range
      }
  
      setSelectedRange({ startDate: rangeStart, endDate: rangeEnd });
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
      <div className="max-w-sm mx-auto mt-8">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full border border-gray-300 rounded-lg p-4 text-left hover:border-gray-400"
        >
          <div className="text-xs text-gray-600 mb-1">CHECK-IN · CHECK-OUT</div>
          <div className="text-sm text-gray-500">
            {selectedRange.startDate && selectedRange.endDate
              ? `${selectedRange.startDate.toLocaleDateString()} - ${selectedRange.endDate.toLocaleDateString()}`
              : 'Add dates'}
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-2">
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-auto md:overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">{formatRangeHeader()}</h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-8 text-sm text-gray-600 font-medium">
              <span>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              <span>{new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-4 h-4" />
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-black rounded-full"></div>Selected</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 rounded-full"></div>Range</div>
              <div className="flex items-center gap-2"><span className="line-through text-gray-400">15</span>Unavailable</div>
            </div>
            {(selectedRange.startDate || selectedRange.endDate) && (
              <button
                onClick={() => setSelectedRange({ startDate: null, endDate: null })}
                className="underline hover:text-gray-900"
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
