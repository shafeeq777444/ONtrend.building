import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({ name, desc, price, img }) => (
  <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
    <div className="flex items-center gap-3">
      <img src={img} alt={name} className="w-14 h-14 object-cover rounded-md" />
      <div>
        <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
        <p className="text-xs text-gray-500">{desc}</p>
        <p className="text-[#ff3131] font-semibold text-sm">${price}</p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button className="text-gray-400 hover:text-red-500">
        <Trash2 size={18} />
      </button>
      <div className="flex items-center gap-1">
        <button className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
          <Minus size={14} />
        </button>
        <span className="px-2 text-sm font-medium">1</span>
        <button className="p-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
          <Plus size={14} />
        </button>
      </div>
    </div>
  </div>
);

const FoodOrderComputerOrderCard = () => {
  return (
    <div className="bg-[#f8f8f8] rounded-2xl p-5 max-w-sm w-full mx-auto shadow-md flex flex-col h-full max-h-[90vh] overflow-y-auto">
      {/* Cart Items */}
      <div className="space-y-4">
        <CartItem
          name="Broiler Chicken Skin"
          desc="Fresh Chicken Skin"
          price="265"
          img="https://source.unsplash.com/40x40/?chicken"
        />
        <CartItem
          name="Fresh Watermelon"
          desc="Fresh Watermelon"
          price="265"
          img="https://source.unsplash.com/40x40/?watermelon"
        />
        <CartItem
          name="Fresh Green Bean"
          desc="Original Fresh Green Bean"
          price="265"
          img="https://source.unsplash.com/40x40/?greenbean"
        />
      </div>

      {/* Promo Code */}
      <div className="flex items-center gap-2 mt-6">
        <input
          type="text"
          placeholder="Enter Promo Code"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff3131]/40"
        />
        <button className="bg-[#ff3131] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
          Apply
        </button>
      </div>

      {/* Price Summary */}
      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$2510.00</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>$30.00</span>
        </div>
        <div className="flex justify-between text-base font-semibold border-t pt-3">
          <span>Total</span>
          <span className="text-[#ff3131]">$2540.00</span>
        </div>
      </div>

      {/* Payment Button */}
      <button className="mt-6 w-full bg-[#ff3131] text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all">
        Proceed To Payment
      </button>
    </div>
  );
};

export default FoodOrderComputerOrderCard;
