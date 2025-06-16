import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import { Navigation, FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import DiscountDealsCard from "../../components/foodHome/DiscountDealsCard";
import { useGetAllFoodVendors } from "../../hooks/queries/useVendors";
import { useSelector } from "react-redux";

// const foodVendors = [
//   {
//     name: "Spicy Bites",
//     rating: 4.7,
//     distance: "1.5 km",
//     deliveryTime: "25 mins",
//     discount: "Flat 30% off on all orders",
//     image: "/images/food1.jpg",
//   },
//   {
//     name: "Burger Nation",
//     rating: 4.3,
//     distance: "2.1 km",
//     deliveryTime: "20 mins",
//     discount: "Buy 1 Get 1 Free",
//     image: "/images/food2.jpg",
//   },
//   {
//     name: "Tandoori Treat",
//     rating: 4.6,
//     distance: "3.0 km",
//     deliveryTime: "30 mins",
//     discount: "20% off for new users",
//     image: "/images/food3.jpg",
//   },
//   {
//     name: "Biryani House",
//     rating: 4.8,
//     distance: "1.2 km",
//     deliveryTime: "15 mins",
//     discount: "Free dessert with biryani",
//     image: "/images/food4.jpg",
//   },
// ];

const FoodDiscountDeals = () => {
    const { location:{lat,lng} } = useSelector((state) => state.user);
    console.log(location);
    const { data:allfoodVendors } = useGetAllFoodVendors(lat,lng);
    const discountedFoodVendors=allfoodVendors?.filter(vendor=>vendor.discountValue>0)
    console.log(discountedFoodVendors,"all vendor")
    return (
        <div className="px-4 py-6 relative bg-white">
            <h2 className="text-xl font-bold mb-4">Discount Deals</h2>

            <button className="swiper-button-prev-food absolute top-0 right-14 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronLeft size={20} />
            </button>

            <button className="swiper-button-next-food absolute top-0 right-4 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronRight size={20} />
            </button>

            <Swiper
                spaceBetween={1}
                slidesPerView={1.3}
                breakpoints={{
                    480: { slidesPerView: 1.5 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 5.5 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-food",
                    prevEl: ".swiper-button-prev-food",
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                freeMode={true}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel, Autoplay]}
            >
                {discountedFoodVendors?.map((vendor, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="p-2">
                            <DiscountDealsCard vendor={vendor} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FoodDiscountDeals;
