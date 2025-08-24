/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FiMapPin, FiSearch, FiChevronDown, FiUser, FiHeart, FiX } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useCartItems } from "@/modules/cart/services/queries/cart.query";
import useCurrentUser from "@/shared/services/queries/user.query";


// ------------------- Sub Components -------------------

const Logo = ({ navigate }) => (
  <motion.img
    onClick={() => navigate("/")}
    src="/ONtrend-logo.png"
    alt="Company Logo"
    className="w-10 h-10 lg:w-12 lg:h-12 object-contain cursor-pointer transition-all duration-300 ease-in-out"
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  />
);

const LocationSelector = ({ locationName, setShowLocationModal, t }) => {
  const formatLocationName = (address) => {
    if (!address) return address;
    let formatted = address;
    formatted = formatted.replace(/[A-Z0-9]{4}\+[A-Z0-9]{2,3},?\s*/g, "");
    formatted = formatted.replace(/\b\d{6}\b,?\s*/g, "");
    formatted = formatted.replace(/\b\d+\b,?\s*/g, "");
    formatted = formatted.replace(/,\s*,/g, ",").replace(/^,\s*|,\s*$/g, "").trim();
    return formatted;
  };

  return (
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
  );
};

const SearchBar = ({ inputText, setInputText, isArabic, placeholders, isSearchFocused, setIsSearchFocused }) => (
  <div className="relative group">
    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-300 transition-colors z-10" />
    <input
      disabled
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
);

