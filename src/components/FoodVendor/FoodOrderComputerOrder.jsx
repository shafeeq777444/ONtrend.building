import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({ name, desc, price, img }) => (
  <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm mb-3">
    <div className="flex items-center gap-3">
      <img src={img} alt={name} className="w-12 h-12 object-cover rounded-md" />
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{desc}</p>
        <p className="text-[#ff3131] font-semibold">${price}</p>
      </div>
    </div>
    <div className="flex flex-col items-end gap-2">
      <button className="text-gray-400 hover:text-red-500">
        <Trash2 size={18} />
      </button>
      <div className="flex items-center gap-1">
        <button className="p-1 rounded-full bg-gray-100 text-gray-700">
          <Minus size={14} />
        </button>
        <span className="px-2 text-sm font-medium">1</span>
        <button className="p-1 rounded-full bg-gray-100 text-gray-700">
          <Plus size={14} />
        </button>
      </div>
    </div>
  </div>
);

const FoodOrderComputerOrderCard = () => {
  return (
    <div className="bg-[#f8f8f8] rounded-2xl h-[90vh] p-5 w-[350px] mx-auto">
      {/* Items */}
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
        name="Fresh Green bean"
        desc="Original Fresh Green Bean"
        price="265"
        img="https://source.unsplash.com/40x40/?greenbean"
      />

      {/* Promo Code */}
      <div className="flex items-center mt-5 gap-2">
        <input
          type="text"
          placeholder="Enter Promo Code"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:outline-none"
        />
        <button className="bg-[#ff3131] text-white px-4 py-2 rounded-lg text-sm font-medium">
          Apply Code
        </button>
      </div>

      {/* Price Summary */}
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$2510.00</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>$30.00</span>
        </div>
        <div className="flex justify-between font-semibold text-base border-t pt-2">
          <span>Total</span>
          <span className="text-[#ff3131]">$2540.00</span>
        </div>
      </div>

      {/* Payment Button */}
      <button className="mt-5 w-full bg-[#ff3131] text-white py-3 rounded-full font-semibold hover:opacity-90 transition">
        Proceed To Payment
      </button>
    </div>
  );
};

export default FoodOrderComputerOrderCard;
