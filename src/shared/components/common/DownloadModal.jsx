/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const DownloadModal = ({  setDownloadModal }) => {
  return (
    <AnimatePresence>
      { (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 bg-opacity-70 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}

          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Modal Content Box */}
            <div className="relative bg-[#0e0e0e] text-white max-w-4xl w-full rounded-xl overflow-hidden flex flex-col-reverse md:flex-row shadow-xl">

              {/* Close Button */}
              <button
                onClick={() => setDownloadModal(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-400 text-2xl z-50"
                aria-label="Close Modal"
              >
                <FiX size={15}/>
              </button>

              {/* Left Side: Text Content */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <div className="text-[#ffd56f] text-3xl font-bold mb-2">Download</div>
                <h2 className="text-4xl font-extrabold mb-4">ONtrend Oman</h2>
                <p className="text-gray-300 mb-6">
                  The premium way to shop, order food, and unlock exclusive offers in Oman.
                </p>
                <a
                  href="https://ontrend.live/socials"
                  target="_blank"
                  className="bg-[#ffd56f] cursor-pointer text-black font-semibold px-6 py-3 rounded-lg w-fit 
                          transition duration-200 ease-in-out 
                          hover:bg-[#6a6550] hover:shadow-sm"
                >
                  ⬇ DOWNLOAD NOW
                </a>
                <p className="mt-4 text-sm text-gray-400">
                  Available on iOS & Android <br />
                  <span className="opacity-50">Version 1.7.5 • ONtrend Oman</span>
                </p>
              </div>

              {/* Right Side: Logo */}
              <div className="p-8 flex items-center justify-center bg-[#1a1a1a] md:border-l border-white/10">
                <img
                  className="w-32 h-32 object-contain"
                  src="/ONtrend-logo.png"
                  alt="ONtrend Logo"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;
