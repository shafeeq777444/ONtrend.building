/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { X, Minus, Plus, ShoppingCart, Heart, Clock, Star } from "lucide-react";
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

// ─── Animation Variants (outside component for perf) ───────────
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
const mobileDrawerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.25 } },
};
const desktopDrawerVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.25 } },
};

const FoodOrderDetailModal = ({ item, onClose }) => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const { mutate: addToCart } = useAddToCart(userId);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // ─── State ───────────────────────────────────────────────
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const keys = item?.variants ? Object.keys(item.variants) : [];
    return keys.length > 0 ? keys[0] : undefined;
  });
  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const drawerRef = useRef();

  // ─── Close on Outside Click ───────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // ─── Lock Scroll When Open ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!item) return null;

  // ─── Handlers ─────────────────────────────────────────────
  const toggleAddon = useCallback((addon) => {
    setAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  }, []);

  const pricePerQuantity = useMemo(() => {
    const variantPrice = parseFloat(item.variants?.[selectedVariant]?.price || item.itemPrice || 0);
    const addonsTotal = Object.values(item.addOn || {})
      .flat()
      .filter((addon) => addons.includes(addon.name.trim()))
      .reduce((sum, addon) => sum + parseFloat(addon.price || 0), 0);
    return (variantPrice + addonsTotal).toFixed(3);
  }, [item, selectedVariant, addons]);

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

  // ─── UI ───────────────────────────────────────────────────
  return (
    <AnimatePresence>
      <LazyMotion features={domAnimation}>
        <motion.div
          className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex ${isMobile ? "items-end" : "items-center justify-end"}`}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={drawerRef}
            className={`bg-white shadow-2xl overflow-hidden flex flex-col ${
              isMobile ? "rounded-t-3xl max-h-[85vh] w-full" : "rounded-l-3xl h-full w-full max-w-md"
            }`}
            variants={isMobile ? mobileDrawerVariants : desktopDrawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            onClick={(e) => e.stopPropagation()}
          >
            {/* ─── Drag Handle Mobile ─── */}
            {isMobile && (
              <motion.div
                className="flex justify-center py-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </motion.div>
            )}

            {/* ─── Header ─── */}
            <div className="px-6 border-b border-gray-100 relative py-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div className={`flex gap-4 ${isMobile ? "items-center" : "flex-col items-center text-center"}`}>
                <motion.div whileHover={{ scale: 1.05 }} className="rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 w-24 h-24">
                  <LazyImg src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </motion.div>
                <div className={`${isMobile ? "flex-1" : "w-full"}`}>
                  <h2 className="font-bold text-gray-900 text-lg truncate">{item.name}</h2>
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" /> 4.5
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" /> 25–30 min
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Content ─── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 space-y-6">
              {/* Description */}
              <p className="text-gray-600 text-sm">{item.description || "Delicious food item prepared fresh."}</p>

              {/* Price */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200 text-center">
                <p className="text-2xl font-bold text-emerald-700">OMR {pricePerQuantity}</p>
              </div>

              {/* Variants + Addons UI unchanged (reuse yours) */}
              {/* ... */}
            </div>

            {/* ─── Footer ─── */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center justify-between gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <motion.button whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                  >
                    <Minus className="w-3 h-3 text-gray-600" />
                  </motion.button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <motion.button whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3 text-gray-600" />
                  </motion.button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add OMR {(pricePerQuantity * quantity).toFixed(3)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </LazyMotion>
    </AnimatePresence>
  );
};

export default React.memo(FoodOrderDetailModal);
