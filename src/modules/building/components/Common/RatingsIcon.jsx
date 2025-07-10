import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai"; // You can change to any other star icon

const RatingIcon = ({ rating = 4.5 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center relative"
    >
      {/* <img src="/extras/shield2.png" className="text-yellow-400 text-xl " /> */}
      <img src="/extras/winner.png" className="text-yellow-400 w-50 " />
      <span className="text-7xl relative bottom-8  text-black font-semibold ">{rating}</span>
    </motion.div>
  );
};
export default RatingIcon