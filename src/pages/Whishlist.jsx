import React from "react";
import { useSelector } from "react-redux";
import WishlistCard from "@/components/whishlist/WhishListCard";
import { useWishlist } from "@/hooksDemo/userMutation";
import WhishlistCategoryBar from "@/components/whishlist/WhishlistCategoryBar";
import { useTranslation } from "react-i18next";
import { auth } from "@/firebase/config";
// import { auth } from "@/firebaseDemo/democonfig";

const Whishlist = () => {
  const { t } = useTranslation();
    const currentUserId = auth.currentUser?.uid;
 // Later: Replace with currentUser?.uid
  const { data: wishlist = [] } = useWishlist(currentUserId);
  const wishlistIds = useSelector((state) => state.user.wishlistIds);

  return (
    <div className="px-4 mt-16">
      <h2 className="text-3xl font-semibold mb-4">{t("Wishlist")}</h2>

      <WhishlistCategoryBar />

      {wishlist.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          {t("Your wishlist is empty.")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {wishlist.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              isLiked={wishlistIds?.has?.(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Whishlist;
