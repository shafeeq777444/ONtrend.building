import { useState } from "react";
import { DrawerContent } from "../ui/drawer";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Tag, Star, ChefHat } from "lucide-react";

const UI_CONSTANTS = {
  COLORS: {
    BACKGROUND: '#1f1f1f',
    TEXT_PRIMARY: '#e0e0e0',
    TEXT_SECONDARY: '#cfcfcf',
    TEXT_MUTED: '#999999',
    BORDER: '#3a3a3a',
    PRIMARY: '#ff3131',
  },
};

const FoodVendorDrawer = ({ item, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState("Full");
  if (!item) return null;

  const variants = item.variants || {};
  const currentVariant = variants[selectedVariant];
  const hasVariants = Object.keys(variants).length > 0;

  const description = item.description || `Delicious ${item.category?.toLowerCase() || "dish"} from ${item.restaurantName || "our kitchen"}.`;
  const shortDesc = description.length > 100 ? description.slice(0, 100) + "..." : description;

  const handleAddToCart = () => {
    const productToAdd = {
      ...item,
      selectedVariant,
      price: parseFloat(currentVariant?.price || item.itemPrice),
      qty: parseInt(currentVariant?.qty || "1"),
    };
    onAddToCart?.(productToAdd);
  };

  return (
    <DrawerContent
      className="text-white"
      style={{
        backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
        color: UI_CONSTANTS.COLORS.TEXT_PRIMARY,
        borderTop: `1px solid ${UI_CONSTANTS.COLORS.BORDER}`,
      }}
    >
      <div className="relative h-[85vh] flex flex-col">
        <div className="overflow-y-auto px-6 pt-6 flex-grow">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Image */}
            <div className="md:w-1/2 w-full">
              <div className="relative md:sticky md:top-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-xl"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="md:w-1/2 w-full">
              <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
              {item.localName && <h3 className="text-lg italic text-gray-400">{item.localName}</h3>}
              {item.arabicRestaurantName && <p className="text-base text-gray-500">{item.arabicRestaurantName}</p>}

              {/* Description */}
              <p className="mt-4 text-sm text-gray-300">{shortDesc}</p>

              {/* Info items */}
              <div className="grid gap-4 my-6">
                <InfoItem icon={<Tag />} label="Category" value={item.tag} />
                {item.localTag && <InfoItem icon={<Tag />} label="Local Tag" value={item.localTag} />}
                <InfoItem icon={<Clock />} label="Prep Time" value={`${item.preparationTime} min`} />
                <InfoItem icon={<ChefHat />} label="Restaurant" value={item.restaurantName} />
                {item.availableTime && (
                  <InfoItem
                    icon={<MapPin />}
                    label="Available"
                    value={`${item.availableTime.from} - ${item.availableTime.to}`}
                  />
                )}
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <p className="text-xl font-semibold">
                  Price:{" "}
                  <span style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
                    OMR {currentVariant?.price || item.itemPrice}
                  </span>
                </p>
              </div>

              {/* Variants */}
              {hasVariants && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Select Variant</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(variants).map(([key, variant]) => (
                      <button
                        key={key}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                          selectedVariant === key
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-[#2a2a2a] text-gray-300 border-[#444] hover:bg-[#333]"
                        }`}
                        onClick={() => setSelectedVariant(key)}
                      >
                        <div>{key}</div>
                        {variant.price && (
                          <div className="text-xs text-gray-400">OMR {variant.price}</div>
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
        <div className="sticky bottom-0 bg-[#1f1f1f] px-6 py-4 border-t border-[#333]">
          <Button
            onClick={handleAddToCart}
            className="w-full py-4 text-lg font-bold rounded-xl shadow-md"
            style={{
              backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
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
  <div className="flex items-center gap-3 text-sm border-b border-[#333] pb-2">
    <div className="text-red-500">{icon}</div>
    <div>
      <div className="text-gray-400">{label}:</div>
      <div className="text-gray-300 font-medium">{value}</div>
    </div>
  </div>
);

export default FoodVendorDrawer;
