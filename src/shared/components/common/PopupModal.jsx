import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginScreen from "@/modules/auth/pages/Login";



const PopupModal = ({  setShowUserReminderModal }) => {
  return (
    <AnimatePresence>

        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={()=>{setShowUserReminderModal(false)}} // Click outside to close
          />

          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div
              className="bg-white rounded-xl overflow-hidden shadow-lg w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()} // Prevent close on inner click
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                onClick={()=>{setShowUserReminderModal(false)}} 
              >
                &times;
              </button>

              {/* Your login screen inside the modal */}
              <LoginScreen />
            </div>
          </motion.div>
        </>

    </AnimatePresence>
  );
};

export default PopupModal;
