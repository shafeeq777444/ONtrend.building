/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BuildingStayPolicies = ({
  checkInTime,
  checkOutTime,
  cancellationPolicy = [],
  additionalPolicy = [],
}) => {
  const [showAllCancel, setShowAllCancel] = useState(false);
  const [showAllAdditional, setShowAllAdditional] = useState(false);

  const cancelItems = showAllCancel ? cancellationPolicy : cancellationPolicy.slice(0, 3);
  const additionalItems = showAllAdditional ? additionalPolicy : additionalPolicy.slice(0, 3);

  return (
    <div className="mt-8 px-4 py-6 md:px-6 lg:p-8 rounded-2xl border bg-white shadow-md space-y-8 w-full">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900">Know Before You Book</h2>

      {/* Check-in / Check-out Times */}
      <div className="space-y-2 text-gray-800 text-sm">
        <div className="flex items-center gap-3">
          <img src="/extras/clock.png" alt="clock" className="w-5 h-5" />
          <span>
            <strong>Check-in:</strong> {checkInTime || "2:00 PM"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <img src="/extras/clock.png" alt="clock" className="w-5 h-5" />
          <span>
            <strong>Check-out:</strong> {checkOutTime || "11:00 AM"}
          </span>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-900 text-base font-semibold">
          <img src="/extras/cancelled.png" alt="cancel" className="w-5 h-5" />
          Cancellation Policy
        </div>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
          <AnimatePresence initial={false}>
            {cancelItems.length > 0 ? (
              cancelItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.li>
              ))
            ) : (
              <li>No cancellation policy provided.</li>
            )}
          </AnimatePresence>
        </ul>
        {cancellationPolicy.length > 3 && (
          <button
            onClick={() => setShowAllCancel(!showAllCancel)}
            className="text-blue-600 text-sm font-medium hover:underline transition-all"
          >
            {showAllCancel ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Additional Rules */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-900 text-base font-semibold">
          <img src="/extras/warning-sign.png" alt="warning" className="w-5 h-5" />
          Additional Rules
        </div>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-2">
          <AnimatePresence initial={false}>
            {additionalItems.length > 0 ? (
              additionalItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.li>
              ))
            ) : (
              <li>No additional policies specified.</li>
            )}
          </AnimatePresence>
        </ul>
        {additionalPolicy.length > 3 && (
          <button
            onClick={() => setShowAllAdditional(!showAllAdditional)}
            className="text-blue-600 text-sm font-medium hover:underline transition-all"
          >
            {showAllAdditional ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BuildingStayPolicies;
