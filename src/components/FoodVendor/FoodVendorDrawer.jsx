import { useState } from "react";
import { DrawerContent } from "../ui/drawer";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Tag, Star, ChefHat } from "lucide-react";

// UI Constants
const UI_CONSTANTS = {
  COLORS: {
    PRIMARY: '#ff3131',
    PRIMARY_HOVER: '#e02828',
    BACKGROUND: '#ffffff',
    CARD_BACKGROUND: '#f8fafc',
    TEXT_PRIMARY: '#1f2937',
    TEXT_SECONDARY: '#4b5563',
    TEXT_MUTED: '#6b7280',
    BORDER: '#e5e7eb',
    ACCENT: '#f59e0b',
    SHADOW: 'rgba(0, 0, 0, 0.1)'
  },
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem'
  },
  BORDER_RADIUS: {
    DEFAULT: '0.5rem',
    LG: '0.75rem',
    FULL: '9999px'
  },
  FONT_SIZES: {
    XS: 'text-xs',
    SM: 'text-sm',
    BASE: 'text-base',
    LG: 'text-lg',
    XL: 'text-xl',
    '2XL': 'text-2xl'
  },
  TRANSITIONS: {
    DEFAULT: 'transition-all duration-200 ease-in-out',
    FAST: 'transition-all duration-150 ease-in-out'
  }
};

const DEFAULT_VARIANT = "Full";
const DESCRIPTION_TRUNCATE_LENGTH = 100;

const FoodVendorDrawer = ({ item, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(DEFAULT_VARIANT);

  if (!item) return null;

  const description =
    item.description ||
    `A delicious ${item.category?.toLowerCase() || "dish"} prepared with care at ${item.restaurantName || "our restaurant"}.`;

  const shortDesc =
    description.length > DESCRIPTION_TRUNCATE_LENGTH
      ? description.slice(0, DESCRIPTION_TRUNCATE_LENGTH) + "..."
      : description;

  const variants = item.variants || {};
  const currentVariant = variants[selectedVariant];
  const hasVariants = Object.keys(variants).length > 0;

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
      className="bg-white text-gray-900 border-t border-gray-200 shadow-xl"
      style={{ backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND }}
    >
      <div className="p-6 max-h-[85vh] overflow-y-auto">
        {/* Image Section */}
        <div className="relative mb-6">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-52 object-cover rounded-xl shadow-2xl"
            style={{ borderRadius: UI_CONSTANTS.BORDER_RADIUS.LG }}
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-900">4.5</span>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="mb-6">
          <h2
            className={`${UI_CONSTANTS.FONT_SIZES['2XL']} font-bold mb-2`}
            style={{ color: UI_CONSTANTS.COLORS.TEXT_PRIMARY }}
          >
            {item.name}
          </h2>
          {item.localName && (
            <h3
              className={`${UI_CONSTANTS.FONT_SIZES.LG} italic mb-1`}
              style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}
            >
              {item.localName}
            </h3>
          )}
          {item.arabicRestaurantName && (
            <p
              className={UI_CONSTANTS.FONT_SIZES.BASE}
              style={{ color: UI_CONSTANTS.COLORS.TEXT_MUTED }}
            >
              {item.arabicRestaurantName}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <p
            className={`${UI_CONSTANTS.FONT_SIZES.SM} leading-relaxed`}
            style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}
          >
            {shortDesc}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <Tag className="w-5 h-5" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }} />
            <div>
              <span className="text-sm font-medium" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
                Category:
              </span>
              <span className="ml-2 text-sm" style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}>
                {item.tag}
              </span>
            </div>
          </div>

          {item.localTag && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <Tag className="w-5 h-5" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }} />
              <div>
                <span className="text-sm font-medium" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
                  Local Tag:
                </span>
                <span className="ml-2 text-sm" style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}>
                  {item.localTag}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <Clock className="w-5 h-5" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }} />
            <div>
              <span className="text-sm font-medium" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
                Prep Time:
              </span>
              <span className="ml-2 text-sm" style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}>
                {item.preparationTime} min
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <ChefHat className="w-5 h-5" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }} />
            <div>
              <span className="text-sm font-medium" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
                Restaurant:
              </span>
              <span className="ml-2 text-sm" style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}>
                {item.restaurantName}
              </span>
            </div>
          </div>

          {item.availableTime && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <MapPin className="w-5 h-5" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }} />
              <div>
                <span className="text-sm font-medium" style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
                  Available:
                </span>
                <span className="ml-2 text-sm" style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}>
                  {item.availableTime.from} - {item.availableTime.to}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-red-900/20 to-red-800/20 rounded-lg border border-red-800/30">
          <p className={`${UI_CONSTANTS.FONT_SIZES.XL} font-bold`}>
            <span style={{ color: UI_CONSTANTS.COLORS.TEXT_SECONDARY }}>Price: </span>
            <span style={{ color: UI_CONSTANTS.COLORS.PRIMARY }}>
              OMR {currentVariant?.price || item.itemPrice}
            </span>
          </p>
        </div>

        {/* Variant Selection */}
        {hasVariants && (
          <div className="mb-6">
            <h3 className={`${UI_CONSTANTS.FONT_SIZES.LG} font-semibold mb-3`}>
              Select Variant
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(variants).map(([key, variant]) => (
                <button
                  key={key}
                  className={`px-4 py-2 rounded-lg font-medium ${UI_CONSTANTS.TRANSITIONS.FAST} ${
                    selectedVariant === key
                      ? 'text-white shadow-lg transform scale-105'
                      : 'text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500'
                  }`}
                  style={{
                    backgroundColor: selectedVariant === key
                      ? UI_CONSTANTS.COLORS.PRIMARY
                      : UI_CONSTANTS.COLORS.CARD_BACKGROUND,
                    borderColor: selectedVariant === key
                      ? UI_CONSTANTS.COLORS.PRIMARY
                      : UI_CONSTANTS.COLORS.BORDER
                  }}
                  onClick={() => setSelectedVariant(key)}
                >
                  <div className="text-center">
                    <div className="font-medium">{key}</div>
                    {variant.price && (
                      <div className="text-xs opacity-75">
                        OMR {variant.price}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="sticky bottom-0 pt-4 bg-gradient-to-t from-gray-900 to-transparent">
          <Button
            onClick={handleAddToCart}
            className={`w-full py-4 font-bold text-lg rounded-xl shadow-lg ${UI_CONSTANTS.TRANSITIONS.DEFAULT} hover:shadow-xl hover:transform hover:scale-[1.02]`}
            style={{
              backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
              color: UI_CONSTANTS.COLORS.TEXT_PRIMARY
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </DrawerContent>
  );
};

export default FoodVendorDrawer;
