import React from 'react';
import { useSelector } from 'react-redux';
import WishlistCard from '@/components/whishlist/WhishListCard';
import { useWishlist } from '@/hooksDemo/userMutation';

const Whishlist = () => {
  const userId = 'user12';
  const { data: wishlist = [] } = useWishlist(userId);
  const wishlistIds = useSelector((state) => state.user.wishlistIds);

  return (
    <div className="px-4 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {wishlist.map((item) => (
          <WishlistCard
            key={item.id}
            item={item}
            isLiked={wishlistIds?.has?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Whishlist;