const DesktopMenu = ({ i18n, navigate, currentLocation, cartItems, handleClick, t }) => (
  <div className="hidden md:flex items-center space-x-2 lg:space-x-4 flex-shrink-0">
    {/* Lang toggle */}
    <motion.button
      onClick={() => {
        const nextLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang);
        localStorage.setItem("language", nextLang);
        // window.location.reload();
      }}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-semibold rounded-sm bg-white/10 hover:bg-white/20 transition-all duration-200 group text-white"
    >
      {i18n.language === "en" ? "AR" : "EN"}
    </motion.button>

    {/* Wishlist */}
    <motion.div
      onClick={() => navigate("/wishlist")}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
        currentLocation.pathname === "/wishlist" ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
      }`}
    >
      <FiHeart
        className={`transition-colors ${
          currentLocation.pathname === "/wishlist" ? "text-red-400" : "text-red-300 group-hover:text-red-200"
        }`}
      />
      <span className="text-sm font-medium text-white hidden lg:block">{t("wishlist")}</span>
    </motion.div>

    {/* Cart */}
    <motion.div
      onClick={() => navigate("/cart")}
      className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
        currentLocation.pathname === "/cart" ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
      }`}
    >
      <HiOutlineShoppingCart
        className={`transition-colors text-lg ${
          currentLocation.pathname === "/cart" ? "text-green-400" : "text-green-300 group-hover:text-green-200"
        }`}
      />
      <span className="text-sm font-medium text-white hidden lg:block">{t("cart")}</span>
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 z-20">
          {cartItems.length}
        </span>
      )}
    </motion.div>

    {/* Profile */}
    <motion.div
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer group ${
        currentLocation.pathname === "/auth" || currentLocation.pathname === "/profile"
          ? "bg-white/20"
          : "bg-white/10 hover:bg-white/15"
      }`}
      onClick={handleClick}
    >
      <FiUser
        className={`transition-colors ${
          currentLocation.pathname === "/auth" || currentLocation.pathname === "/profile"
            ? "text-blue-400"
            : "text-blue-300 group-hover:text-blue-200"
        }`}
      />
      <span className="text-sm font-medium text-white hidden lg:block">{t("profile")}</span>
    </motion.div>
  </div>
);

const MobileMenu = ({ menuOpen, setMenuOpen, navigate, handleClick, i18n, t, currentLocation }) => (
  <AnimatePresence>
  {menuOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 right-0 bg-gradient-to-br from-gray-900/95 to-black/90 
                   backdrop-blur-2xl shadow-2xl rounded-b-3xl z-50 md:hidden border-b border-gray-700"
      >
        <div className="px-6 py-6 space-y-4">
          {/* Close */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Menu</h3>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-full 
                         bg-gray-800 hover:bg-gray-700 text-gray-300 cursor-pointer shadow-lg"
              onClick={() => setMenuOpen(false)}
            >
              <FiX className="text-base" />
            </motion.div>
          </div>

          {/* Wishlist */}
          <motion.div
            onClick={() => { navigate("/wishlist"); setMenuOpen(false); }}
            className={`flex items-center space-x-3 cursor-pointer rounded-xl px-4 py-3 
                        transition-all duration-200 group ${
              currentLocation.pathname === "/wishlist"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            <FiHeart
              className={`text-lg transition-colors ${
                currentLocation.pathname === "/wishlist"
                  ? "text-red-400"
                  : "text-red-500 group-hover:text-red-400"
              }`}
            />
            <span className="font-medium">{t("wishlist")}</span>
          </motion.div>

          {/* Cart */}
          <motion.div
            onClick={() => { navigate("/cart"); setMenuOpen(false); }}
            className={`flex items-center space-x-3 cursor-pointer rounded-xl px-4 py-3 
                        transition-all duration-200 group ${
              currentLocation.pathname === "/cart"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            <HiOutlineShoppingCart
              className={`text-lg transition-colors ${
                currentLocation.pathname === "/cart"
                  ? "text-green-400"
                  : "text-green-500 group-hover:text-green-400"
              }`}
            />
            <span className="font-medium">{t("cart")}</span>
          </motion.div>

          {/* Profile */}
          <motion.div
            onClick={() => { handleClick(); setMenuOpen(false); }}
            className={`flex items-center space-x-3 cursor-pointer rounded-xl px-4 py-3 
                        transition-all duration-200 group ${
              currentLocation.pathname === "/auth" || currentLocation.pathname === "/profile"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            <FiUser
              className={`text-lg transition-colors ${
                currentLocation.pathname === "/auth" || currentLocation.pathname === "/profile"
                  ? "text-blue-400"
                  : "text-blue-500 group-hover:text-blue-400"
              }`}
            />
            <span className="font-medium">{t("profile")}</span>
          </motion.div>

          {/* Lang switch */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const nextLang = i18n.language === "en" ? "ar" : "en";
              i18n.changeLanguage(nextLang);
              localStorage.setItem("language", nextLang);
            //   window.location.reload();
            }}
            className="relative w-full py-3 px-6 rounded-xl bg-gradient-to-r from-gray-700 to-gray-800 
                       text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300
                       overflow-hidden group border border-gray-600"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              key={i18n.language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex items-center justify-center gap-2"
            >
              <motion.span
                animate={{ rotate: i18n.language === "en" ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-sm"
              >
                🌐
              </motion.span>
              {i18n.language === "en" ? "العربية" : "English"}
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

);


// ------------------- Main Component -------------------

export default function TopBar() {
  const EXPIRY_DURATION = 1000 * 60 * 20;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [addressExpiry, setAddressExpiry] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserModal, setShowUserMOdal] = useState(false);
  const [showUserReminderModal, setShowUserReminderModal] = useState(false);

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const dispatch = useDispatch();

  const { data: user } = useCurrentUser();
  const { data: cartItems = [] } = useCartItems(user?.id || "");
  const { location, locationName } = useSelector((state) => state.user);

  const isArabic = i18n.language === "ar";
  const placeholders = [
    t("placeholder.search"),
    t("placeholder.hungry"),
    t("placeholder.ride"),
    t("placeholder.essentials"),
    t("placeholder.hotels"),
    t("placeholder.groceries"),
  ];

  const handleClick = () => {
    if (auth.currentUser) setShowUserMOdal(true);
    else navigate("/auth");
  };

  // Effects (auth reminder, scroll, debounce etc) -- same as before
  useEffect(() => {
    const showModalIfNotLoggedIn = () => {
      if (!auth.currentUser) setShowUserReminderModal(true);
    };
    timeoutRef.current = setTimeout(() => {
      showModalIfNotLoggedIn();
      intervalRef.current = setInterval(showModalIfNotLoggedIn, 1000 * 60 * 3);
    }, 1000 * 60 * 1);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserID(user.uid));
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
    const checkLocation = async () => {
      const address = await localforage.getItem("userAddress");
      const location = await localforage.getItem("userLocation");
      if (!address || !location) setShowLocationModal(true);
    };
    checkLocation();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedInput(inputText), 400);
    return () => clearTimeout(handler);
  }, [inputText]);

  return (
    <>
      <motion.div
        className={`sticky top-0 left-0 w-full z-50 px-4 lg:px-6 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(24,24,27,0.95)] backdrop-blur-md shadow-lg border-b border-white/10"
            : "bg-[rgba(24,24,27,0.95)] backdrop-blur-sm"
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0 w-full md:w-auto justify-between md:justify-start">
          <Logo navigate={navigate} />
          <LocationSelector locationName={locationName} setShowLocationModal={setShowLocationModal} t={t} />
          {/* Mobile user icon */}
          <motion.div className="md:hidden ml-auto">
            <motion.div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <FiUser className="text-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="w-full md:flex-1 min-w-0 max-w-full md:max-w-4xl lg:max-w-5xl">
          <SearchBar
            inputText={inputText}
            setInputText={setInputText}
            isArabic={isArabic}
            placeholders={placeholders}
            isSearchFocused={isSearchFocused}
            setIsSearchFocused={setIsSearchFocused}
          />
        </div>

        {/* Desktop menu */}
        <DesktopMenu
          i18n={i18n}
          navigate={navigate}
          currentLocation={currentLocation}
          cartItems={cartItems}
          handleClick={handleClick}
          t={t}
        />
      </motion.div>

      {/* Mobile menu */}
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
        handleClick={handleClick}
        i18n={i18n}
        t={t}
        currentLocation={currentLocation}
      />

      {/* Modals */}
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
