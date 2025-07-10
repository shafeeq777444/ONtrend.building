import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GuestSelector = () => {
  const [counts, setCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const handleChange = (type, direction) => {
    setCounts((prev) => {
      const newValue =
        direction === "increase" ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      return { ...prev, [type]: newValue };
    });
  };

  const guestOptions = [
    { label: "Adults", subLabel: "Ages 13 or above", key: "adults" },
    { label: "Children", subLabel: "Ages 2–12", key: "children" },
    { label: "Infants", subLabel: "Under 2", key: "infants" },
  ];

  const totalGuests = counts.adults + counts.children;
  const totalInfants = counts.infants;

  const summary = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}` +
    (totalInfants > 0 ? `, ${totalInfants} infant${totalInfants !== 1 ? 's' : ''}` : '');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-sm mx-auto bg-white rounded-lg p-4 shadow-lg"
      >
        {/* Summary Display */}
        <div className="mb-4 text-center text-gray-700 font-semibold text-sm">
          {summary}
        </div>

        {guestOptions.map((item, idx) => (
          <motion.div
            key={item.key}
            className={`flex items-center justify-between py-3 border-b ${
              idx === guestOptions.length - 1 ? "border-none" : ""
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-sm text-gray-500">{item.subLabel}</div>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleChange(item.key, "decrease")}
                className="w-8 h-8 rounded-full border text-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                disabled={counts[item.key] === 0}
              >
                −
              </motion.button>

              <span className="w-6 text-center">{counts[item.key]}</span>

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleChange(item.key, "increase")}
                className="w-8 h-8 rounded-full border text-xl flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                +
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default GuestSelector;
