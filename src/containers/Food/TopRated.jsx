import React from "react";

import TopRatedCards from "../../components/food/TopRatedCard";

const mockData = [
  {
    shopName: "Alif Mart",
    avgRating: 3,
    ratingCount: 35,
    deliveryTime: "21 mins",
    distance: "3.14 km",
    logo: "/shop-logos/alif.png",
    foodImages: [
      "/food/alif_food1.jpg",
      "/food/alif_food2.jpg",
      "/food/alif_food3.jpg",
    ],
  },
  {
    shopName: "Safa Grocers",
    avgRating: 4,
    ratingCount: 122,
    deliveryTime: "18 mins",
    distance: "2.5 km",
    logo: "/shop-logos/safa.png",
    foodImages: [
      "/food/safa_food1.jpg",
      "/food/safa_food2.jpg",
      "/food/safa_food3.jpg",
    ],
  },
  {
    shopName: "Noor Supermarket",
    avgRating: 5,
    ratingCount: 88,
    deliveryTime: "15 mins",
    distance: "1.9 km",
    logo: "/shop-logos/noor.png",
    foodImages: [
      "/food/noor_food1.jpg",
      "/food/noor_food2.jpg",
      "/food/noor_food3.jpg",
    ],
  },
  {
    shopName: "Alif Mart",
    avgRating: 3,
    ratingCount: 35,
    deliveryTime: "21 mins",
    distance: "3.14 km",
    logo: "/shop-logos/alif.png",
    foodImages: [
      "/food/alif_food1.jpg",
      "/food/alif_food2.jpg",
      "/food/alif_food3.jpg",
    ],
  },
  {
    shopName: "Safa Grocers",
    avgRating: 4,
    ratingCount: 122,
    deliveryTime: "18 mins",
    distance: "2.5 km",
    logo: "/shop-logos/safa.png",
    foodImages: [
      "/food/safa_food1.jpg",
      "/food/safa_food2.jpg",
      "/food/safa_food3.jpg",
    ],
  },
  {
    shopName: "Noor Supermarket",
    avgRating: 5,
    ratingCount: 88,
    deliveryTime: "15 mins",
    distance: "1.9 km",
    logo: "/shop-logos/noor.png",
    foodImages: [
      "/food/noor_food1.jpg",
      "/food/noor_food2.jpg",
      "/food/noor_food3.jpg",
    ],
  },
];








export default function TopRated() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className=" mx-auto">
        {/* Heading */}
        <div className="mb-6 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Top Rated</h2>
          {/* <p className="text-sm text-gray-500">Explore popular stores near you</p> */}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.map((shop, index) => (
            <TopRatedCards key={index} shop={shop} />
          ))}
        </div>
      </div>
    </section>
  );
}
