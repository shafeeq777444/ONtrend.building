/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { X, Minus, Plus, ShoppingCart, Heart, Clock, Star, ChefHat, Timer } from "lucide-react";
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
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const mobileDrawerVariants = {
  hidden: { y: "100%", opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      damping: 30, 
      stiffness: 400,
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 }
    } 
  },
  exit: { 
    y: "100%", 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeInOut" } 
  },
};
const desktopDrawerVariants = {
  hidden: { x: "100%", opacity: 0, scale: 0.95 },
  visible: { 
    x: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      damping: 30, 
      stiffness: 400,
      opacity: { duration: 0.2 },
      scale: { duration: 0.3 }
    } 
  },
  exit: { 
    x: "100%", 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeInOut" } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FoodOrderDetailModal = ({ item, onClose ,travelTime}) => {
  console.log(item,"selected item")
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const { mutate: addToCart } = useAddToCart(userId);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // ─── State ───────────────────────────────────────────────
  const [selectedVariant, setSelectedVariant] = useState(() => {
    const keys = item?.variants ? Object.keys(item.variants) : [];
    return keys.length > 0 ? keys[0] : null;
  });

  // Ensure at least one variant is selected if variants exist
  useEffect(() => {
    if (item?.variants && Object.keys(item.variants).length > 0 && !selectedVariant) {
      setSelectedVariant(Object.keys(item.variants)[0]);
    }
  }, [item?.variants, selectedVariant]);

  const [addons, setAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Ensure required add-ons have one selected by default
  useEffect(() => {
    if (item?.addOn) {
      Object.entries(item.addOn).forEach(([category, addonsArray]) => {
        if (Array.isArray(addonsArray)) {
          const requiredAddons = addonsArray.filter(addon => addon.isRequired);
          if (requiredAddons.length > 0) {
            const categoryRequiredSelected = requiredAddons.some(addon => addons.includes(addon.name.trim()));
            if (!categoryRequiredSelected) {
              setAddons(prev => [...prev, requiredAddons[0].name.trim()]);
            }
          }
        }
      });
    }
  }, [item?.addOn, addons]);

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

  // ─── Handlers ─────────────────────────────────────────────
  const toggleAddon = useCallback((addon, isRequired, category) => {
    setAddons((prev) => {
      if (isRequired) {
        // For required add-ons, remove other required add-ons from the same category and add the selected one
        const filteredAddons = prev.filter(existingAddon => {
          // Check if this existing addon is a required addon from the same category
          const categoryAddons = item?.addOn?.[category] || [];
          const isRequiredFromSameCategory = categoryAddons.some(catAddon => 
            catAddon.isRequired && catAddon.name.trim() === existingAddon
          );
          return !isRequiredFromSameCategory;
        });
        return [...filteredAddons, addon];
      } else {
        // For optional add-ons, toggle normally
        return prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon];
      }
    });
  }, [item?.addOn]);

  const pricePerQuantity = useMemo(() => {
    if (!item) return "0.000";
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

  if (!item) return null;

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
                className="flex justify-center py-4 bg-gray-50/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors cursor-grab active:cursor-grabbing"></div>
              </motion.div>
            )}

            {/* ─── Header ─── */}
            <motion.div 
              className="px-6 border-b border-gray-100 relative py-6 bg-gradient-to-b from-white to-gray-50/30"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95 z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <div className={`flex gap-6 ${isMobile ? "items-start" : "flex-col items-center text-center"}`}>
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: 1 }} 
                  className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 w-28 h-28 shadow-lg ring-1 ring-gray-200/50"
                >
                  <LazyImg src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </motion.div>
                
                <div className={`${isMobile ? "flex-1 pt-1" : "w-full mt-4"}`}>
                  <motion.h2 
                    className="font-bold text-gray-900 text-xl leading-tight mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.name}
                  </motion.h2>
                  
                  <motion.div 
                    className={`flex ${isMobile ? "items-start flex-col gap-2" : "items-center justify-center"} gap-4`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
                      <Timer className="w-4 h-4 text-emerald-600" /> 
                      <span className="text-sm font-medium text-emerald-700">
                        {(() => {
                          const totalTime = (item.preparationTime || 10) + (travelTime || 10);
                          return totalTime > 25 ? '25-30 min' : `${totalTime} min`;
                        })()} 
                      </span>
                    </div>
                    

                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ─── Content ─── */}
            <motion.div 
              className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Description */}
              <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description || "Delicious food item prepared fresh with premium ingredients."}
                </p>
              </motion.div>

              {/* Price */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-1">
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Total Price</p>
                  <p className="text-3xl font-bold text-emerald-700 tracking-tight">OMR {pricePerQuantity}</p>
                  <p className="text-xs text-emerald-600">Per item • Inclusive of all taxes</p>
                </div>
              </motion.div>

              {/* Variants */}
              {item?.variants && Object.keys(item.variants).length > 0 && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900 text-lg">Choose Size</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(item.variants).map(([variantName, variantData], index) => (
                      <motion.button
                        key={variantName}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedVariant(variantName)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
                          selectedVariant === variantName
                            ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-200'
                            : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-25 hover:shadow-sm'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                              selectedVariant === variantName
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-gray-300 group-hover:border-emerald-400'
                            }`}>
                              {selectedVariant === variantName && (
                                <motion.div 
                                  className="w-2 h-2 bg-white rounded-full m-0.5"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                />
                              )}
                            </div>
                            <span className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">{variantName}</span>
                          </div>
                          <span className="text-emerald-600 font-bold text-lg">OMR {variantData.price}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                 </motion.div>
               )}

              {/* Add Ons */}
              {item?.addOn && Object.keys(item.addOn).length > 0 && (
                <motion.div variants={itemVariants} className="space-y-6">
                  {Object.entries(item.addOn).map(([category, addonsArray]) => {
                    const hasRequiredAddons = Array.isArray(addonsArray) && addonsArray.some(addon => addon.isRequired);
                    const hasOptionalAddons = Array.isArray(addonsArray) && addonsArray.some(addon => !addon.isRequired);
                    
                    return (
                      <div key={category} className="space-y-4">
                        {/* Required Add-ons Section */}
                        {hasRequiredAddons && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                              <h3 className="font-semibold text-gray-900 text-lg">{category}</h3>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">Required</span>
                            </div>
                            <div className="space-y-3">
                              {addonsArray.filter(addon => addon.isRequired).map((addon, index) => (
                                <motion.button
                                  key={`${category}-required-${index}`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleAddon(addon.name.trim(), true, category)}
                                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
                                    addons.includes(addon.name.trim())
                                      ? 'border-red-500 bg-red-50 shadow-md ring-2 ring-red-200'
                                      : 'border-gray-200 hover:border-red-300 hover:bg-red-25 hover:shadow-sm'
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                                        addons.includes(addon.name.trim())
                                          ? 'border-red-500 bg-red-500'
                                          : 'border-gray-300 group-hover:border-red-400'
                                      }`}>
                                        {addons.includes(addon.name.trim()) && (
                                          <motion.div 
                                            className="w-2 h-2 bg-white rounded-full m-0.5"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                          />
                                        )}
                                      </div>
                                      <span className="font-medium text-gray-900 group-hover:text-red-700 transition-colors">{addon.name}</span>
                                    </div>
                                    <span className="text-red-600 font-bold text-lg">{addon.price > 0 ? `+OMR ${addon.price}` : 'Free'}</span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Optional Add-ons Section */}
                        {hasOptionalAddons && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                              <h3 className="font-semibold text-gray-900 text-lg">{hasRequiredAddons ? `${category} - Extras` : category}</h3>
                              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">Optional</span>
                            </div>
                            <div className="space-y-3">
                              {addonsArray.filter(addon => !addon.isRequired).map((addon, index) => (
                                <motion.button
                                  key={`${category}-optional-${index}`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleAddon(addon.name.trim(), false, category)}
                                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left group ${
                                    addons.includes(addon.name.trim())
                                      ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200'
                                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:shadow-sm'
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-4 h-4 rounded border-2 transition-all ${
                                        addons.includes(addon.name.trim())
                                          ? 'border-blue-500 bg-blue-500'
                                          : 'border-gray-300 group-hover:border-blue-400'
                                      }`}>
                                        {addons.includes(addon.name.trim()) && (
                                          <motion.div 
                                            className="w-2 h-2 bg-white rounded-sm m-0.5"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                          />
                                        )}
                                      </div>
                                      <span className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{addon.name}</span>
                                    </div>
                                    <span className="text-blue-600 font-bold text-lg">{addon.price > 0 ? `+OMR ${addon.price}` : 'Free'}</span>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
               )}
             </motion.div>
 
             {/* ─── Footer ─── */}
            <motion.div 
              className="bg-gradient-to-t from-white via-white to-gray-50/30 border-t border-gray-200 p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Quantity Section */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Quantity</p>
                  <p className="text-xs text-gray-500">Select how many items</p>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </motion.button>
                  <span className="text-xl font-bold text-gray-900 min-w-[2rem] text-center">{quantity}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <ShoppingCart className="w-5 h-5 relative z-10" />
                <span className="relative z-10">
                  Add to Cart • OMR {(pricePerQuantity * quantity).toFixed(3)}
                </span>
                <motion.div
                  className="absolute right-4 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.button>
              
              {/* Additional Info */}
           
             </motion.div>
           </motion.div>
         </motion.div>
       </LazyMotion>
     </AnimatePresence>
   );
 };
 
 export default React.memo(FoodOrderDetailModal);