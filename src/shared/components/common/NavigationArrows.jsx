/* eslint-disable no-unused-vars */
import React from 'react'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const NavigationArrows = ({preClass,nextClass,title}) => {
  return (
     <div className="flex items-center justify-between mb-4 px-2">
                {/* Left Title with Arrow */}
                <div className="group flex items-center text-gray-800 text-xl font-medium transition-all duration-300 cursor-pointer">
                    <h2 className="mr-2 ">{title}</h2>

                    {/* Chevron icon wrapper (no hover translate here) */}
                    <div className="backdrop-blur-md bg-onRed  rounded-full shadow p-0.9  group-hover:text-primary transition-transform duration-300  transform group-hover:translate-x-1">
                        <FiChevronRight size={18} className="text-white " />
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="md:flex items-center gap-2  hidden">
                    <motion.button
                        className={`${preClass}  bg-white p-2 rounded-full shadow cursor-pointer`}
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 600, damping: 40 }}
                    >
                        <FiChevronLeft size={14} />
                    </motion.button>

                    <motion.button
                        className={`${nextClass} bg-white p-2 rounded-full shadow cursor-pointer`}
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 600, damping: 40 }}
                    >
                        <FiChevronRight size={14} />
                    </motion.button>
                </div>
            </div>
  )
}

export default NavigationArrows
