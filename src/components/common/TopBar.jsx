/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { FiMapPin, FiSearch, FiChevronDown, FiUser, FiHeart, FiX } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiGiftBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localforage from "localforage";
import { setLocation, setLocationName } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeliveryLocation from "../Location/DeliveryLocation";

export default function TopBar({ cartCount = 2 }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { location, locationName } = useSelector((state) => state.user);

    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);

    const placeholders = [
        "Search for food, groceries, beauty, hotels...",
        "Hungry? Find yummy food or your favorite spot",
        "Need a ride? Try car rentals nearby",
        "Shop essentials from our E-Store",
        "Book hotels or apartments for your stay",
        "Find daily needs & fresh groceries",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
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

    return (
        <>
            {/* Top Bar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`fixed top-0 left-0 w-full z-50 px-4 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 transition-all duration-300 ${
                    scrolled
                        ? "bg-[rgba(24,24,27,0.95)] backdrop-blur-md shadow-md"
                        : "bg-[rgba(24,24,27,0.95)] backdrop-blur-sm"
                }`}
            >
                {/* Logo + Location + Mobile Menu */}
                <div className="flex items-center gap-4 flex-shrink-0 w-full md:w-auto justify-between md:justify-start">
                    {/* Logo */}
                    <img
                        onClick={() => navigate("/")}
                        src="/ONtrend-logo.png"
                        alt="Company Logo"
                        className="w-8 h-8 object-contain cursor-pointer"
                    />

                    {/* Location (visible on all screens) */}
                    <div
                        className="flex items-center space-x-2 text-white cursor-pointer"
                        onClick={() => setShowLocationModal(true)}
                    >
                        <FiMapPin className="text-red-200" />
                        <span className="text-xs md:text-sm truncate max-w-[100px] md:max-w-none">
                            {locationName || "Tap to set location"}
                        </span>
                        <FiChevronDown />
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden ml-auto text-white text-xl">
                        {menuOpen ? (
                            <FiX onClick={() => setMenuOpen(false)} className="cursor-pointer" />
                        ) : (
                            <FiUser onClick={() => setMenuOpen(true)} className="cursor-pointer" />
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="w-full md:flex-1 min-w-0 max-w-full md:max-w-3xl">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-9 pr-3 py-1.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder=""
                        />
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none text-sm text-gray-400">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={placeholderIndex}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {placeholders[placeholderIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-3 text-white shrink-0">
                    {[
                        { Icon: <PiGiftBold />, title: "Rewards" },
                        { Icon: <FiHeart />, title: "Wishlist" },
                    ].map(({ Icon, title }, idx) => (
                        <motion.div
                            onClick={() => {
                                navigate(title.toLowerCase());
                            }}
                            key={idx}
                            whileHover={{ scale: 1.04 }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                            title={title}
                        >
                            {Icon}
                        </motion.div>
                    ))}

                    {/* Cart */}
                    <motion.div
                    onClick={()=>{
                        navigate('/cart')
                    }}
                        whileHover={{ scale: 1.04 }}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                        title="Cart"
                    >
                        <HiOutlineShoppingCart className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                                {cartCount}
                            </span>
                        )}
                    </motion.div>

                    {/* Profile */}
                    <motion.div
                        whileHover={{ scale: 1.04 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                        title="Profile"
                    >
                        <FiUser />
                    </motion.div>
                </div>
            </motion.div>

            {/* Mobile Slide-in Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-20 right-0 w-3/4 h-screen bg-white z-40 shadow-lg p-6 flex flex-col space-y-6"
                    >
                        {[
                            { Icon: <PiGiftBold />, label: "Rewards" },
                            { Icon: <FiHeart />, label: "Wishlist" },
                            { Icon: <HiOutlineShoppingCart />, label: "Cart" },
                            { Icon: <FiUser />, label: "Profile" },
                        ].map(({ Icon, label }, i) => (
                            <div
                                key={i}
                                className="flex items-center space-x-3 text-gray-800 text-lg cursor-pointer"
                                onClick={() => setMenuOpen(false)}
                            >
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-800">
                                    {Icon}
                                </div>
                                <span>{label}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Location Modal Triggered by Null or Manual Click */}
            {(!location || !locationName || showLocationModal) && (
                <DeliveryLocation closeModal={() => setShowLocationModal(false)} />
            )}
        </>
    );
}
