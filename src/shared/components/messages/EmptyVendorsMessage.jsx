/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Bell, RotateCcw } from "lucide-react";
import useOnlineStatus from "@/shared/hooks/useOnlineStatus";

const offlineMessages = [
  "Oops! Your connection seems to be down.",
  "Can't reach the server. Check your internet.",
  "No network detected. Try reconnecting.",
  "Internet is off. Refresh to try again.",
];

const EmptyVendorsMessage = () => {
  const isOnline = useOnlineStatus();

  // Pick a random offline message
  const randomOfflineMessage =
    offlineMessages[Math.floor(Math.random() * offlineMessages.length)];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        {/* Animation Container */}
        <div className="relative mb-4">
          <div className="w-64 h-64 mx-auto">
            <DotLottieReact
              src="/lotties/errorOrWarnings/notDelivey.json"
              autoplay
              loop
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {!isOnline ? "Network Issue" : "Service Not Available"}
          </h2>

          <p className="text-gray-600 text-base leading-relaxed px-4">
            {!isOnline
              ? randomOfflineMessage
              : "We're not delivering to your area yet, but we're working hard to expand our reach."}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={!isOnline ? () => window.location.reload() : undefined}
            className={`inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              !isOnline
                ? "bg-gradient-to-r from-blue-500 to-blue-600 focus:ring-blue-500"
                : "bg-gradient-to-r from-orange-500 to-red-500 focus:ring-orange-500"
            }`}
          >
            {!isOnline ? (
              <>
                <RotateCcw className="w-4 h-4" />
                Reload Page
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                Notify When Available
              </>
            )}
          </motion.button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          {!isOnline
            ? "Check your connection and try again"
            : "Join thousands waiting for Ontrend in their area"}
        </p>
      </motion.div>
    </div>
  );
};

export default EmptyVendorsMessage;
