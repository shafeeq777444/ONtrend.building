import { Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import OntrendLoading from "./components/common/OntrendLoading";
import ResponsePage from "./components/common/ResponsePage";
import Failiure from "./components/common/Failiure";
import ReferralDeepLinkHandler from "./components/common/ReferralDeepLinkHandler";
import Careers from "./components/common/Careers";
import DeepLinkHandler from "./components/common/DeepLinkHandler";
import AppStoreRedirect from "./components/common/AppStoreRedirect";
import Home from "./pages/Home";
import BuildingDetails from "./containers/Rooms/RoomDetails";
import TermsAndConditions from "./components/common/TermsAndConditions";
import PrivacyPolicy from "./components/common/PrivacyPolicy";
import Footer from "./containers/Footer/Footer";
import BuildingRoomReviews from "./components/Rooms/RoomDetail/BuildingRoomReviews";
import ApartmentDetails from "./pages/Rooms/BuildingPage";
import BuildingCarouseImage from "./components/Building/BuildingCarouseImage";
const RoomHome = lazy(() => import("./pages/Rooms/RoomHome"));
const Food = lazy(() => import("./pages/Food"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const FoodVender = lazy(() => import("./pages/FoodVender"));
const Whishlist = lazy(() => import("./pages/Whishlist"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./components/auth/Login"));
const AuthLayout = lazy(() => import("./components/auth/AuthLayout"));
const Sign = lazy(() => import("./components/auth/Signup"));
const Credential = lazy(() => import("./components/auth/Credential"));
const UserProfileModal = lazy(() => import("./components/auth/UserProdileModal"));
const FoodVendorDiscount = lazy(() => import("./pages/FoodVendorDiscount"));

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
                    <Route path="about" element={<BuildingCarouseImage />} />

                    {/* -------------------------------- rooms ---------------------------- */}
                    <Route path="stays" element={<RoomHome />} />
                    <Route path="building/:buildingId" element={<ApartmentDetails />} />
                    <Route path="stays/:buildingId" element={<BuildingDetails />} />
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
