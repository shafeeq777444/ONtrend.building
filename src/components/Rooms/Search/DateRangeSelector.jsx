import { useState } from "react";
import { DateRange } from "react-date-range";
import { motion, AnimatePresence } from "framer-motion";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const AirbnbCalendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const toggleCalendar = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative w-full max-w-md mx-auto mt-10">
      {/* Trigger Input */}
      <button
        onClick={toggleCalendar}
        className="w-full bg-white px-5 py-4 rounded-lg shadow-md text-left border border-gray-300 hover:shadow-lg transition"
      >
        <span className="text-sm font-medium text-gray-600">
          {selectionRange[0].startDate.toDateString()} →{" "}
          {selectionRange[0].endDate.toDateString()}
        </span>
      </button>

      {/* Calendar Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute z-50 mt-2 bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <DateRange
              ranges={selectionRange}
              onChange={(item) => setSelectionRange([item.selection])}
              moveRangeOnFirstSelection={false}
              months={2}
              direction="horizontal"
              showDateDisplay={false}
              rangeColors={["#000"]}
              minDate={new Date()} 
              
            />

            <div className="flex justify-end p-3 border-t">
              <button
                className="text-sm font-medium px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={toggleCalendar}
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AirbnbCalendar;
