/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Clock, Ban, Info } from "lucide-react";
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
    <div className="mt-6 mr-4 p-4 rounded-xl border bg-white shadow-sm space-y-6">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800">Know Before You Book</h2>

      {/* Check-in / Check-out */}
      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex items-center gap-2">
<img src="/extras/clock.png" className="w-5 h-5"></img>
          <span><strong>Check-in:</strong> {checkInTime || "2:00 PM"}</span>
        </div>
        <div className="flex items-center gap-2">
        <img src="/extras/clock.png" className="w-5 h-5"></img>
          <span><strong>Check-out:</strong> {checkOutTime || "11:00 AM"}</span>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-sm text-gray-700 font-medium">
        <img src="/extras/cancelled.png" className="w-5 h-5"></img>
          Cancellation Policy
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <AnimatePresence initial={false}>
            {cancelItems.length > 0 ? (
              cancelItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
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
            className="text-sm text-blue-600 mt-1 hover:underline"
          >
            {showAllCancel ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Additional Policies */}
      <div>
        <div className="flex items-center gap-2 mb-1 text-sm text-gray-700 font-medium">
        <img src="/extras/warning-sign.png" className="w-5 h-5"></img>
          Additional Rules
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <AnimatePresence initial={false}>
            {additionalItems.length > 0 ? (
              additionalItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
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
            className="text-sm text-blue-600 mt-1 hover:underline"
          >
            {showAllAdditional ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BuildingStayPolicies;
