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

  // Lock scrolling when modal is open
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.marginRight = "";
    };
  }, []);

  if (isLoading) return null;
  if (isError) return <p className="text-red-500">Failed to load profile</p>;

  return (
   <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setShowUserMOdal(false)}
      />

      {/* Sidebar Modal */}
      <motion.div
        dir={isArabic ? "rtl" : "ltr"}
        className="fixed top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
        initial={{ x: isArabic ? "-100%" : "100%", opacity: 0 }}   // Enter from left (ar) or right (en)
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: isArabic ? "-100%" : "100%", opacity: 0 }}       // Exit back same side
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
        style={{ [isArabic ? "left" : "right"]: 0 }} // Stick to correct side
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">
            {isArabic ? "الملف الشخصي" : "Profile"}
          </h2>
          <button
            onClick={() => setShowUserMOdal(false)}
            className="p-1 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            ✕
          </button>
        </div>

        {/* Profile Header */}
        <div
          className={`p-6 flex flex-col items-center text-center ${
            isArabic ? "text-right" : ""
          }`}
        >
          {userData?.profileImageUrl && (
            <img
              src={userData?.profileImageUrl}
              alt="Profile"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/extras/user.png";
              }}
              className="w-20 h-20 rounded-full border-4 border-gray-200 object-cover shadow mb-4"
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

          {/* Sign out */}
          <button
            onClick={() => setShowLogoutConfirmation(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <FiLogOut />
            {isArabic ? "تسجيل خروج" : "Sign out"}
          </button>
        </div>

        {/* User Info Fields */}
        <div className={`p-6 space-y-4 text-sm ${isArabic ? "text-right" : ""}`}>
          {[
            { label: isArabic ? "الاسم الأول" : "First Name", value: userData.firstName },
            { label: isArabic ? "اسم العائلة" : "Last Name", value: userData.lastName },
            { label: isArabic ? "البريد الإلكتروني" : "Email", value: userData.email },
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-gray-600 mb-2">{field.label}</label>
              <input
                type="text"
                value={field.value}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600 mb-2">
              {isArabic ? "اسم المستخدم" : "Username"}
            </label>
            <div className="flex items-center w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200">
              <span className="text-gray-400">@</span>
              <span className="mx-1 text-black">{userData.firstName}</span>
              <span className="ml-auto text-green-500">✔</span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div
            className={`flex gap-3 pt-6 border-t mt-6 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <button
              className="flex-1 px-4 py-3 rounded-lg border text-sm hover:bg-gray-100 transition"
              onClick={() => setShowUserMOdal(false)}
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
        description={
          isArabic
            ? "هل أنت متأكد من أنك تريد تسجيل الخروج؟"
            : "Are you sure you want to sign out?"
        }
        closeText={isArabic ? "إلغاء" : "Cancel"}
        actionText={isArabic ? "تسجيل خروج" : "Sign Out"}
      />
</>
  );
};

export default UserProfileModal;
