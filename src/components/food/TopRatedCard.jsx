import { Star, Heart, ShoppingCart } from "lucide-react"; // ✅ Make sure ShoppingCart is imported

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

const TopRatedCards = ({ vendor }) => (
  <div className="rounded-md bg-white shadow-sm relative w-full max-w-lg mx-auto group overflow-hidden">
    {/* Vendor Banner Image */}
    {vendor.bannerImage?.length > 0 && (
      <img
        loading="lazy"
        src={vendor.bannerImage[1]}
        alt="Food Item"
        className="w-full h-70 object-cover rounded-md group-hover:scale-[1.02] duration-300 ease-in transition-all "
      />
    )}

    {/* Overlay Info Section */}
    <div className="absolute bottom-0 left-0 w-full px-4 py-3 flex justify-between items-start backdrop-blur-[2px] rounded-b-md bg-gradient-to-t from-black/80 via-black/20 to-transparent">
      {/* Left: Logo + Info */}
      <div className="flex gap-3 items-center ">
        <img
          loading="lazy"
          src={vendor.image}
          alt={vendor.restaurantName}
          className="w-12 h-12 rounded-full object-cover border border-white"
        />
        <div>
          <div className=" text-white px-2 py-0.5 rounded text-sm font-medium inline-block">
            {vendor.restaurantName}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <RatingStars rating={vendor.avgRating || 0} />
            <span className="text-xs text-white opacity-70">
              ({vendor.Ratings || 0})
            </span>
          </div>
          <p className="text-xs text-white/80 mt-1">
            {/* Optional: vendor.deliveryTime • vendor.distance */}
          </p>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex flex-col gap-2 items-center">
        <button
          className="p-1.5 rounded-full hover:bg-white/10 transition-all duration-200 ease-in-out transform hover:scale-105"
          title="Add to Wishlist"
        >
          <Heart size={18} className="text-white" />
        </button>
        <button
          className="p-1.5 rounded-full hover:bg-white/10 transition-all duration-200 ease-in-out transform hover:scale-105"
          title="Add to Cart"
        >
          <ShoppingCart size={18} className="text-white" />
        </button>
      </div>
    </div>
  </div>
);

export default TopRatedCards;
