import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { GiChickenLeg, GiBroccoli } from "react-icons/gi";

const foodItems = [
  {
    id: 1,
    name: "Spicy Garlic Shrimp",
    image: "/MenuTypes/broast.jpg",
    price: 299,
    rating: 4.5,
    type: "non-veg",
    bestSeller: true,
  },
  {
    id: 2,
    name: "Veggie Delight Salad",
    image: "/MenuTypes/burger.png",
    price: 199,
    rating: 4.2,
    type: "veg",
    bestSeller: false,
  },
  {
    id: 3,
    name: "Chicken Tikka Wrap",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    price: 249,
    rating: 4.8,
    type: "non-veg",
    bestSeller: true,
  },
  {
    id: 4,
    name: "Spicy Garlic Shrimp",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    price: 299,
    rating: 4.5,
    type: "non-veg",
    bestSeller: true,
  },
  {
    id: 5,
    name: "Veggie Delight Salad",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    price: 199,
    rating: 4.2,
    type: "veg",
    bestSeller: false,
  },
  {
    id: 6,
    name: "Chicken Tikka Wrap",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
    price: 249,
    rating: 4.8,
    type: "non-veg",
    bestSeller: true,
  },
];

const FoodVendorPopular = () => {
  return (
    <div className="p-4 max-w-[1000px] mx-auto ">
      <h2 className="text-2xl font-bold mb-4">Trending Recipes</h2>
      <Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  spaceBetween={15}
  loop={true}
  breakpoints={{
    320: { slidesPerView: 1.2 },  // small mobile
    480: { slidesPerView: 1.5 },  // large mobile
    640: { slidesPerView: 2 },    // tablet
    1024: { slidesPerView: 3 },   // desktop
    1280: { slidesPerView: 4 },   // large desktop
  }}
>

        {foodItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative   rounded-xl overflow-hidden shadow-lg bg-white">
              {/* Food Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />

              {/* Tags */}
              <div className="absolute top-2 left-2 flex items-center gap-2">
                {item.type === "veg" ? (
                  <GiBroccoli className="text-green-600 bg-white rounded-full p-1 w-6 h-6" />
                ) : (
                  <GiChickenLeg className="text-red-600 bg-white rounded-full p-1 w-6 h-6" />
                )}
                {item.bestSeller && (
                  <span className="bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-lg font-semibold truncate">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-800 font-bold">₹{item.price}</span>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-sm text-gray-700">{item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Add Button */}
              <button className="absolute bottom-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600 transition">
                Add
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FoodVendorPopular;


