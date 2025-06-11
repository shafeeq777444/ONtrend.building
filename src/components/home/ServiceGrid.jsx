import React from "react";
import FoodGridCard from "./serviceGrid/FoodGridCard";

const ServiceGrid = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[500px] w-[80vw] p-4">
      {/* Large Left - Food */}
      <div className="row-span-2 col-span-2 bg-red-200 rounded-xl flex items-center justify-center text-3xl font-bold text-white">
        <FoodGridCard/>
      </div>

      {/* Top Right - Groceries */}
      <div className="bg-green-300 row-span-2 relative overflow-hidden rounded-xl flex items-center justify-center text-xl font-semibold text-white">
        <img className="absolute w-full h-full"  src="/gird/grocesory.jpg"></img>
      </div>

      {/* Bottom Right Split */}

        {/* Health & Beauty */}
        <div className="bg-blue-300 col-span-2 rounded-2xl flex items-center justify-center text-md font-semibold text-white">
          Health & Beauty
        </div>

        {/* Download on Trend */}
        <div className="bg-yellow-300 rounded-2xl flex items-center justify-center text-md font-semibold text-white">
          Download on Trend
        </div>
      </div>
  );
};

export default ServiceGrid;
