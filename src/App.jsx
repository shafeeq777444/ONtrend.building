// import { BrowserRouter, useRoutes } from "react-router-dom"
// import routes from "./routes"

// function AppRouter(){
//   return useRoutes(routes)
// }

// function App() {
//   const element=useRoutes(routes)
//   console.log(element)
//   return (
//     <>
//     <BrowserRouter>
//    <AppRouter/>
//     </BrowserRouter>
    
//     </>
//   )
// }

// export default App

App.jsx
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Food from './pages/Food';
import Auth from './pages/Auth';
import SignUP from './pages/SignUP';

import MainLayout from './layouts/MainLayout';
import FoodVender from './pages/FoodVender';
import Whishlist from './pages/Whishlist';
import Cart from './pages/Cart';


export default function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />, // Wrap all routes with Navbar
      children: [
        { index: true, element: <Home /> },
        { path: 'auth', element: <Auth /> },
        { path: 'auth/signup', element: <SignUP /> },
        { path: 'food', element: <Food /> },
        { path: 'food/:vendorId', element: <FoodVender /> },
        { path: 'wishlist', element: <Whishlist /> },
        { path: 'cart', element: <Cart /> },
        { path: 'about', element: <About /> },
      ],
    },

  ]);
  return routes; // `useRoutes` returns the matching route component
}