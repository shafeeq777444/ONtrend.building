/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import VendorModal from "@/components/foodHome/FoodSearchCard";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import "swiper/css";

const images = ["/gird/food1.jpg", "/gird/food2.jpg", "/gird/food3.jpg", "/gird/food4.jpg"];

const FoodSearchVendors = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

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

        {/* Center Text and Button */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 space-y-4 ${
            isArabic ? "rtl" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <TypeAnimation
              sequence={
                isArabic
                  ? [
                      "ابحث عن أفضل الأطعمة من حولك",
                      2000,
                      "استمتع بأشهى الأماكن العصرية",
                      2000,
                      "اطلب الآن من أفضل البائعين",
                      2000,
                    ]
                  : [
                      "Find the best bites near you",
                      2000,
                      "Taste the trendiest food spots",
                      2000,
                      "Order now from top vendors",
                      2000,
                    ]
              }
              wrapper="h2"
              speed={50}
              className="text-white text-2xl sm:text-4xl md:text-5xl leading-snug drop-shadow-md"
              repeat={Infinity}
            />
          </motion.div>

          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center gap-2 w-[220px] sm:w-[260px] bg-white text-black px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg relative overflow-hidden ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="relative">
              {isArabic ? "بحث عن بائعين" : "Search Vendors"}
              <span className="absolute -right-2 top-0 h-full w-[2px] bg-black animate-blink" />
            </span>
          </motion.button>
        </div>
      </motion.div>

      <VendorModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default FoodSearchVendors;
