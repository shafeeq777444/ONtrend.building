'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

// ==== Calendar Component ====
export default function AirbnbCalendar({ currentMonth, selectedRange, onDateSelect }) {
  const { startDate, endDate } = selectedRange;
  const days = generateMonthDays(currentMonth.getFullYear(), currentMonth.getMonth());

  return (
    <div className="flex-1 px-2 py-2 md:py-4">
      <div className="grid grid-cols-7 mb-2 text-xs text-gray-500 text-center font-medium">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1">{d}</div>
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
            <div key={i} className="relative h-10 md:h-12 w-full flex items-center justify-center">
              {inRange && !(isStart || isEnd) && (
                <div className="absolute w-full h-8 md:h-10 bg-gray-100 rounded-md"></div>
              )}
              {(isStart || isEnd) && (
                <div className="absolute w-8 h-8 md:w-10 md:h-10 bg-gray-800 rounded-full z-0"></div>
              )}
              <button
                onClick={() => !isDisabled && onDateSelect(date)}
                disabled={isDisabled}
                className={`z-10 w-8 h-8 md:w-10 md:h-10 text-sm md:text-base rounded-full transition-all flex items-center justify-center touch-manipulation active:scale-95
                  ${isDisabled ? 'text-gray-300 line-through cursor-not-allowed' :
                  isStart || isEnd ? 'text-white font-semibold' :
                  isToday(date) ? 'border border-gray-800 text-gray-900 font-medium' :
                  'text-gray-700 hover:bg-gray-200 hover:text-black active:bg-gray-300'}`}
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

// Export helper functions for use in other components
export { bookedDates, isSameDate, isBooked, isToday, isInRange, isStartDate, isEndDate, generateMonthDays };