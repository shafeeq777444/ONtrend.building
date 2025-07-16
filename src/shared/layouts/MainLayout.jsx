import { Outlet } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import ONTRENDFooter from '@/shared/containers/Footer/Footer';
import WishlistInitializer from '../components/common/WhishListInitialiser';


export default function MainLayout() {
  return (
    <>
      <TopBar />
      <WishlistInitializer /> 
      <Outlet />
      <ONTRENDFooter />
    </>
  );
}
