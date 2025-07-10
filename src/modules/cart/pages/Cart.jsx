import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useCartItems, useChangeCartQuantity, useRemoveFromCart } from "@/shared/services/queries/cart.query";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import DownloadModal from "@/shared/components/common/DownloadModal";

const CartPage = () => {
    const { userId } = useSelector((state) => state.user);
    const [loadingItemId, setLoadingItemId] = React.useState(null);
    const [downloadModal,setDownloadModal]=useState(false)
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const { data: cartItems = [] } = useCartItems(userId);
    const { mutateAsync: changeQuantity } = useChangeCartQuantity(userId);
    const { mutateAsync: removeFromCart } = useRemoveFromCart(userId);

    const subtotal = cartItems.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    return (
        <div className="h-screen bg-gray-100 px-4 py-20  sm:px-8" dir={isArabic ? "rtl" : "ltr"}>
            <div className="max-w-5xl mx-auto">
                {/* Heading */}
                <div className={`mb-8 ${isArabic ? "text-right" : ""}`}>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isArabic ? "سلة التسوق الخاصة بك" : "Your Cart"}
                    </h1>
                    <p className="text-gray-500 mt-1">
                        {isArabic
                            ? `لديك ${cartItems.length} عنصر(عناصر) في سلتك.`
                            : `You have ${cartItems.length} item(s) in your cart.`}
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500">
                                {isArabic ? "سلتك فارغة." : "Your cart is empty."}
                            </p>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center justify-between"
                                >
                                    <div className="flex gap-4 items-center">
                                        <img
                                            src={item.imageUrl}
                                            alt={isArabic ? item.restaurantArabicName : item.restaurantName}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {isArabic ? item.restaurantArabicName : item.restaurantName}
                                            </h3>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                            <p className="text-sm font-semibold text-[#ff3131] mt-1">
                                                {isArabic ? "ريال عماني" : "OMR"} {item.itemPrice}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
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
                                            className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex items-center gap-2">
                                            {/* Minus Button */}
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
                                                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                                            >
                                                <Minus size={14} />
                                            </button>

                                            {/* Quantity Display */}
                                            <span className="px-2 h-4 w-4 flex items-center justify-center">
                                                {loadingItemId === item.id ? (
                                                    <ClipLoader size={20} />
                                                ) : (
                                                    item.quantity
                                                )}
                                            </span>

                                            {/* Plus Button */}
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
                                                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Summary Panel */}
                    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">
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
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder={isArabic ? "أدخل رمز الخصم" : "Promo Code"}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3131]/40"
                            />
                            <button className="mt-2 w-full bg-[#ff3131] text-white py-2 rounded-lg text-sm font-medium hover:opacity-90">
                                {isArabic ? "تطبيق" : "Apply"}
                            </button>
                        </div>

                        {/* Checkout Button */}
                        <button onClick={()=>{
                            setDownloadModal(true)
                        }} className="mt-6 w-full bg-[#ff3131] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all">
                            {isArabic ? "المتابعة إلى الدفع" : "Proceed to Payment"}
                        </button>
                    </div>
                </div>
            </div>
            {downloadModal && <DownloadModal setDownloadModal={setDownloadModal}/>}
        </div>
    );
};

export default CartPage;
