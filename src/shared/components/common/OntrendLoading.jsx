import React from 'react';
import { motion } from 'framer-motion';

const OntrendLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.img
        src="/ONtrend-logo.png"
        alt="Loading Logo"
        className="w-20 h-20"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default OntrendLoading;
