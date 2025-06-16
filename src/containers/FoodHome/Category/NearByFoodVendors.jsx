import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/grid";

import { Navigation, FreeMode, Mousewheel, Grid } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useGetAllFoodVendors } from "../../../hooks/queries/useVendors";
import SkeltonTopRestuarent from "../../../components/skeleton/SkeltonTopRestuarent";
import RestuarentCard from "../../../components/RestuarentCard";
import { useSelector } from "react-redux";

const NewVendors = () => {
    const [favorites, setFavorites] = React.useState([]);

    const toggleFavorite = (id) => {
        setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
    };
const {location:{lat,lng}}=useSelector(state=>state.user)
    const { data: allFoodvendors, isLoading } = useGetAllFoodVendors(lat,lng);

    // sortedVendors: latest first
    const newVendors = React.useMemo(() => {
    if (!allFoodvendors) return [];
    return allFoodvendors
        .slice() // clone to avoid mutation
        .sort((a, b) => {
            const timeA = a.distance 
            const timeB = b.distance 
            return timeA - timeB; // short distance
        })
        .slice(0, 20);
}, [allFoodvendors]);
console.log(newVendors,"--new vendors")
    if (isLoading) {
        return <SkeltonTopRestuarent />;
    }

    return (
        <div className="px-4 py-6 relative w-full">

            {/* Navigation Buttons */}
            <button className="swiper-button-prev-restuarent absolute top-1 right-16 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                <FiChevronLeft size={22} />
            </button>
            <button className="swiper-button-next-restuarent absolute top-1 right-4 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
                <FiChevronRight size={22} />
            </button>

            <Swiper
                spaceBetween={1}
                slidesPerView={4} // 4 cards per row
                grid={{
                    rows: 2, // 2 rows = 8 cards visible at once
                    fill: "row",
                }}
                breakpoints={{
                    320: { slidesPerView: 1.5 }, // For small screens
                    480: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 }, // 4 x 2 = 8 cards visible
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 4 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-restuarent",
                    prevEl: ".swiper-button-prev-restuarent",
                }}
                freeMode
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel, Grid]}
            >
                {newVendors.map((restaurant) => (
                    <SwiperSlide key={restaurant.id} className="overflow-visible">
                        <RestuarentCard favorites={favorites} restaurant={restaurant} toggleFavorite={toggleFavorite} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default NewVendors;
