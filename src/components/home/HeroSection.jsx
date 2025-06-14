/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden w-full -z-10">
      {/* Background Image */}
      <img
        src="/demo/heroLarge.jpg"
        className="absolute w-full rounded-b-m h-full object-cover object-center"
        alt="Discount Background"
        loading="lazy"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 transition duration-300" />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          OnTrend
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg sm:text-xl max-w-2xl"
        >
          Discover trusted services in <span className="font-semibold">Food</span>, <span className="font-semibold">Grocery</span>, <span className="font-semibold">Health & Beauty</span>, <span className="font-semibold">E-Shop</span>, <span className="font-semibold">Rent a Car</span>, and <span className="font-semibold">Hotel & Apartments</span>.
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
