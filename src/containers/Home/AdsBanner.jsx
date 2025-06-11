/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGetAllOffers } from "../../hooks/queries/usePromotions";

const images = [

  "/ads/ad2.jpg",
  "/ads/ad3.jpg",
  // Add more image paths
];

const INTERVAL = 3000; // Change image every 3 seconds

const AdCardSlider = () => {
  const{data:offers}=useGetAllOffers()
  const offerIMages=offers?.map(offer=>offer.imageUrl) || []
  console.log(offerIMages)
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
          key={offerIMages[index]}
          src={offerIMages[index]}
          alt={`ad-${index}`}
          className="w-full h-full object-cover absolute top-0 left-0"
          initial={{ y: 100, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 1}}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AdCardSlider;
