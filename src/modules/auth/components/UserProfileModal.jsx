/* eslint-disable no-unused-vars */
import useCurrentUser from "@/shared/services/queries/user.query";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import ReusableConfirmationModal from "@/shared/components/confirmationModals/ReusableConfirmationModal";


const UserProfileModal = ({ setShowUserMOdal }) => {
    const { data: userData, isLoading, isError } = useCurrentUser();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const isArabic = i18n.language === "ar";
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    useEffect(() => {
  // Get the width of the scrollbar
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Lock scrolling and add margin to compensate for scrollbar
  document.body.style.overflow = "hidden";
  document.body.style.marginRight = `${scrollbarWidth}px`;

  return () => {
    // Restore when modal closes
    document.body.style.overflow = "unset";
    document.body.style.marginRight = "0";
  };
}, []);
    

    if (isLoading) return null;
    if (isError) return <p className="text-red-500">Failed to load profile</p>;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={() => setShowUserMOdal(false)}
            />
            <motion.div
                dir={isArabic ? "rtl" : "ltr"}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ 
                    duration: 0.25, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: 0.2 }
                }}
            >
                    {/* Header with close button */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold">
                            {isArabic ? "الملف الشخصي" : "Profile"}
                        </h2>
                        <button
                            onClick={() => setShowUserMOdal(false)}
                            className="p-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Profile Header */}
                    <div className={`p-6 flex flex-col items-center text-center ${isArabic ? "text-right" : ""}`}>
                        {userData?.profileImageUrl && (
                            <img
                                src={userData?.profileImageUrl}
                                alt="Profile"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/extras/user.png";
                                }}
                                className="w-20 h-20 rounded-full border-4 border-gray-200 object-cover shadow-md mb-4"
                            />
                        )}
                        <div className="mb-4">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold">
                                    {userData.firstName} {userData.lastName}
                                </h3>
                                <FiCheckCircle className="text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-500">{userData.email}</p>
                            <p className="text-sm text-gray-500">{userData.nationality}</p>
                        </div>
                        {/* Sign out button */}
                        <button
                            onClick={() => setShowLogoutConfirmation(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <FiLogOut />
                            {isArabic ? "تسجيل خروج" : "Sign out"}
                        </button>
                    </div>



                    {/* Form section */}
                    <div className={`p-6 space-y-4 text-sm ${isArabic ? "text-right" : ""}`}>
                        <div>
                            <label className="block text-gray-600 mb-2">
                                {isArabic ? "الاسم الأول" : "First Name"}
                            </label>
                            <input
                                type="text"
                                value={userData.firstName}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-600 mb-2">{isArabic ? "اسم العائلة" : "Last Name"}</label>
                            <input
                                type="text"
                                value={userData.lastName}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">{isArabic ? "البريد الإلكتروني" : "Email"}</label>
                            <input
                                type="email"
                                value={userData.email}
                                readOnly
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">{isArabic ? "اسم المستخدم" : "Username"}</label>
                            <div className="flex items-center w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200">
                                <span className="text-gray-400">@</span>
                                <span className="mx-1 text-black">{userData.firstName}</span>
                                <span className="ml-auto text-green-500">✔</span>
                            </div>
                        </div>

                        <div className={`flex gap-3 pt-6 border-t mt-6 ${isArabic ? "flex-row-reverse" : ""}`}>
                            <button
                                className="flex-1 px-4 py-3 rounded-lg border text-sm hover:bg-gray-100 transition-colors"
                                onClick={() => {
                                    setShowUserMOdal(false);
                                }}
                            >
                                {isArabic ? "إلغاء" : "Close"}
                            </button>
                            <button
                                className="flex-1 px-4 py-3 rounded-lg bg-black text-white text-sm opacity-50 cursor-not-allowed"
                                disabled
                            >
                                {isArabic ? "تم" : "Edit"}
                            </button>
                        </div>
                    </div>
            </motion.div>
            
            {/* Logout Confirmation Modal */}
            <ReusableConfirmationModal
                isOpen={showLogoutConfirmation}
                onClose={() => setShowLogoutConfirmation(false)}
                onAction={() => {
                    signOut(auth)
                        .then(() => {
                            navigate("/auth");
                        })
                        .catch((error) => {
                            console.error("Sign out error:", error);
                        });
                }}
                title={isArabic ? "تسجيل الخروج" : "Sign Out"}
                description={isArabic ? "هل أنت متأكد من أنك تريد تسجيل الخروج؟" : "Are you sure you want to sign out?"}
                closeText={isArabic ? "إلغاء" : "Cancel"}
                actionText={isArabic ? "تسجيل خروج" : "Sign Out"}
            />
        </AnimatePresence>
    );
};

export default UserProfileModal;
