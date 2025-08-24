import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Heart, ShoppingBag, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase/config";

import WishlistCard from "../components/WhishListCard";
import WhishlistCategoryBar from "../components/WhishlistCategoryBar";
import BuildingHomeCard from "@/modules/building/components/card/BuildingHomeCard";
import { useWishlist } from "@/modules/wishlist/services/queries/wishlist.query";

const Whishlist = () => {
  const { t } = useTranslation();
  const currentUserId = auth.currentUser?.uid;
  const { data: wishlist = [], isLoading, error } = useWishlist(currentUserId);
  const wishlistIds = useSelector((state) => state.user.wishlistIds);

  const [activeCategory, setActiveCategory] = useState("Food/Restaurant");

  // === Dynamic filtering based on activeCategory ===
  const finalWishlist = wishlist.filter((item) => {
    if (activeCategory === "building") {
      return item?.vendorType == null; // null or undefined
    }
    return item?.vendorType === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Header Section ===== */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t("Wishlist")}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {finalWishlist.length > 0
                  ? `${finalWishlist.length} ${
                      finalWishlist.length === 1 ? "item" : "items"
                    } saved`
                  : t("Save your favorite items here")}
              </p>
            </div>
          </div>

          <WhishlistCategoryBar
            active={activeCategory}
            setActive={setActiveCategory}
          />
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingWishlist t={t} />
        ) : error ? (
          <ErrorWishlist t={t} />
        ) : finalWishlist.length === 0 ? (
          <EmptyWishlist t={t} />
        ) : (
          <WishlistGrid
            wishlist={finalWishlist}
            activeCategory={activeCategory}
            wishlistIds={wishlistIds}
          />
        )}
      </div>
    </div>
  );
};

export default Whishlist;

/* ===== Subcomponents ===== */
const LoadingWishlist = ({ t }) => (
  <div className="space-y-8">
    {/* Loader */}
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-red-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t("Loading your wishlist")}
        </h3>
        <p className="text-gray-600">{t("Please wait while we fetch your saved items")}</p>
      </div>
    </div>

    {/* Skeleton Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
          <div className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ErrorWishlist = ({ t }) => (
  <div className="text-center py-16">
    <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
      <Heart className="h-12 w-12 text-red-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {t("Unable to load wishlist")}
    </h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      {t("There was an error loading your wishlist. Please try again.")}
    </p>
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
    >
      {t("Try Again")}
    </button>
  </div>
);

const EmptyWishlist = ({ t }) => (
  <div className="text-center py-16">
    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
      <ShoppingBag className="h-12 w-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {t("Your wishlist is empty")}
    </h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      {t(
        "Start adding items to your wishlist by clicking the heart icon on products you love."
      )}
    </p>
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
    >
      {t("Continue Shopping")}
    </button>
  </div>
);

const WishlistGrid = ({ wishlist, activeCategory, wishlistIds }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
    {wishlist.map((item) =>
      activeCategory === "building" ? (
        <BuildingHomeCard
          key={item.id}
          building={item}
          isLiked={wishlistIds?.has?.(item.id)}
        />
      ) : (
        <WishlistCard
          key={item.id}
          item={item}
          isLiked={wishlistIds?.has?.(item.id)}
        />
      )
    )}
  </div>
);
