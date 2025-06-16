import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

const FoodVendorHeader = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleShare = () => {
    // Your share logic here
    alert("Share clicked!");
  };

  return (
    <div className="relative">
      {/* Food Image */}
      <img //logo:image
        src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Food"
        className="w-full h-84 object-cover "
      />

      {/* Top Icons Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-2 rounded-full shadow"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>

        <div className="flex space-x-3">
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="bg-white p-2 rounded-full shadow"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-black"}`}
            />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="bg-white p-2 rounded-full shadow"
          >
            <Share2 className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorHeader;
