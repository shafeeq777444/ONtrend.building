/* eslint-disable no-unused-vars */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FooterBottom from "@/shared/components/Footer/FooterBottom";
import FooterMiddle from "@/shared/components/Footer/FooterMiddle";
import FooterAbove from "@/shared/components/Footer/FooterAbove";

const ONTRENDFooter = () => {
    return (

            <footer className="bg-[#1a1a1a] ">
                <AnimatePresence>
                    <FooterAbove />
                    <FooterMiddle />
                    <FooterBottom />
                </AnimatePresence>
            </footer>

    );
};

export default ONTRENDFooter;
