import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import Home from "./modules/home/pages/HomePage";
import MainLayout from "./shared/layouts/MainLayout";

// extras-----------------------------------------------------
import OntrendLoading from "./shared/components/common/OntrendLoading";

import RoomDetails from "./modules/building/pages/RoomDetailsPage";
import BuildingRoomSearchedPage from "./modules/building/pages/BuildingRoomSearchedPage";
import useOnlineStatus from "./shared/hooks/useOnlineStatus";
import toast from "react-hot-toast";

// Rooms-------------------------------------------------------------
const BuildingHomePage = lazy(() => import("@/modules/building/pages/BuildingHomePage.jsx"));
const BuildingDetailPage = lazy(() => import("@/modules/building/pages/BuildingDetailPage.jsx"));

// import ApartmentDetails from "./pages/Rooms/BuildingPage";
// -------------------------------------------------------------

// food-----------------------------------------------------
const Food = lazy(() => import("./modules/food/pages/Food"));
const FoodVender = lazy(() => import("./modules/food/pages/FoodVender"));
const FoodVendorDiscount = lazy(() => import("./modules/food/pages/FoodVendorDiscount"));

// login-----------------------------------------------------
const AuthLayout = lazy(() => import("./modules/auth/layouts/AuthLayout"));
const Login = lazy(() => import("./modules/auth/pages/Login"));
const Sign = lazy(() => import("./modules/auth/pages/Signup"));
const Credential = lazy(() => import("./modules/auth/pages/Credential"));

// cart & wishlist
const Whishlist = lazy(() => import("./modules/wishlist/pages/Whishlist"));
const Cart = lazy(() => import("./modules/cart/pages/Cart"));

export default function App() {
    const isOnline = useOnlineStatus();

    useEffect(() => {
        const toastId = "network-status"; // unique ID for this toast

        if (!isOnline) {
            toast.error("No internet connection", {
                id: toastId, // same ID -> replaces instead of stacking
                duration: 10000,
            });
        } else {
            toast.success("Back to Shoppy!", {
                id: toastId,
                duration: 2000,
            });
        }
    }, [isOnline]);
    return (
        <Suspense fallback={<OntrendLoading />}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    {/* ------------------------- food --------------------------------- */}
                    <Route path="food" element={<Food />} />
                    <Route path="food/:vendorId" element={<FoodVender />} />
                    <Route path="food/foodDiscountVendor/:discountValue" element={<FoodVendorDiscount />} />
                    <Route path="wishlist" element={<Whishlist />} />
                    <Route path="cart" element={<Cart />} />
                    {/* <Route path="about" element={<BuildingRoomCard/>} /> */}

                    {/* -------------------------------- Building & apartments ---------------------------- */}
                    <Route path="building" element={<BuildingHomePage />} />
                    <Route path="building/:buildingId" element={<BuildingDetailPage />} />
                    <Route path="building/:buildingId/room/:roomId" element={<RoomDetails />} />
                    <Route path="/building/search" element={<BuildingRoomSearchedPage />} />
                    {/* -------------------------------- commented ---------------------------- */}
                </Route>

                {/* ---------------------------------  Auth --------------------------------- */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Sign />} />
                    <Route path="credential" element={<Credential />} />
                </Route>

                {/* extra */}
                {/* <Route path="/success" element={<ResponsePage />} />
                <Route path="/fail" element={<Failiure />} />
                <Route path="/uvw/:referralCode" element={<ReferralDeepLinkHandler />} />
                <Route path="/xyz/:vendorId" element={<DeepLinkHandler />} />
                <Route path="/socials" element={<AppStoreRedirect />} />
                <Route path="/careers" element={<Careers />} />
                <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} /> */}
            </Routes>
        </Suspense>
    );
}
