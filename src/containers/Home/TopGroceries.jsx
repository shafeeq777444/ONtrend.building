import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useGetAllTopVendors } from "../../hooks/queries/useVendors";
import SkeletonTopGroceries from "../../components/skeleton/SkeletonTopGroceries";
import FavoriteButton from "../../components/common/FavouriteButton";

// Sample Data
// const groceries = [
//     {
//         id: 1,
//         name: "Fresh Mart",
//         image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
//     },
//     {
//         id: 2,
//         name: "Green Basket",
//         image: "/service/flats.png",
//     },
//     {
//         id: 3,
//         name: "Daily Needs",
//         image: "/images/grocery3.jpg",
//     },
//     {
//         id: 4,
//         name: "Healthy Hub",
//         image: "/images/grocery4.jpg",
//     },
//     {
//         id: 1,
//         name: "Fresh Mart",
//         image: "/images/grocery1.jpg",
//     },
//     {
//         id: 2,
//         name: "Green Basket",
//         image: "/images/grocery2.jpg",
//     },
//     {
//         id: 3,
//         name: "Daily Needs",
//         image: "/images/grocery3.jpg",
//     },
//     {
//         id: 4,
//         name: "Healthy Hub",
//         image: "/images/grocery4.jpg",
//     },
// ];

const TopGroceries = () => {
    const { data: vendors, isLoading, error } = useGetAllTopVendors();
    const topGroceries = vendors?.filter((vendor) => vendor.vendorType == "Grocery") || [];
    console.log(topGroceries, "--topGroceries");

    if (isLoading) {
        return <SkeletonTopGroceries />;
    }
    if (error) {
        return (
            <div className="px-4 py-6 text-center">
                <p className="text-red-600 font-semibold">Failed to load top groceries. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 relative ">
            <h2 className="text-xl font-bold mb-4 ">Top Groceries</h2>

            {/* Custom Prev Button */}
            <button className="swiper-button-prev-grocery custom-nav absolute top-0 right-14 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronLeft size={20} />
            </button>

            {/* Custom Next Button */}
            <button className="swiper-button-next-grocery custom-nav absolute top-0 right-4 z-10 bg-white p-2 rounded-full shadow mt-4 hover:bg-gray-100 transition">
                <FiChevronRight size={20} />
            </button>

            <Swiper
                spaceBetween={1}
                slidesPerView={1.6}
                breakpoints={{
                    480: { slidesPerView: 1.5 },
                    640: { slidesPerView: 2.5 },
                    768: { slidesPerView: 3.5 },
                    1024: { slidesPerView: 4.5 },
                    1280: { slidesPerView: 5.6 },
                    1536: { slidesPerView: 6.5 },
                }}
                navigation={{
                    nextEl: ".swiper-button-next-grocery",
                    prevEl: ".swiper-button-prev-grocery",
                }}
                freeMode={true}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 1,
                    releaseOnEdges: true,
                }}
                modules={[Navigation, FreeMode, Mousewheel]}
            >
                {topGroceries.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="p-2">
                            <div className="bg-white rounded-xl shadow hover:shadow-md transition p-3 flex flex-col items-center text-center hover:scale-[1.02]  duration-200 ease-in-out">
                                <div className="w-full h-32 relative rounded-lg overflow-hidden mb-3">
                                    <FavoriteButton/>
                                    <img
                                        src={item.bannerImage[0]}
                                        alt={item.restaurantName}
                                        className="w-full h-full object-cover"
                                    />
                                    {!item.isOnline && (
                                        <div className="absolute inset-0 bg-black/30 bg-opacity-50 flex items-center cursor-default justify-center">
                                            <span className="text-white text-sm font-semibold">Busy</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-sm font-semibold mb-2">{item.name}</h3>
                                <button
                                    disabled={!item.isOnline}
                                    className={`text-sm px-4 py-1 w-full rounded transition ${
                                        item.isOnline
                                            ? "bg-red-600 text-white hover:bg-green-700"
                                            : "bg-gray-300 text-gray-500  opacity-70"
                                    }`}
                                >
                                    {item.isOnline ? "Explore" : "Unavailable"}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopGroceries;
