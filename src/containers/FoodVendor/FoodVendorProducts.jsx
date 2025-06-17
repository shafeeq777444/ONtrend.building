import React from "react";
import FoodCardInVendor from "@/components/FoodVendor/FoodCardInVendor";

const FoodVendorProducts = ({ foodItems,venderLogo }) => {
  return (
    <div className="py-4 px-2 max-w-[1000px] mx-auto">
      {/* Optional Title */}
      <div className="text-xl font-bold mb-4">&nbsp;</div>

      {/* Grid Layout */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {foodItems?.map((item) => (
          <FoodCardInVendor key={item.id} item={item} venderLogo={venderLogo} />
        ))}
      </div>
    </div>
  );
};

export default FoodVendorProducts;
