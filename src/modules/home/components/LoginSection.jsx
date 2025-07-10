/* eslint-disable no-unused-vars */
import { FaGoogle, FaApple, FaFacebookF, FaPhone, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginSection = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  const loginOptions = [
    { icon: <FaGoogle />, label: isArabic ? "جوجل" : "Google" },
    { icon: <FaApple />, label: isArabic ? "أبل" : "Apple" },
    { icon: <FaFacebookF />, label: isArabic ? "فيسبوك" : "Facebook" },
    { icon: <FaPhone />, label: isArabic ? "الهاتف" : "Phone" },
    { icon: <FaEnvelope />, label: isArabic ? "البريد" : "Email" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 bg-white rounded-xl m-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Header Text */}
        <div className="text-center md:text-left max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {isArabic ? "مرحباً بك!" : "Howdy there, welcome back!"}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {isArabic
              ? "سجّل الدخول للاستمتاع بتجربة مخصصة وسلسة لك."
              : "Log in to unlock a personalized and seamless experience made just for you."}
          </p>
        </div>

        {/* Login Options */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {loginOptions.map((option, index) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              key={index}
              onClick={() => navigate("/auth")}
              className="flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-lg bg-[#fe3031] hover:bg-[#e02829] text-white transition-all duration-200"
            >
              <div className="text-sm md:text-lg">{option.icon}</div>
              <span className="hidden md:block text-[10px] mt-1">{option.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginSection;
