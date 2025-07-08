/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FooterBottom from "@/components/Footer/FooterBottom";
import FooterMiddle from "@/components/Footer/FooterMiddle";
import FooterAbove from "@/components/Footer/FooterAbove";

const ONTRENDFooter = () => {
    return (
        <footer className="bg-[#1a1a1a] mt-4">
            <AnimatePresence>
                <FooterAbove />
                <FooterMiddle />
                <FooterBottom />
            </AnimatePresence>
        </footer>
    );
};

export default ONTRENDFooter;
