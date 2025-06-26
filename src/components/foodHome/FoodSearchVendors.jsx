import React, { useState } from "react";
import { Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import VendorModal from "@/components/foodHome/FoodSearchCard";
import "swiper/css";

const images = ["/gird/food1.jpg", "/gird/food2.jpg", "/gird/food3.jpg", "/gird/food4.jpg"];

const FoodSearchGridCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative w-full h-80 md:h-[450px] overflow-hidden group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Background Swiper */}
        <Swiper
          direction="vertical"
          slidesPerView={1}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full">
                <img
                  src={img}
                  alt={`food-${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white text-2xl sm:text-4xl md:text-5xl  leading-snug drop-shadow-md"
          >
            Find the best bites near you             
            <br />
            <span className="text-yellow-400 ">on <span className=" decoration-yellow-400">trend</span></span>
          </motion.h2>
        </div>

        {/* Bottom Center Search Button */}
        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-start px-4">
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg"
          >
            <Search className="w-4 h-4" />
            <span>Search Vendors</span>
          </motion.button>
        </div>
      </motion.div>

      <VendorModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default FoodSearchGridCard;
