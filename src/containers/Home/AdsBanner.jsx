/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1611403570720-162d8829689a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9mZmVyfGVufDB8fDB8fHww",
  "/ads/ad2.jpg",
  "/ads/ad3.jpg",
  // Add more image paths
];

const INTERVAL = 3000; // Change image every 3 seconds

const AdCardSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[250px] overflow-hidden rounded-xl shadow">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`ad-${index}`}
          className="w-full h-full object-cover absolute top-0 left-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AdCardSlider;
