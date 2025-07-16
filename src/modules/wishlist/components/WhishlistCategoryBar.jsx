/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Utensils,
  ShoppingCart,
  Building2,
  HeartPulse,
  ShoppingBag,
  Car,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function WhishlistCategoryBar({ active, setActive }) {
  const { t } = useTranslation();
  const categories = [
    { id: "Food/Restaurant", label: t("whishlist_category_labels.food"), icon: Utensils },
    { id: "grocery", label: t("whishlist_category_labels.grocery"), icon: ShoppingCart },
    { id: "building", label: t("whishlist_category_labels.hotel"), icon: Building2 },
    { id: "health", label: t("whishlist_category_labels.health"), icon: HeartPulse },
    { id: "eshop", label: t("whishlist_category_labels.eshop"), icon: ShoppingBag },
    { id: "rent", label: t("whishlist_category_labels.rent"), icon: Car },
  ];

  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-sm mb-4 overflow-x-auto scrollbar-hide">
      {categories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition
            ${active === id
              ? "bg-white shadow text-black"
              : "text-gray-500 hover:bg-white/70"
            }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
