"use client";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MarqueeMessage = ({ offers }) => {
  // Ensure there's at least one offer
  const offerList = offers.length ? offers : ["Special Offer!"];

  // Repeat offers with spacing and dots for seamless scrolling
  const repeatedText = Array(4) // repeat enough times for smooth scrolling
    .fill(offerList.join("  •  "))
    .join("  •  ");

  return (
    <div style={{
      backgroundColor: "red",
      color: "white",
      overflow: "hidden",
      whiteSpace: "nowrap",
      padding: "10px 0",
      fontWeight: "bold",
      fontSize: "16px"
    }}>
      <motion.div
        style={{ display: "inline-block" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
};

export default MarqueeMessage;
