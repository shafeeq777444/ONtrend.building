/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FiMapPin, FiSearch, FiChevronDown, FiUser, FiHeart, FiX } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import { setLocation, setLocationName, setUserID } from "../../slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    return (
        <>
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`sticky top-0 left-0 w-full z-50 px-4 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 transition-all duration-300 ${
                    scrolled
                        ? "bg-[rgba(24,24,27,0.95)] backdrop-blur-md shadow-md"
                        : "bg-[rgba(24,24,27,0.95)] backdrop-blur-sm"
                }`}
            >
                <div className="flex items-center gap-4 flex-shrink-0 w-full md:w-auto justify-between md:justify-start">
                    <img
                        onClick={() => navigate("/")}
                        src="/ONtrend-logo.png"
                        alt="Company Logo"
                        className="w-8 h-8 object-contain cursor-pointer"
                    />

                    <div
                        className="flex items-center space-x-2 text-white cursor-pointer hover:bg-white/10 rounded-md px-2 py-1 transition"
                        onClick={() => setShowLocationModal(true)}
                    >
                        <FiMapPin className="text-red-200" />
                        <span className="text-xs md:text-sm truncate max-w-[100px] md:max-w-none">
                            {locationName || t("tap_to_set_location")}
                        </span>
                        <FiChevronDown />
                    </div>

                    <div className="md:hidden ml-auto text-white text-xl">
                        {menuOpen ? (
                            <FiX
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                                className="cursor-pointer"
                            />
                        ) : (
                            <FiUser
                                onClick={() => {
                                    setMenuOpen(true);
                                }}
                                className="cursor-pointer"
                            />
                        )}
                    </div>
                </div>

                <div className="w-full md:flex-1 min-w-0 max-w-full md:max-w-3xl">
                    <div className="relative">
                        {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                        <input
                            disabled={true}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-8 pl-9 pr-3 py-0 text-white text-sm leading-none 

                            rounded-md focus:outline-none"
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

                <div className="hidden md:flex items-center space-x-3 text-white shrink-0">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        onClick={() => {
                            const nextLang = i18n.language === "en" ? "ar" : "en";
                            i18n.changeLanguage(nextLang);
                            document.documentElement.dir = nextLang === "ar" ? "rtl" : "ltr";
                            window.location.reload();
                        }}
                        className="w-10 h-10 text-sm font-semibold flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white"
                        title="Toggle Language"
                    >
                        {i18n.language === "en" ? "AR" : "EN"}
                    </motion.button>
                    {[
                        // { Icon: <PiGiftBold />, title: "Rewards" },
                        { Icon: <FiHeart />, title: "Wishlist" },
                    ].map(({ Icon, title }, idx) => (
                        <motion.div
                            onClick={() => navigate(title.toLowerCase())}
                            key={idx}
                            whileHover={{ scale: 1.04 }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                            title={title}
                        >
                            {Icon}
                        </motion.div>
                    ))}
                    <motion.div
                        onClick={() => navigate("/cart")}
                        whileHover={{ scale: 1.04 }}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                        title="Cart"
                    >
                        <HiOutlineShoppingCart className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                                {/* {cartCount} */}
                                &nbsp;
                            </span>
                        )}
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                        title="Profile"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        <FiUser />
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-20 right-0 w-3/4 h-screen bg-white z-40 shadow-lg p-6 flex flex-col space-y-6"
                    >
                        {menuItems.map(({ label, icon, onClick }, i) => (
                            <div
                                key={i}
                                className="flex items-center space-x-3 text-gray-800 text-lg cursor-pointer"
                                onClick={() => {
                                    onClick();
                                    setMenuOpen(false);
                                }}
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800">
                                    {icon}
                                </div>
                                <span>{label}</span>
                            </div>
                        ))}
                    </motion.div>
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
