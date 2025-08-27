import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

import {
  useCartItems,
  useChangeCartQuantity,
  useRemoveFromCart,
} from "@/modules/cart/services/queries/cart.query";
import DownloadModal from "@/shared/components/common/DownloadModal";

const CartPage = () => {
  const { userId } = useSelector((state) => state.user);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [downloadModal, setDownloadModal] = useState(false);

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const { data: cartItems = [] } = useCartItems(userId);
  const { mutateAsync: changeQuantity } = useChangeCartQuantity(userId);
  const { mutateAsync: removeFromCart } = useRemoveFromCart(userId);

  // Smooth scroll to top when cart opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ Use useMemo for performance
  const subtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0),
    [cartItems]
  );

  const deliveryFee = useMemo(() => 0, []); // can be dynamic later
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  // --- Small Sub Components ---
  const CartItem = ({ item }) => {
    // Helper function to render addons
    const renderAddons = (selectedAddons) => {
      if (!selectedAddons || typeof selectedAddons !== "object") return null;

      return Object.entries(selectedAddons).map(([key, value]) => (
        <div key={key} className="text-xs text-gray-600 mt-1">
          <span className="font-medium">{key}:</span>
          <span className="ml-1">
            {Array.isArray(value) ? value.join(", ") : value}
          </span>
        </div>
      ));
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
        {/* Mobile: Stack layout, Desktop: Flex layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Top section on mobile: Image + Content */}
          <div className="flex gap-3 sm:gap-4 flex-1">
            <img
              src={item.imageUrl}
              alt={isArabic ? item.localName : item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                {isArabic ? item.localName : item.name}
              </h3>

              {/* ✅ Restaurant Name */}
              {item.restaurantName && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {isArabic ? item.arabicRestaurantName : item.restaurantName}
                </p>
              )}

              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {item.description}
              </p>

              {/* Display selected variant */}
              {item.selectedVariant && (
                <div className="text-xs text-gray-600 mt-1">
                  <span className="font-medium">
                    {isArabic ? "النوع" : "Variant"}:
                  </span>
                  <span className="ml-1">
                    {typeof item.selectedVariant === "object"
                      ? item.selectedVariant.name
                      : item.selectedVariant}
                  </span>
                </div>
              )}

              {/* Display selected addons */}
              {renderAddons(item.selectedAddons)}

              <p className="text-sm sm:text-base font-semibold text-[#ff3131] mt-2">
                {isArabic ? "ريال عماني" : "OMR"}{" "}
                {(item.totalPrice || 0).toFixed(3)}
              </p>
            </div>
          </div>

          {/* Bottom section on mobile: Controls, Right side on desktop */}
          <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2 sm:justify-start">
            <button
              onClick={async () => {
                setLoadingItemId(item.id);
                try {
                  await removeFromCart(item.id);
                } finally {
                  setLoadingItemId(null);
                }
              }}
              disabled={loadingItemId === item.id}
              className="text-gray-400 hover:text-red-500 disabled:opacity-50 p-2 sm:p-1"
            >
              <Trash2 size={20} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Quantity Control - Larger on mobile */}
            <div className="flex items-center gap-3 sm:gap-2">
              <button
                disabled={loadingItemId === item.id || item.quantity <= 1}
                onClick={async () => {
                  setLoadingItemId(item.id);
                  try {
                    await changeQuantity({ cartId: item.id, delta: -1 });
                  } finally {
                    setLoadingItemId(null);
                  }
                }}
                className="p-2 sm:p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 touch-manipulation"
              >
                <Minus size={16} className="sm:w-[14px] sm:h-[14px]" />
              </button>

              <span className="px-3 py-1 sm:px-2 sm:py-0 min-w-[2rem] sm:min-w-[1rem] h-8 sm:h-4 flex items-center justify-center text-sm sm:text-xs font-medium">
                {loadingItemId === item.id ? (
                  <ClipLoader size={16} className="sm:w-5 sm:h-5" />
                ) : (
                  item.quantity
                )}
              </span>

              <button
                disabled={loadingItemId === item.id}
                onClick={async () => {
                  setLoadingItemId(item.id);
                  try {
                    await changeQuantity({ cartId: item.id, delta: 1 });
                  } finally {
                    setLoadingItemId(null);
                  }
                }}
                className="p-2 sm:p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 touch-manipulation"
              >
                <Plus size={16} className="sm:w-[14px] sm:h-[14px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SummaryPanel = () => (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 h-fit">
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
        {isArabic ? "ملخص الطلب" : "Order Summary"}
      </h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>{isArabic ? "المجموع الفرعي" : "Subtotal"}</span>
          <span>
            {isArabic ? "ريال عماني" : "OMR"} {subtotal.toFixed(3)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>{isArabic ? "رسوم التوصيل" : "Delivery Fee"}</span>
          <span>
            {isArabic ? "ريال عماني" : "OMR"} {deliveryFee.toFixed(3)}
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-base">
          <span>{isArabic ? "الإجمالي" : "Total"}</span>
          <span className="text-[#ff3131]">
            {isArabic ? "ريال عماني" : "OMR"} {total.toFixed(3)}
          </span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mt-3 sm:mt-4">
        <input
          type="text"
          placeholder={isArabic ? "أدخل رمز الخصم" : "Promo Code"}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 sm:py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3131]/40"
        />
        <button className="mt-2 w-full bg-[#ff3131] text-white py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:opacity-90 touch-manipulation">
          {isArabic ? "تطبيق" : "Apply"}
        </button>
      </div>

      {/* Checkout */}
      <button
        onClick={() => setDownloadModal(true)}
        className="mt-4 sm:mt-6 w-full bg-[#ff3131] text-white py-3.5 sm:py-3 rounded-full font-semibold hover:opacity-90 transition-all touch-manipulation text-base sm:text-sm"
      >
        {isArabic ? "المتابعة إلى الدفع" : "Proceed to Payment"}
      </button>
    </div>
  );

  // --- Empty Cart UI ---
  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
        <p className="mb-4 text-md font-medium text-gray-600">
          {isArabic
            ? "سلة التسوق الخاصة بك فارغة. تصفح منتجاتنا وابدأ التسوق اليوم!"
            : "Explore our products and start shopping today"}
        </p>
        <img
          src="/cart/cartEmpty.gif"
          alt="Empty Cart"
          className="w-80 h-80 mb-6"
        />
        <button
          onClick={() => navigate("/")}
          className="inline-block px-6 py-3 text-white bg-[#ff3131] rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Shopping"}
        </button>
      </div>
    );
  }

  // --- Main Cart UI ---
  return (
    <div
      className="min-h-screen bg-gray-100 px-3 py-16 sm:px-4 sm:py-20 lg:px-8"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className={`mb-6 sm:mb-8 ${isArabic ? "text-right" : ""}`}>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {isArabic ? "سلة التسوق الخاصة بك" : "Your Cart"}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {isArabic
              ? `لديك ${cartItems.length} عنصر(عناصر) في سلتك.`
              : `You have ${cartItems.length} item(s) in your cart.`}
          </p>
        </div>

        {/* Layout - Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary - Fixed at bottom on mobile, sidebar on desktop */}
          <div className="lg:sticky lg:top-4">
            <SummaryPanel />
          </div>
        </div>
      </div>

      {downloadModal && <DownloadModal setDownloadModal={setDownloadModal} />}
    </div>
  );
};

export default CartPage;
