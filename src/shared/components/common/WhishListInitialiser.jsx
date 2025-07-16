// src/components/common/WishlistInitializer.jsx
import { useWishlist } from '@/shared/services/queries/wishlist.query';
import { setWhishListIds } from '@/shared/slices/user/userSlice';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';



const WishlistInitializer = () => {
  const { userId } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { data: wishlist = [] } = useWishlist(userId);

  const wishlistIds = useMemo(() => new Set(wishlist.map(item => item.id)), [wishlist]);

  useEffect(() => {
    if (userId && wishlist.length > 0) {
      dispatch(setWhishListIds(wishlistIds));
    }
  }, [userId, wishlistIds, wishlist.length, dispatch]);

  return null; // This component doesn't render anything
};

export default WishlistInitializer;
