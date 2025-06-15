import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Sample data for types of food
const foodTypes = [
    { name: "Burgers", image: "/MenuTypes/burger.png" },
    { name: "broast", image: "/MenuTypes/broast.jpg" },
    { name: "Juice", image: "/MenuTypes/juicebottle.jpg" },
    { name: "Tea", image: "/MenuTypes/piclumen-1749928730636.png" },
    { name: "Dosa", image: "/images/dosa.png" },
    { name: "Rolls", image: "/images/rolls.png" },
    { name: "Cakes", image: "/images/cakes.png" },
    { name: "Burgers", image: "/images/burger.png" },
    { name: "Pizzas", image: "/images/pizza.png" },
    { name: "Parotta", image: "/images/parotta.png" },
    { name: "Chinese", image: "/images/chinese.png" },
    { name: "Dosa", image: "/images/dosa.png" },
    { name: "Rolls", image: "/images/rolls.png" },
    { name: "Cakes", image: "/images/cakes.png" },
];

const TypeOfFoods = () => {
    return (
        <div className="px-4 py-1 w-full sticky top-8 z-40 bg-white ">
            <h2 className="text-xl font-bold mb-6 text-black">Pick your tasty treat</h2>

            {/* Custom Navigation Buttons */}

            <Swiper
                spaceBetween={1}
                slidesPerView={2.5}
                breakpoints={{
                    480: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 9 },
                    1280: { slidesPerView: 9 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-type",
                    prevEl: ".swiper-button-prev-type",
                }}
                freeMode
                mousewheel={{
                    forceToAxis: false,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel]}
            >
                {foodTypes.map((food, index) => (
                    <SwiperSlide key={index} className="flex flex-col items-center justify-center gap-2 ">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow">
                                <img src={food.image} alt={food.name} className="object-cover w-full h-full" />
                            </div>
                            <p className="text-center text-sm font-medium mb-2">{food.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TypeOfFoods;
