import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { handleGoogleLogin } from "@/firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SlideInLoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return toast.error("Enter email and password");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const userSnap = await getDoc(doc(db, "users", uid));

      if (userSnap.exists()) {
        const user = userSnap.data();
        if (user.number && user.nationality) {
          toast.success("Welcome back!");
          navigate("/");
        } else {
          toast("Complete signup details");
          navigate("/auth/credential");
        }
        onClose();
      } else {
        toast.error("User not found");
      }
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centered Popup Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 w-full max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 shadow-xl rounded-xl p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/ONtrend-logo.png" alt="Logo" className="w-16 h-16" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-semibold text-center mb-2">Login to Continue</h2>
            <p className="text-sm text-center text-gray-500 mb-6">
              Quick access to your cravings, now simpler.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right text-sm text-red-500 cursor-pointer">
                Forgot Password?
              </div>

              <button
                className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
                onClick={handleLogin}
              >
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Login */}
            <button
              onClick={() => handleGoogleLogin({ navigate, toast })}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-full hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </button>

            {/* Sign Up Redirect */}
            <p className="text-center text-sm mt-6">
              Don't have an account?{" "}
              <span
                className="text-red-500 font-semibold cursor-pointer"
                onClick={() => {
                  onClose();
                  navigate("/auth/signup");
                }}
              >
                Sign Up
              </span>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideInLoginModal;
