
App.jsx
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import About from './components/foodHome/FoodSearchVendors';
import Food from './pages/Food';
import MainLayout from './layouts/MainLayout';
import FoodVender from './pages/FoodVender';
import Whishlist from './pages/Whishlist';
import Cart from './pages/Cart';
import Login from './components/auth/Login';
import AuthLayout from './components/auth/AuthLayout';
import Sign from './components/auth/Signup';
import Credential from './components/auth/Credential';


export default function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />, // Wrap all routes with Navbar
      children: [
        { index: true, element: <Home /> },
        { path: 'food', element: <Food /> },
        { path: 'food/:vendorId', element: <FoodVender /> },
        { path: 'wishlist', element: <Whishlist /> },
        { path: 'cart', element: <Cart /> },
        { path: 'about', element: <About /> },
      ],
    },
    { path: 'auth', element: <AuthLayout /> ,
          children:[
            {index:true,element:<Login/>},
            {path:'signup',element:<Sign/>},
            {path:'credential',element:<Credential/>}
          ]
        },

  ]);
  return routes; // `useRoutes` returns the matching route component
}