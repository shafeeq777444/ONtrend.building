/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FiMapPin, FiSearch, FiChevronDown, FiUser, FiHeart, FiX } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import { setLocation, setLocationName, setUserID } from "../../slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import DeliveryLocation from "../Location/DeliveryLocation";
import { useTranslation } from "react-i18next";
import UserProfileModal from "@/modules/auth/components/UserProfileModal";
import SlideInLoginModal from "@/modules/auth/components/SlideInLoginModal";
import { auth } from "@/lib/firebase/config";

export default function TopBar({ cartCount = 2 }) {
    const EXPIRY_DURATION = 1000 * 60 * 20;
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [addressExpiry, setAddressExpiry] = useState(false);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const dispatch = useDispatch();

    // ####### states ###################################
    const { location, locationName } = useSelector((state) => state.user);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [showUserModal, setShowUserMOdal] = useState(false);
    const [showUserReminderModal, setShowUserReminderModal] = useState(false);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    const isArabic = i18n.language === "ar";

    const placeholders = [
        t("placeholder.search"),
        t("placeholder.hungry"),
        t("placeholder.ride"),
        t("placeholder.essentials"),
        t("placeholder.hotels"),
        t("placeholder.groceries"),
    ];
    const menuItems = [
        { label: "Wishlist", icon: <FiHeart />, onClick: () => navigate("/wishlist") },
        { label: "Cart", icon: <HiOutlineShoppingCart />, onClick: () => navigate("/cart") },
        { label: "Profile", icon: <FiUser />, onClick: () => setShowUserMOdal(true) },
    ];

    // ################## useEFfect ###################################################
    useEffect(() => {
        const showModalIfNotLoggedIn = () => {
            const user = auth.currentUser;
            if (!user) {
                setShowUserReminderModal(true);
            }
        };

        timeoutRef.current = setTimeout(() => {
            showModalIfNotLoggedIn();

            intervalRef.current = setInterval(() => {
                showModalIfNotLoggedIn();
            }, 1000 * 60 * 3); // Every 5 mins
        }, 1000 * 60*1); // First after 1 min

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUserID(user.uid));
                // Stop future modals if user logged in
                clearTimeout(timeoutRef.current);
                clearInterval(intervalRef.current);
                setShowUserReminderModal(false);
            }
        });

        return () => {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const checkAndForceOpenLocation = async () => {
            const addressExp = await localforage.getItem("AddressExp");
            const address = await localforage.getItem("userAddress");
            const location = await localforage.getItem("userLocation");

            // const isExpired = !addressExp || Date.now() - addressExp > EXPIRY_DURATION;

            if (!address || !location 
                // || isExpired
            ) {
                setShowLocationModal(true);
            }
        };

        checkAndForceOpenLocation();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchStoredLocation = async () => {
            const savedLocation = await localforage.getItem("userLocation");
            const savedAddress = await localforage.getItem("userAddress");
            if (savedLocation) dispatch(setLocation(savedLocation));
            if (savedAddress) dispatch(setLocationName(savedAddress));
        };
        fetchStoredLocation();
    }, [dispatch]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInput(inputText);
        }, 400);
        return () => clearTimeout(handler);
    }, [inputText]);

    useEffect(() => {
        if (debouncedInput !== "") {
            console.log("Searching for:", debouncedInput);
        }
    }, [debouncedInput]);

    const handleClick = () => {
        const user = auth.currentUser;
        if (user) {
            setShowUserMOdal(true);
        } else {
            navigate("/auth"); // replace with your login route
        }
    };

    // Function to format address by removing plus code and postal code
    const formatLocationName = (address) => {
  if (!address) return address;

  let formatted = address;

  // Remove plus code pattern (e.g., "RW6F+34M, ")
  formatted = formatted.replace(/[A-Z0-9]{4}\+[A-Z0-9]{2,3},?\s*/g, '');

  // Remove postal codes (6-digit numbers) anywhere
  formatted = formatted.replace(/\b\d{6}\b,?\s*/g, '');

  // Remove any other standalone numbers
  formatted = formatted.replace(/\b\d+\b,?\s*/g, '');

  // Clean up multiple commas or extra spaces
  formatted = formatted.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '').trim();

  return formatted;
};
    return (
        <>
            <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`sticky top-0 left-0 w-full z-50 px-4 lg:px-6 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 transition-all duration-300 ${
                    scrolled
                        ? "bg-[rgba(24,24,27,0.95)] backdrop-blur-md shadow-lg border-b border-white/10"
                        : "bg-[rgba(24,24,27,0.95)] backdrop-blur-sm"
                }`}
            >
                <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0 w-full md:w-auto justify-between md:justify-start">
                    <motion.img
                        onClick={() => navigate("/")}
                        src="/ONtrend-logo.png"
                        alt="Company Logo"
                        className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-pointer transition-all duration-300 ease-in-out"

                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    <motion.div
                        className="flex items-center space-x-2 text-white cursor-pointer hover:bg-white/10 rounded-sm px-3 py-2 transition-all duration-200 group"
                        onClick={() => setShowLocationModal(true)}
                    >
                        <FiMapPin className="text-red-300 text-lg group-hover:text-red-200 transition-colors" />
                        <span className="text-sm md:text-base font-medium truncate max-w-[120px] md:max-w-[200px] lg:max-w-none">
                            {formatLocationName(locationName) || t("tap_to_set_location")}
                        </span>
                        <FiChevronDown className="text-gray-300 group-hover:text-white transition-colors" />
                    </motion.div>

                    <motion.div 
                        className="md:hidden ml-auto"
                    >
                        {menuOpen ? (
                            <motion.div
                                onClick={() => setMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all duration-200"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 180 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiX className="text-lg" />
                            </motion.div>
                        ) : (
                            <motion.div
                                onClick={() => setMenuOpen(true)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all duration-200"
                                initial={{ rotate: 180 }}
                                animate={{ rotate: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FiUser className="text-lg" />
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                <div className="w-full md:flex-1 min-w-0 max-w-full md:max-w-4xl lg:max-w-5xl">
                    <div className="relative group">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-300 transition-colors z-10" />
                        <input
                            disabled={true}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-9 lg:h-11 pl-12 pr-4 py-0 text-white text-sm lg:text-base bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/30 rounded-md focus:outline-none transition-all duration-200 backdrop-blur-sm"
                            placeholder=""
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        {inputText === "" && (
                            <div
                                className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-sm text-gray-400 transition-all duration-300 ${
                                    isArabic ? "right-10 text-right" : "left-10 text-left"
                                }`}
                            >
                                <div className="overflow-hidden h-[1.5rem] relative">
                                    <div className="loop-animation">
                                        {placeholders.map((text, index) => (
                                            <div key={index} className="h-[1.5rem] leading-[1.5rem]">
                                                {text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
                    <motion.button
                        onClick={() => {
                            const nextLang = i18n.language === "en" ? "ar" : "en";
                            i18n.changeLanguage(nextLang);
                            localStorage.setItem("language", nextLang);
                            window.location.reload();
                        }}
                        className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold rounded-sm bg-white/10 hover:bg-white/20 transition-all duration-200 group text-white"
                        title="Toggle Language"
                    >
                        <span className="">
                            {i18n.language === "en" ? "AR" : "EN"}
                        </span>
                    </motion.button>
                    
                    <motion.div
                        onClick={() => navigate("/wishlist")}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
                            currentLocation.pathname === '/wishlist' 
                                ? 'bg-white/20' 
                                : 'bg-white/10 hover:bg-white/15'
                        }`}
                        title="Wishlist"
                    >
                        <FiHeart className={`transition-colors ${
                            currentLocation.pathname === '/wishlist'
                                ? 'text-red-400'
                                : 'text-red-300 group-hover:text-red-200'
                        }`} />
                        <span className="text-sm font-medium text-white hidden lg:block">{t("wishlist")}</span>
                    </motion.div>
                    
                    <motion.div
                        onClick={() => navigate("/cart")}
                        className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
                            currentLocation.pathname === '/cart' 
                                ? 'bg-white/20' 
                                : 'bg-white/10 hover:bg-white/15'
                        }`}
                        title="Cart"
                    >
                        <HiOutlineShoppingCart className={`transition-colors text-lg ${
                            currentLocation.pathname === '/cart'
                                ? 'text-green-400'
                                : 'text-green-300 group-hover:text-green-200'
                        }`} />
                        <span className="text-sm font-medium text-white hidden lg:block">{t("cart")}</span>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 z-20">
                                {cartCount}
                            </span>
                        )}
                    </motion.div>
                    
                    <motion.div
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
                            currentLocation.pathname === '/auth' || currentLocation.pathname === '/profile'
                                ? 'bg-white/20' 
                                : 'bg-white/10 hover:bg-white/15'
                        }`}
                        title="Profile"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <FiUser className={`transition-colors ${
                            currentLocation.pathname === '/auth' || currentLocation.pathname === '/profile'
                                ? 'text-blue-400'
                                : 'text-blue-300 group-hover:text-blue-200'
                        }`} />
                        <span className="text-sm font-medium text-white hidden lg:block">{t("profile")}</span>
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMenuOpen(false)}
                        />
                        
                        {/* Modal menu */}
                        <motion.div
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-xl shadow-2xl rounded-b-2xl z-50 md:hidden"
                        >
                        <div className="px-6 py-6 space-y-4">
                            {/* Header with close button */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
                                <motion.div 
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-all duration-200"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <FiX className="text-sm" />
                                </motion.div>
                            </div>
                            <motion.div
                                className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-xl px-4 py-3 transition-all duration-200 group"
                                onClick={() => {
                                    navigate("/wishlist");
                                    setMenuOpen(false);
                                }}
                            >
                                <FiHeart className="text-red-500 group-hover:text-red-600 transition-colors text-lg" />
                                <span className="font-medium">{t("wishlist")}</span>
                            </motion.div>

                            <motion.div
                                className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-xl px-4 py-3 transition-all duration-200 group"
                                onClick={() => {
                                    navigate("/cart");
                                    setMenuOpen(false);
                                }}
                            >
                                <HiOutlineShoppingCart className="text-green-500 group-hover:text-green-600 transition-colors text-lg" />
                                <span className="font-medium">{t("cart")}</span>
                            </motion.div>

                            <motion.div
                                className="flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-100 rounded-xl px-4 py-3 transition-all duration-200 group"
                                onClick={() => {
                                    handleClick();
                                    setMenuOpen(false);
                                }}
                            >
                                <FiUser className="text-blue-500 group-hover:text-blue-600 transition-colors text-lg" />
                                <span className="font-medium">{t("profile")}</span>
                            </motion.div>

                            <div className="border-t border-gray-200 pt-4 mt-6">
                                <motion.button
                                    onClick={() => {
                                        const nextLang = i18n.language === "en" ? "ar" : "en";
                                        i18n.changeLanguage(nextLang);
                                        localStorage.setItem("language", nextLang);
                                        window.location.reload();
                                    }}
                                    className="w-full flex items-center justify-center space-x-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl px-4 py-3 transition-all duration-200 group font-medium shadow-lg"
                                    whileHover={{ y: -1 }}
                                    whileTap={{}}
                                >
                                    <span className="text-sm font-semibold">
                                        {i18n.language === "en" ? "العربية" : "English"}
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                         </motion.div>
                     </>
                 )}
             </AnimatePresence>

            {(!location || !locationName || showLocationModal) && (
                <DeliveryLocation
                    setAddressExpiry={setAddressExpiry}
                    location={location}
                    locationName={locationName}
                    addressExpiry={addressExpiry}
                    closeModal={() => setShowLocationModal(false)}
                />
            )}
            {showUserModal && <UserProfileModal setShowUserMOdal={setShowUserMOdal} />}
            {showUserReminderModal && (
                <SlideInLoginModal isOpen={showUserReminderModal} onClose={() => setShowUserReminderModal(false)} />
            )}
        </>
    );
}
