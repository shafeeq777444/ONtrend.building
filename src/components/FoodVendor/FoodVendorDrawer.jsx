import { useState } from "react";
import { DrawerContent } from "../ui/drawer";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Tag, Star, ChefHat } from "lucide-react";
import localforage from "localforage";


const FoodVendorDrawer = ({ item  }) => {

  const [selectedVariant, setSelectedVariant] = useState("");
  if (!item) return null;

  const variants = item.variants || {};
  const currentVariant = variants[selectedVariant];
  const hasVariants = Object.keys(variants).length > 0;

  const description =
    item.description ||
    `Delicious ${item.category?.toLowerCase() || "dish"} from ${
      item.restaurantName || "our kitchen"
    }.`;
  const shortDesc =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  const handleAddToCart = async () => {
  if (hasVariants && !selectedVariant) {
    alert("Please select a variant.");
    return;
  }

  try {
    const existingCart = (await localforage.getItem("cart")) || {};
    const userId = "user12"; // replace with dynamic ID if needed

    // ✅ Sanitize item to avoid DataCloneError
    const sanitizedItem = JSON.parse(JSON.stringify(item));

    const newItem = {
      ...sanitizedItem,
      selectedVariant,
      timestamp:
        item.timestamp?.toMillis?.() ||
        item.timestamp?.toString?.() ||
        Date.now(),
      cartAddedAt: Date.now(),
    };

    const userCart = existingCart[userId] || [];

    // Check if item with same id and variant already exists
    const existingIndex = userCart.findIndex(
      (cartItem) =>
        cartItem.id === newItem.id &&
        JSON.stringify(cartItem.selectedVariant) ===
          JSON.stringify(newItem.selectedVariant)
    );

    if (existingIndex > -1) {
      console.log("exist");
      // If exists, increase quantity
      userCart[existingIndex].quantity =
        (userCart[existingIndex].quantity || 1) + 1;
    } else {
      console.log("not exist");
      // If not, add with quantity = 1
      userCart.push({ ...newItem, quantity: 1 });
    }

    // Save back to cart
    existingCart[userId] = userCart;
    console.log(existingCart, "existing cart");

    const result = await localforage.setItem("cart", existingCart);
    console.log(result, "result");

    alert("Item added to cart!");
  } catch (error) {
    console.error("Failed to add to cart:", error);
  }
};


  const convertTo12Hour = (time24) => {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 to 12
  return `${hour}:${minute} ${ampm}`;
};

  return (
    <DrawerContent className="text-black bg-white border-t border-gray-200 ">
      <div className="relative h-[85vh] flex flex-col">
        <div className="overflow-y-auto px-6 pt-6 flex-grow">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="md:w-1/2 w-full">
              <div className="relative md:sticky md:top-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-xl"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/80 md:bg-black/50 px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1 text-yellow-600 md:text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="md:w-1/2 w-full">
              <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
              {item.localName && (
                <h3 className="text-lg italic text-gray-600 md:text-gray-300">
                  {item.localName}
                </h3>
              )}
              {item.arabicRestaurantName && (
                <p className="text-base text-gray-500 md:text-gray-400">
                  {item.arabicRestaurantName}
                </p>
              )}

              <p className="mt-4 text-sm text-gray-700 md:text-gray-300">
                {shortDesc}
              </p>

              <div className="grid gap-4 my-6">
                <InfoItem icon={<Tag />} label="Category" value={item.tag} />
                {item.localTag && (
                  <InfoItem icon={<Tag />} label="Local Tag" value={item.localTag} />
                )}
                <InfoItem
                  icon={<Clock />}
                  label="Prep Time"
                  value={`${item.preparationTime} min`}
                />
                <InfoItem
                  icon={<ChefHat />}
                  label="Restaurant"
                  value={item.restaurantName}
                />
               {item.availableTime && (
  <InfoItem
    icon={<MapPin />}
    label="Available"
    value={`${convertTo12Hour(item.availableTime.from)} - ${convertTo12Hour(item.availableTime.to)}`}
  />
)}
              </div>

              {/* Price */}
              <div className="mb-4">
                <p className="text-xl font-semibold">
                  Price:{" "}
                  <span className="text-red-600">
                    OMR {currentVariant?.price || item.itemPrice}
                  </span>
                </p>
              </div>

              {/* Variants */}
              {hasVariants && (
                <div className="mb-20">
                  <h3 className="text-lg font-semibold mb-2">Select Variant</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(variants).map(([key, variant]) => (
                      <button
                        key={key}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                          selectedVariant === key
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200  "
                        }`}
                        onClick={() => setSelectedVariant(key)}
                      >
                        <div>{key}</div>
                        {variant.price && (
                          <div className="text-xs text-gray-500 md:text-gray-400">
                            OMR {variant.price}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Sticky Button */}
        <div className="sticky bottom-0 px-6 py-4 border-t border-gray-200  bg-white ">
          <Button
            onClick={handleAddToCart}
            className="w-full py-4 text-lg font-bold rounded-xl shadow-md"
            style={{
              backgroundColor: "#ff3131",
              color: "#fff",
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </DrawerContent>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-sm border-b border-gray-200  pb-2">
    <div className="text-red-500">{icon}</div>
    <div>
      <div className="text-gray-500">{label}:</div>
      <div className="text-gray-700  font-medium">{value}</div>
    </div>
  </div>
);

export default FoodVendorDrawer;
