/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { FiMapPin, FiSearch, FiChevronDown, FiUser, FiHeart, FiX } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiGiftBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBar({ place = "San Francisco", cartCount = 2 }) {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <>
            {/* TopBar */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`fixed  top-0 left-0 w-full z-50 md:h-18 px-4 py-2 flex flex-wrap items-center justify-between gap-3 md:gap-4 transition-all duration-300 ${
                    scrolled
                        ? "bg-[rgba(24,24,27,0.95)] backdrop-blur-md shadow-md"
                        : "bg-[rgba(24,24,27,0.31)] backdrop-blur-sm"
                }`}
            >
                {/* Left Section */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <div className="flex items-center space-x-1 text-sm font-medium text-white">
                        <FiMapPin className="text-red-200" />
                        <span>{place}</span>
                        <FiChevronDown />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden ml-auto text-white text-xl">
                        {menuOpen ? (
                            <FiX onClick={() => setMenuOpen(false)} className="cursor-pointer" />
                        ) : (
                            <FiUser onClick={() => setMenuOpen(true)} className="cursor-pointer" />
                        )}
                    </div>
                </div>

                {/* Search */}
                <div className="w-full md:flex-1 md:mx-2 bg-white rounded-md max-w-3xl">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder=""
                        />
                        {/* Animated Placeholder */}
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

                {/* Desktop Icons with Circle Backgrounds */}
                <div className="hidden md:flex items-center space-x-3">
                    {[
                        { Icon: <PiGiftBold />, title: "Rewards" },
                        { Icon: <FiHeart />, title: "Wishlist" },
                    ].map(({ Icon, title }, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white text-lg cursor-pointer"
                            title={title}
                        >
                            {Icon}
                        </motion.div>
                    ))}

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                        title="Cart"
                    >
                        <HiOutlineShoppingCart className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                                {cartCount}
                            </span>
                        )}
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
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
        </>
    );
}
