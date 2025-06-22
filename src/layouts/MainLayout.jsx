import { Outlet } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { useWishlist } from '@/hooksDemo/userMutation';
import { useMemo, useEffect } from 'react';
import { setWhishListIds } from '@/features/user/userSlice';

export default function MainLayout() {
  const { userId } = useSelector(state => state.user);
  const { wishlistIds:idsWhis } = useSelector(state => state.user);
  console.log(idsWhis,"chkk ids")
  const dispatch = useDispatch();

  // ✅ Always call hooks unconditionally
  const { data: wishlist = [] } = useWishlist(userId);

  // ✅ Compute wishlist IDs
  const wishlistIds = useMemo(() => new Set(wishlist.map(item => item.id)), [wishlist]);

  // ✅ Set wishlistIds in Redux store when it changes
  useEffect(() => {
    if (userId && wishlist.length > 0) {
      dispatch(setWhishListIds(wishlistIds));
    }
  }, [userId, wishlistIds, wishlist.length, dispatch]);
console.log()
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}
