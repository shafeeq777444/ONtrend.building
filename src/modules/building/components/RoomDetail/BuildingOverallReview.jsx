import React from "react";
import { FaLeaf } from "react-icons/fa"; // Optional: for minimal icon like leaf or badge

const BuildingOverallReview = () => {
  return (
    <div className="flex flex-col items-center space-y-2 mt-8">
      <div className="flex items-center space-x-2 text-4xl font-semibold">
        <FaLeaf className="text-gray-600" />
        <span>4.81</span>
        <FaLeaf className="text-gray-600 rotate-180" />
      </div>
      <div className="text-lg font-medium">Guest favourite</div>
      <div className="text-sm text-gray-600 text-center max-w-xs">
        Loved for great reviews, trusted hosting, and a smooth stay.
      </div>
    </div>
  );
};

export default BuildingOverallReview;
