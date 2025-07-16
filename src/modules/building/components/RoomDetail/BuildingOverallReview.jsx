import React from "react";
import { FaLeaf } from "react-icons/fa"; // Optional: for minimal icon like leaf or badge
import RatingIcon from "../Common/RatingsIcon";

const BuildingOverallReview = () => {
  return (
    <div className="flex flex-col items-center space-y-2 mt-18">
     <RatingIcon/>
      <div className="text-lg font-medium">Guest favourite</div>
      <div className="text-sm text-gray-600 text-center max-w-xs">
        Loved for great reviews, trusted hosting, and a smooth stay.
      </div>
    </div>
  );
};

export default BuildingOverallReview;
