import React from "react";
import { ShoppingCart } from "lucide-react";
import FavoriteButton from "../common/FavouriteButton";
import { useNavigate } from "react-router-dom";

const WishlistCard = ({ item, isLiked }) => {
  const navigate=useNavigate()
  const rating = (item.Ratings / item.totalRatings).toFixed(1);
  const logo = item.image;
  const background = item.bannerImage[0];

  return (
    <div onClick={()=>{
      // food change into dynamic demo original type vech oru variable undaki dyamic aka
      navigate(`/food/${item.id}`)
    }} className="group relative w-[220px] overflow-hidden rounded-xl shadow-md">
      
      {/* Banner Image */}
      <div
        className="relative h-[180px] bg-center bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-opacity-100 transition group-hover:bg-black/20" />

        {/* Quick View Button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <button className="rounded-full bg-white px-3 py-1 text-sm text-black shadow">
            Quick View
          </button>
        </div>

        {/* Action Icons */}
        <div className="absolute right-2 top-2 flex flex-col items-end gap-2">
          <FavoriteButton product={item} isLiked={isLiked} />
          <button className="rounded-full absolute top-14 right-3 bg-white p-2 shadow">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex items-center gap-3 bg-white p-3">
        <img
          src={logo}
          alt={`${item.restaurantName} logo`}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h4 className="text-sm font-semibold">{item.restaurantName}</h4>
          <p className="text-xs text-gray-500">
            ⭐ {rating} ({item.totalRatings})
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
