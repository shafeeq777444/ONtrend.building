
// App.jsx
// import { useRoutes } from 'react-router-dom';
// import Home from './pages/Home';

// import Food from './pages/Food';
// import MainLayout from './layouts/MainLayout';
// import FoodVender from './pages/FoodVender';
// import Whishlist from './pages/Whishlist';
// import Cart from './pages/Cart';
// import Login from './components/auth/Login';
// import AuthLayout from './components/auth/AuthLayout';
// import Sign from './components/auth/Signup';
// import Credential from './components/auth/Credential';
// import UserProfileModal from './components/auth/UserProdileModal';
// import FoodVendorDiscount from './pages/FoodVendorDiscount';



// export default function App() {
//   const routes = useRoutes([
//     {
//       path: '/',
//       element: <MainLayout />, // Wrap all routes with Navbar
//       children: [
//         { index: true, element: <Home /> },
//         { path: 'food', element: <Food /> },
//         { path: 'food/:vendorId', element: <FoodVender /> },
//         { path: 'food/foodDiscountVendor/:discountValue', element: <FoodVendorDiscount/> },
//         { path: 'wishlist', element: <Whishlist /> },
//         { path: 'cart', element: <Cart /> },
//         { path: 'about', element: <UserProfileModal/> },
//       ],
//     },
//     { path: 'auth', element: <AuthLayout /> ,
//           children:[
//             {index:true,element:<Login/>},
//             {path:'signup',element:<Sign/>},
//             {path:'credential',element:<Credential/>}
//           ]
//         },

//   ]);
//   return routes; // `useRoutes` returns the matching route component
// }


import {
  Routes,
  Route
} from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import OntrendLoading from './components/common/OntrendLoading';
const Home = lazy(() => import('./pages/Home'));
const Food = lazy(() => import('./pages/Food'));
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const FoodVender = lazy(() => import('./pages/FoodVender'));
const Whishlist = lazy(() => import('./pages/Whishlist'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./components/auth/Login'));
const AuthLayout = lazy(() => import('./components/auth/AuthLayout'));
const Sign = lazy(() => import('./components/auth/Signup'));
const Credential = lazy(() => import('./components/auth/Credential'));
const UserProfileModal = lazy(() => import('./components/auth/UserProdileModal'));
const FoodVendorDiscount = lazy(() => import('./pages/FoodVendorDiscount'));


export default function App() {
  return (
    <Suspense fallback={<OntrendLoading/>}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="food" element={<Food />} />
        <Route path="food/:vendorId" element={<FoodVender />} />
        <Route path="food/foodDiscountVendor/:discountValue" element={<FoodVendorDiscount />} />
        <Route path="wishlist" element={<Whishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<OntrendLoading/>} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Sign />} />
        <Route path="credential" element={<Credential />} />
      </Route>
    </Routes>
    </Suspense>
  );
}
