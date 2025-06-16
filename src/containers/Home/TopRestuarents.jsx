import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import SkeltonTopRestuarent from "../../components/skeleton/SkeltonTopRestuarent";
import RestuarentCard from "../../components/RestuarentCard";
import { useGetAllTopVendors } from "../../hooks/queries/useVendors";
import { useSelector } from "react-redux";


const TopRestaurants = () => {

  const [favorites, setFavorites] = React.useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };
 const {location:{lat,lng}}=useSelector(state=>state.user)
  const { data: vendors, isLoading } = useGetAllTopVendors(lat,lng);
  const topRestaurants =
    vendors?.filter((vendor) => vendor.vendorType === "Food/Restaurant") || [];
    if(isLoading){
      return(<SkeltonTopRestuarent/>)
    }

  return (
    <div className="px-4 py-6 relative w-full">  
        <h2 className="text-xl font-bold mb-6 text-black">Top Restaurants</h2>
        <>
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-restuarent absolute top-1 right-16 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <FiChevronLeft size={22} />
          </button>
          <button className="swiper-button-next-restuarent absolute top-1 right-4 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
            <FiChevronRight size={22} />
          </button>

          <Swiper
            spaceBetween={1}
            slidesPerView={1.2}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 4.5 },
              1280: { slidesPerView: 5.6 },
              1536: { slidesPerView: 6.5 },
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
            modules={[Navigation, FreeMode, Mousewheel]}
          >
            {topRestaurants.map((restaurant) => (
              <SwiperSlide key={restaurant.id} className="overflow-visible">
               <RestuarentCard favorites={favorites} restaurant={restaurant} toggleFavorite={toggleFavorite} topRestuarents={true}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
    </div>
  );
};

export default TopRestaurants;
