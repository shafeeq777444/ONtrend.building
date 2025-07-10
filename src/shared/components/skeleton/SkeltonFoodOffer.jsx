import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Autoplay, FreeMode } from "swiper/modules";
import { FiImage } from "react-icons/fi"; // Image placeholder icon

const SkeltonFoodOffer = () => {
    return (
        <div className="px-4 py-6 bg-white">
            <h2 className="text-xl font-bold mb-4">Offers</h2>
            <Swiper
                spaceBetween={12}
                slidesPerView={1.1}
                breakpoints={{
                    480: { slidesPerView: 1.6 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 3.5 },
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                centeredSlides={true}
                freeMode={true}
                loop={true}
                modules={[Autoplay, FreeMode]}
            >
                {[...Array(5)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <div className="animate-pulse flex items-center justify-center bg-gray-200 w-full h-[160px] rounded-md shadow">
                            <FiImage className="text-4xl text-gray-400" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SkeltonFoodOffer;
