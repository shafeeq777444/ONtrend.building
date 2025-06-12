import { Star, Heart, ShoppingCart } from "lucide-react";

const RatingStars = ({ rating }) => (
  <div className="flex items-center space-x-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#facc15" : "none"}
        stroke="#facc15"
      />
    ))}
  </div>
);

const TopRatedCards = ({ shop }) => (
  <div className="rounded-md bg-white shadow-sm  p-4 w-full max-w-lg mx-auto">
    {/* Shop Food Banner */}
    {shop.foodImages?.length > 0 && (
      <img
      loading="lazy"
        src={shop.foodImages[0]}
        alt="Food Item"
        className="w-full h-36 object-cover rounded-md mb-4"
      />
    )}

    <div className="flex justify-between items-start">
      {/* Left: Logo and Info */}
      <div className="flex gap-3">
        <img
        loading="lazy"
          src={shop.logo}
          alt={shop.shopName}
          className="w-12 h-12 rounded-full object-cover "
        />
        <div>
          <h2 className="text-base font-semibold">{shop.shopName}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RatingStars rating={shop.avgRating} />
            <span className="text-xs text-gray-500">({shop.ratingCount})</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {shop.deliveryTime} • {shop.distance}
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex flex-col gap-2 items-center">
        <button
          className="p-1.5 rounded-full hover:bg-gray-100 transition"
          title="Add to Wishlist"
        >
          <Heart size={18} className="text-gray-600" />
        </button>
        <button
          className="p-1.5 rounded-full hover:bg-gray-100 transition"
          title="Add to Cart"
        >
          <ShoppingCart size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  </div>
);

export default TopRatedCards;
