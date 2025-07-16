import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { auth } from "@/lib/firebase/config";
import WishlistCard from "../components/WhishListCard";
import WhishlistCategoryBar from "../components/WhishlistCategoryBar";
import { useWishlist } from "@/shared/services/queries/wishlist.query";



const Whishlist = () => {
  const { t } = useTranslation();
  const currentUserId = auth.currentUser?.uid;
  const { data: wishlist = [] } = useWishlist(currentUserId);
  const wishlistIds = useSelector((state) => state.user.wishlistIds);
  const [activeCategory, setActiveCategory] = useState("food");

  // Filter for other categories
  const filteredWishlist = wishlist.filter(
    (item) => item?.vendorType === activeCategory
  );

  // Filter for buildings (null or undefined vendorType)
  const buildingWhishlist = wishlist.filter(
    (item) => item?.vendorType === null || item?.vendorType === undefined
  );

  // Decide what to show
  const finalWishlist =
    activeCategory === "building" ? buildingWhishlist : filteredWishlist;

  return (
    <div className="px-4 ">
      <h2 className="text-3xl font-semibold mb-4">{t("Wishlist")}</h2>

      <WhishlistCategoryBar
        active={activeCategory}
        setActive={setActiveCategory}
      />

      {finalWishlist.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          {t("Your wishlist is empty.")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 my-8">
          {finalWishlist.map((item) =>
            activeCategory === "building" ? (
              // <BuildingCard
              //   key={item.id}
              //   building={item}
              //   isLiked={wishlistIds?.has?.(item.id)}
              // />
              <div></div>
            ) : (
              <WishlistCard
                key={item.id}
                item={item}
                isLiked={wishlistIds?.has?.(item.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Whishlist;
