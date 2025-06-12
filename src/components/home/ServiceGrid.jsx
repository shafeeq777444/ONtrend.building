import React from "react";
import FoodGridCard from "./serviceGrid/FoodGridCard";
import GroceryGridCard from "./serviceGrid/GroceryGridCard";
import GridCard from "./serviceGrid/GridCard";

const ServiceGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px]">
      {/* Food  */}
      <div className="lg:col-span-2 lg:row-span-3 bg-red-200 rounded-md flex items-center justify-center text-white overflow-hidden">
        <FoodGridCard />
      </div>

      {/* Grocery */}
      <div className="lg:row-span-3 bg-green-300 rounded-md flex items-center justify-center text-white overflow-hidden">
        <GroceryGridCard />
      </div>

      {/* Hotels & Apartments */}
      <div className="lg:row-span-2 bg-white text-white rounded-md flex items-center justify-center overflow-hidden">
        <GridCard
          title="Hotels & Apartments"
          description="Find cozy stays, luxury hotels, and budget apartments tailored to your comfort and location needs"
          image="/service/flats.png"
        />
      </div>

      {/* Health & Beauty */}
      <div className="bg-blue-300 rounded-md text-white flex items-center justify-center overflow-hidden">
        <GridCard
          title="Health & Beauty"
          description="Discover wellness essentials, skincare, and beauty products tailored for you"
          image="/service/medicin_home.png"
        />
      </div>

      {/* E-Shop */}
      <div className="bg-[#F2F0EF] rounded-md text-white flex items-center justify-center overflow-hidden">
        <GridCard
          title="E-Shop"
          description="Discover top deals on mobiles, laptops, audio gear, and the latest gadgets — all in one place."
          image="/service/electronic_home_bg 2.png"
        />
      </div>

      {/* Rent a Car */}
      <div className="bg-yellow-300 rounded-md text-white flex items-center justify-center overflow-hidden">
        <GridCard
          title="Rent a Car"
          description="Book your ride with ease — from hatchbacks to premium sedans and SUVs."
          image="/gird/car1.jpg"
        />
      </div>

      {/* Download */}
      <div className="bg-red-700 rounded-md text-white flex items-center justify-center overflow-hidden md:col-span-3 lg:col-span-2">
        <a href="https://ontrend.live/socials" className="text-lg font-semibold hover:underline ">
          Download
        </a>
      </div>
    </div>
  );
};

export default ServiceGrid;
