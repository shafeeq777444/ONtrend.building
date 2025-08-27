/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { X, Minus, Plus, ShoppingCart, Timer } from "lucide-react";
import { motion, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { useAddToCart } from "@/modules/cart/services/queries/cart.query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase/config";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

// ─── Responsive Media Query Hook ───────────────────────────────
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

// ─── Animation Variants ───────────────────────────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0 },
};

const mobileDrawerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
};

const desktopDrawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
};

// ─── Subcomponent: Variants Section ───────────────────────────────
const VariantsSection = React.memo(({ item, selectedVariant, setSelectedVariant }) => {
  if (!item?.variants || Object.keys(item.variants).length === 0) return null;
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 text-lg">Choose Size</h3>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(item.variants).map(([variantName, variantData]) => (
          <button
            key={variantName}
            onClick={() => setSelectedVariant(variantName)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedVariant === variantName
                ? "border-emerald-500 bg-emerald-50 shadow"
                : "border-gray-200 hover:border-emerald-300"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">{variantName}</span>
              <span className="text-emerald-600 font-bold">OMR {variantData.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

// ─── Subcomponent: Add-ons Section ───────────────────────────────
const AddOnsSection = React.memo(({ item, addons, toggleAddon }) => {
  if (!item?.addOn || Object.keys(item.addOn).length === 0) return null;
  return (
    <div className="space-y-6">
      {Object.entries(item.addOn).map(([category, addonsArray]) => (
        <div key={category} className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-lg">{category}</h3>
          <div className="space-y-3">
            {addonsArray.map((addon, idx) => {
              const isSelected = addon.isRequired
                ? addons[category] === addon.name.trim()
                : addons[category]?.includes(addon.name.trim());
              return (
                <button
                  key={`${category}-${idx}`}
                  onClick={() => toggleAddon(addon.name.trim(), addon.isRequired, category)}
                  className={`w-full p-3 rounded-xl border-2 flex justify-between ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span className="font-medium">{addon.name}</span>
                  <span className="text-blue-600 font-bold">
                    {addon.price > 0 ? `+OMR ${addon.price}` : "Free"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});

// ─── Main Modal Component ───────────────────────────────
const FoodOrderDetailModal = ({ item, onClose, travelTime }) => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const { mutate: addToCart } = useAddToCart(userId);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [selectedVariant, setSelectedVariant] = useState(() =>
    item?.variants ? Object.keys(item.variants)[0] : null
  );

  // Initialize addons state with required defaults
  const [addons, setAddons] = useState(() => {
    const initial = {};
    Object.entries(item.addOn || {}).forEach(([category, arr]) => {
      const requiredOptions = arr.filter((opt) => opt.isRequired);
      if (requiredOptions.length > 0) {
        initial[category] = requiredOptions[0].name.trim(); // auto select first required
      } else {
        initial[category] = [];
      }
    });
    return initial;
  });

  const [quantity, setQuantity] = useState(1);
  const drawerRef = useRef();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Toggle Add-ons
  const toggleAddon = useCallback((addonName, isRequired, category) => {
    setAddons((prev) => {
      const updated = { ...prev };
      if (isRequired) {
        updated[category] = addonName; // only one allowed
      } else {
        const current = updated[category] || [];
        if (current.includes(addonName)) {
          updated[category] = current.filter((a) => a !== addonName);
        } else {
          updated[category] = [...current, addonName];
        }
      }
      return updated;
    });
  }, []);

  // Price calculation
  const pricePerQuantity = useMemo(() => {
    if (!item) return "0.000";
    const variantPrice = parseFloat(item.variants?.[selectedVariant]?.price || item.itemPrice || 0);

    const addonsTotal = Object.entries(item.addOn || {}).flatMap(([category, arr]) => {
      return arr.filter((addon) => {
        if (addon.isRequired) {
          return addons[category] === addon.name.trim();
        }
        return addons[category]?.includes(addon.name.trim());
      });
    }).reduce((sum, addon) => sum + parseFloat(addon.price || 0), 0);

    return (variantPrice + addonsTotal).toFixed(3);
  }, [item, selectedVariant, addons]);

  // Add to Cart
  const handleAddToCart = useCallback(() => {
    if (!auth.currentUser) {
      navigate("/auth");
      return;
    }
    addToCart({
      ...item,
      selectedVariant,
      selectedAddons: addons,
      pricePerQuantity,
      quantity,
    });
    onClose();
  }, [auth.currentUser, addToCart, addons, item, onClose, pricePerQuantity, quantity, selectedVariant, navigate]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <LazyMotion features={domAnimation}>
        <motion.div
          className={`fixed inset-0 z-50 bg-black/60 flex ${isMobile ? "items-end" : "items-center justify-end"}`}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={drawerRef}
            className={`bg-white shadow-lg flex flex-col ${
              isMobile ? "rounded-t-2xl max-h-[85vh] w-full" : "rounded-l-2xl h-full w-full max-w-md"
            }`}
            variants={isMobile ? mobileDrawerVariants : desktopDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 relative">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex gap-4 items-center">
                <LazyImg src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{item.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 mt-1">
                    <Timer className="w-4 h-4" />
                    {(() => {
                      const totalTime = (item.preparationTime || 10) + (travelTime || 10);
                      return totalTime > 25 ? "25-30 min" : `${totalTime} min`;
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              <p className="text-gray-600 text-sm">{item.description || "Delicious food item prepared fresh."}</p>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-sm text-emerald-600">Price</p>
                <p className="text-2xl font-bold text-emerald-700">OMR {pricePerQuantity}</p>
              </div>

              <VariantsSection item={item} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
              <AddOnsSection item={item} addons={addons} toggleAddon={toggleAddon} />
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 space-y-4">
              {/* Quantity */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-100"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded bg-gray-100"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart • OMR {(pricePerQuantity * quantity).toFixed(3)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </LazyMotion>
    </AnimatePresence>
  );
};

export default React.memo(FoodOrderDetailModal);
