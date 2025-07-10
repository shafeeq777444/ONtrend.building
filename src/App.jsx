import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import OntrendLoading from "./shared/components/common/OntrendLoading";
import ResponsePage from "./shared/components/common/ResponsePage";
import Failiure from "./shared/components/common/Failiure";
import ReferralDeepLinkHandler from "./shared/components/common/ReferralDeepLinkHandler";
import Careers from "./shared/components/common/Careers";
import DeepLinkHandler from "./shared/components/common/DeepLinkHandler";
import AppStoreRedirect from "./shared/components/common/AppStoreRedirect";
import TermsAndConditions from "./shared/components/common/TermsAndConditions";
import PrivacyPolicy from "./shared/components/common/PrivacyPolicy";
import BuildingCarouseImage from "./modules/building/components/BuildingCarouseImage";

// commented-------------------------------------------------------------
// import BuildingDetails from "./containers/Rooms/RoomDetails";
// const RoomHome = lazy(() => import("./pages/Rooms/RoomHome"));
// import ApartmentDetails from "./pages/Rooms/BuildingPage";
// -------------------------------------------------------------
import Home from "./modules/home/pages/HomePage";
const MainLayout = lazy(() => import("./shared/layouts/MainLayout"));
// food-----------------------------------------------------
const Food = lazy(() => import("./modules/food/pages/Food"));
const FoodVender = lazy(() => import("./modules/food/pages/FoodVender"));
const FoodVendorDiscount = lazy(() => import("./modules/food/pages/FoodVendorDiscount"));

// login-----------------------------------------------------
const AuthLayout = lazy(() => import("./modules/auth/layouts/AuthLayout"));
const Login = lazy(() => import("./modules/auth/pages/Login"));
const Sign = lazy(() => import("./modules/auth/pages/Signup"));
const Credential = lazy(() => import("./modules/auth/pages/Credential"));


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
                    {/* <Route path="about" element={<ArrowButton />} /> */}

                    {/* -------------------------------- commented ---------------------------- */}
                    {/* <Route path="stays" element={<RoomHome />} />
                    <Route path="building/:buildingId" element={<ApartmentDetails />} />
                    <Route path="stays/:buildingId" element={<BuildingDetails />} /> */}
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
