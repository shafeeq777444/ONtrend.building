/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useMemo, useCallback, useLayoutEffect } from "react";
import { X, Minus, Plus, ShoppingCart, Timer, Check } from "lucide-react";
import { useAddToCart } from "@/modules/cart/services/queries/cart.query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase/config";
import LazyImg from "@/shared/components/performanceOptimised/LazyImg";

const VariantsSection = React.memo(function VariantsSection({ item, selectedVariant, setSelectedVariant }) {
    const variants = item?.variants ?? {};
    const entries = Object.entries(variants);
    if (!entries.length) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="grid grid-cols-1 gap-2">
                {entries.map(([variantName, variantData]) => {
                    const active = selectedVariant === variantName;
                    return (
                        <button
                            key={variantName}
                            onClick={() => setSelectedVariant(variantName)}
                            className={[
                                "flex items-center justify-between rounded-lg border px-3 py-2 text-left transition",
                                active ? "border-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50",
                            ].join(" ")}
                        >
                            <span className="text-sm font-medium text-gray-900">{variantName}</span>
                            <span className="text-sm font-semibold text-red-700">OMR {variantData?.price ?? 0}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

const AddOnsSection = React.memo(function AddOnsSection({ item, addons, toggleAddon }) {
    const addOn = item?.addOn ?? {};
    const categories = Object.entries(addOn);
    if (!categories.length) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Add-ons</h3>
            {categories.map(([category, arr]) => {
                const hasRequired = arr.some((a) => a.isRequired);
                return (
                    <div key={category} className="rounded-lg border border-gray-200 p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">{category}</span>
                            {hasRequired && (
                                <span className="text-[11px] rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
                                    Required
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            {arr.map((addon, idx) => {
                                const name = String(addon.name ?? "").trim();
                                const isReq = !!addon.isRequired;
                                const selected = isReq
                                    ? addons[category] === name
                                    : Array.isArray(addons[category]) && addons[category].includes(name);

                                return (
                                    <button
                                        key={`${category}-${idx}`}
                                        onClick={() => toggleAddon(name, isReq, category)}
                                        className={[
                                            "w-full rounded-md border px-3 py-2 text-left text-sm transition",
                                            selected ? "border-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50",
                                        ].join(" ")}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {selected ? (
                                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                                                        <Check className="h-3.5 w-3.5 text-white" />
                                                    </span>
                                                ) : (
                                                    <span className="inline-block h-5 w-5 rounded-full border border-gray-300" />
                                                )}
                                                <span className="font-medium text-gray-900">{name || "Option"}</span>
                                            </div>
                                            <span
                                                className={[
                                                    "font-semibold",
                                                    addon.price > 0 ? "text-red-700" : "text-green-700",
                                                ].join(" ")}
                                            >
                                                {addon.price > 0 ? `+OMR ${addon.price}` : "Free"}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

const FoodOrderDetailModal = ({ item, onClose, travelTime }) => {
    const navigate = useNavigate();
    const { userId } = useSelector((s) => s.user);
    const { mutate: addToCart } = useAddToCart(userId);

    const hasVariants = !!item?.variants && Object.keys(item.variants).length > 0;
    const hasAddOns = !!item?.addOn && Object.keys(item.addOn).length > 0;

    const [selectedVariant, setSelectedVariant] = useState(() => (hasVariants ? Object.keys(item.variants)[0] : null));

    const [addons, setAddons] = useState(() => {
        const initial = {};
        Object.entries(item?.addOn ?? {}).forEach(([category, arr]) => {
            const required = arr.filter((x) => x.isRequired);
            initial[category] = required.length ? String(required[0].name ?? "").trim() : [];
        });
        return initial;
    });

    const [quantity, setQuantity] = useState(1);
    const cardRef = useRef(null);

    // Close on overlay click / Esc
    useEffect(() => {
        const onMouseDown = (e) => {
            // Only close when clicking outside the card
            if (cardRef.current && !cardRef.current.contains(e.target)) onClose();
        };
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    // Lock scroll
    useLayoutEffect(() => {
        const sw = window.innerWidth - document.documentElement.clientWidth;
        const prevOverflow = document.body.style.overflow;
        const prevPaddingRight = document.body.style.paddingRight;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${sw}px`;
        return () => {
            document.body.style.overflow = prevOverflow;
            document.body.style.paddingRight = prevPaddingRight;
        };
    }, []);

    const toggleAddon = useCallback((addonName, isRequired, category) => {
        setAddons((prev) => {
            const next = { ...prev };
            if (isRequired) {
                next[category] = addonName;
            } else {
                const list = Array.isArray(next[category]) ? [...next[category]] : [];
                next[category] = list.includes(addonName) ? list.filter((n) => n !== addonName) : [...list, addonName];
            }
            return next;
        });
    }, []);

    const pricePerQuantity = useMemo(() => {
        if (!item) return "0.000";
        const base = parseFloat(item?.variants?.[selectedVariant]?.price ?? item?.itemPrice ?? 0) || 0;
        const addOnTotal = Object.entries(item?.addOn ?? {})
            .flatMap(([category, arr]) =>
                arr.filter((a) =>
                    a.isRequired
                        ? addons[category] === String(a.name ?? "").trim()
                        : Array.isArray(addons[category]) && addons[category].includes(String(a.name ?? "").trim())
                )
            )
            .reduce((sum, a) => sum + (parseFloat(a.price ?? 0) || 0), 0);
        return (base + addOnTotal).toFixed(3);
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
    }, [addToCart, addons, item, onClose, pricePerQuantity, quantity, selectedVariant, navigate]);

    if (!item) return null;

    const eta = (() => {
        const total = (item?.preparationTime ?? 10) + (travelTime ?? 10);
        return total > 25 ? "25–30 min" : `${total} min`;
    })();

    // dynamic desktop grid with fixed column widths
    const gridCols =
        hasVariants && hasAddOns ? "lg:grid-cols-3" : hasVariants || hasAddOns ? "lg:grid-cols-2" : "lg:grid-cols-1";
    
    // Modal width based on content
    const modalWidth = hasVariants && hasAddOns ? "lg:max-w-5xl" : hasVariants || hasAddOns ? "lg:max-w-3xl" : "lg:max-w-2xl";

    const isLandscapeCard = !hasVariants && !hasAddOns;

    return (
        <div className="fixed inset-0 z-50 bg-black/50">
            {/* Container differs by breakpoint:
          - mobile: bottom sheet (stick to bottom)
          - desktop: centered large modal */}
            <div className="flex h-full w-full items-end lg:items-center justify-center p-0 lg:p-4">
                <div
                    ref={cardRef}
                    role="dialog"
                    aria-modal="true"
                    className={[
                        "bg-white shadow-sm ring-1 ring-gray-100",
                        // mobile bottom sheet (with animation)
                        "fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl p-0",
                        "motion-safe:animate-slide-up",
                        // desktop modal (no animation)
                        `lg:static lg:inset-auto ${modalWidth} lg:w-full lg:rounded-2xl lg:p-0 lg:animate-none lg:motion-safe:animate-none`,
                    ].join(" ")}
                >
                    {/* Drag handle (mobile only) */}
                    <div className="block lg:hidden pt-2">
                        <div className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-gray-300" />
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-base font-semibold text-gray-900">{item.name}</h2>
                        </div>

                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Body: scrollable content (mobile & desktop) */}
                    <div className={`p-4 overflow-y-auto ${isLandscapeCard ? '' : `grid grid-cols-1 gap-6 ${gridCols}`}`} style={!isLandscapeCard ? {gridTemplateColumns: hasVariants && hasAddOns ? 'minmax(300px, 1fr) minmax(250px, 1fr) minmax(300px, 1fr)' : hasVariants || hasAddOns ? 'minmax(300px, 1fr) minmax(250px, 1fr)' : 'minmax(300px, 300px)'} : {}}>
                        {isLandscapeCard ? (
                             <div className="flex gap-6">
                                {/* Left Side - Image */}
                                <div className="flex-shrink-0">
                                    <LazyImg 
                                        src={item.imageUrl} 
                                        alt={item.name} 
                                        className="h-32 w-48 rounded-xl object-cover shadow-lg" 
                                    />
                                </div>

                                {/* Right Side - Content */}
                                <div className="flex-1 space-y-4">
                                    {/* Description */}
                                    <p className="text-sm text-gray-600">
                                        {item.description || "Freshly prepared and served hot."}
                                    </p>

                                    {/* Time and Price */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Timer className="h-4 w-4" />
                                            <span>Ready in {eta}</span>
                                        </div>
                                        <div className="text-lg font-bold text-red-600">
                                            OMR {pricePerQuantity}
                                        </div>
                                    </div>

                                    {/* Quantity and Add to Cart */}
                                    <div className="flex items-center justify-between gap-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                                disabled={quantity <= 1}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="min-w-[2ch] text-center font-semibold">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity((q) => q + 1)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800"
                                        >
                                            <span className="inline-flex items-center justify-center gap-2">
                                                <ShoppingCart className="h-4 w-4" />
                                                Add • OMR {(Number(pricePerQuantity) * quantity).toFixed(3)}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                             <div className="space-y-4">
                                {/* Large Image */}
                                <div className="flex justify-center">
                                    <LazyImg 
                                        src={item.imageUrl} 
                                        alt={item.name} 
                                        className="h-48 w-48 lg:h-56 lg:w-56 rounded-xl object-cover shadow-lg" 
                                    />
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 text-center">
                                    {item.description || "Freshly prepared and served hot."}
                                </p>

                                {/* Time */}
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg py-2">
                                    <Timer className="h-4 w-4" />
                                    <span>Ready in {eta}</span>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                                    <span className="text-sm text-gray-700">Quantity</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                            disabled={quantity <= 1}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="min-w-[2ch] text-center font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity((q) => q + 1)}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 active:bg-red-800"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Cart • OMR {(Number(pricePerQuantity) * quantity).toFixed(3)}
                                    </span>
                                </button>
                            </div>
                        )}

                        {/* Second Column: Variants (only when variants exist) */}
                        {!isLandscapeCard && hasVariants && (
                            <div className="space-y-4">
                                <VariantsSection
                                    item={item}
                                    selectedVariant={selectedVariant}
                                    setSelectedVariant={setSelectedVariant}
                                />
                            </div>
                        )}

                        {/* Third Column: Add-ons (only when add-ons exist) */}
                        {!isLandscapeCard && hasAddOns && (
                            <div className="space-y-4 lg:max-h-[60vh] lg:overflow-y-auto">
                                <AddOnsSection item={item} addons={addons} toggleAddon={toggleAddon} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(FoodOrderDetailModal);

/* ── Add once (globals.css or a CSS file that’s loaded) ─────────
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0.96; }
  to   { transform: translateY(0%);   opacity: 1; }
}
.animate-slide-up { animation: slide-up 260ms ease-out; }
*/
