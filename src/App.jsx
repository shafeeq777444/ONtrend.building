import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Home from "./modules/home/pages/HomePage";
import MainLayout from "./shared/layouts/MainLayout";

// extras-----------------------------------------------------
import OntrendLoading from "./shared/components/common/OntrendLoading";
const BuildingRoomCard = lazy(() => import("./modules/building/components/card/BuildingRoomCard"));
import RoomDetails from "./modules/building/pages/RoomDetails";
const ResponsePage = lazy(() => import("./shared/components/common/ResponsePage"));
const Failiure = lazy(() => import("./shared/components/common/Failiure"));
const ReferralDeepLinkHandler = lazy(() => import("./shared/components/common/ReferralDeepLinkHandler"));
const DeepLinkHandler = lazy(() => import("./shared/components/common/DeepLinkHandler"));
const AppStoreRedirect = lazy(() => import("./shared/components/common/AppStoreRedirect"));
const Careers = lazy(() => import("./shared/components/common/Careers"));
const TermsAndConditions = lazy(() => import("./shared/components/common/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./shared/components/common/PrivacyPolicy"));


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
                    <Route path="about" element={<BuildingRoomCard/>} />

                    {/* -------------------------------- Building & apartments ---------------------------- */}
                    <Route path="building" element={<BuildingHomePage />} />
                    <Route path="building/:buildingId" element={<BuildingDetailPage />} />
                    <Route path="building/:buildingId/room/:roomId" element={<RoomDetails />} />
                    {/* -------------------------------- commented ---------------------------- */}
                </Route>

                {/* ---------------------------------  Auth --------------------------------- */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Sign />} />
                    <Route path="credential" element={<Credential />} />
                </Route>

                {/* extra */}
                <Route path="/success" element={<ResponsePage />} />
                <Route path="/fail" element={<Failiure />} />
                <Route path="/uvw/:referralCode" element={<ReferralDeepLinkHandler />} />
                <Route path="/xyz/:vendorId" element={<DeepLinkHandler />} />
                <Route path="/socials" element={<AppStoreRedirect />} />
                <Route path="/careers" element={<Careers />} />
                <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />

            </Routes>
        </Suspense>
    );
}
