import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "swiper/css";
import LazyImage from "@/components/common/LazyImage";

const images = ["/gird/food1.jpg", "/gird/food2.jpg", "/gird/food3.jpg", "/gird/food4.jpg"];

const FoodGridCard = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    return (
        <div
            onClick={() => navigate("/food")}
            className="w-full h-full rounded-md p-6 relative text-white flex flex-col justify-between group overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
        >
            {/* Background Swiper Images with dark overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <Swiper
                    direction="vertical"
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="h-full w-full"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <LazyImage src={img} alt={`food-${i}`} />
                            <div className="absolute inset-0 bg-black/20" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Top badge and arrow */}
            <div className="flex justify-between items-start z-10 relative">
                <div className="bg-white/20 border border-white/40 cursor-default px-3 py-1 text-xs rounded-full group-hover:opacity-90 hover:opacity-100 duration-300 ease-in transition-all">
                    {isArabic ? "أفضل طعام للأبد" : "BEST FOOD FOREVER"}
                </div>
                <div
                    className={`bg-white text-black cursor-pointer rounded-full p-2 opacity-0 group-hover:opacity-90 duration-300 ease-in transition-all hover:bg-black hover:text-white 
        ${isArabic ? "hover:rotate-[-45deg]" : "hover:rotate-45"}
    `}
                >
                    <ArrowUpRight size={20} className={isArabic ? "scale-x-[-1]" : ""} />
                </div>
            </div>

            {/* Main Heading */}
            <div className="text-2xl md:text-4xl font-bold leading-tight z-10 relative mt-6 cursor-default">
                {isArabic ? "جائع؟" : "HUNGRY?"} <br />
                {isArabic ? "اضغط للاستكشاف" : "TAP TO EXPLORE"} <br />
                {isArabic ? "أماكن طعام لذيذة" : "DELICIOUS FOOD SPOTS"}
            </div>

            {/* CTA Button */}
            <div className="z-10 relative">
                <button
                    className="bg-black text-white text-sm px-5 py-2 cursor-pointer rounded-full font-semibold 
                    opacity-0 group-hover:opacity-100 
                    hover:bg-white hover:text-black 
                    hover:scale-105 
                    transition-all duration-300 ease-in-out"
                >
                    {isArabic ? "اطلب الآن" : "ORDER NOW"}
                </button>
            </div>
        </div>
    );
};

export default FoodGridCard;
