/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import FooterConnectEmail from "./FooterConnectEmail";

const footerItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const FooterMiddle = () => {
    return (
        <div className=" text-white px-6 md:px-10 py-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-sm">
                {/* Brand & Legal */}
                <motion.div
                    className="space-y-3"
                    variants={footerItemVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-xl font-semibold">ONtrend</h2>
                    <p className="text-white/50">©2024 ONtrend · Oman</p>
                    <div className="space-x-4 text-white/50">
                        <a href="#" className="hover:text-white">
                            Terms
                        </a>
                        <a href="#" className="hover:text-white">
                            Privacy
                        </a>
                    </div>
                </motion.div>

                {/* Email Connect */}
                <motion.div variants={footerItemVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <FooterConnectEmail />
                </motion.div>

                {/* Products */}
                <motion.div
                    className="space-y-2"
                    variants={footerItemVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <p className="font-semibold text-white/60 mb-2">Products</p>
                    {["Product", "Pricing", "Log in", "Request access", "Partnerships"].map((item) => (
                        <a key={item} href="#" className="block text-white/80 hover:text-white transition">
                            {item}
                        </a>
                    ))}
                </motion.div>

                {/* About Us */}
                <motion.div
                    className="space-y-2"
                    variants={footerItemVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <p className="font-semibold text-white/60 mb-2">About Us</p>
                    {["About ONtrend", "Contact us", "Features", "Careers"].map((item) => (
                        <a key={item} href="#" className="block text-white/80 hover:text-white transition">
                            {item}
                        </a>
                    ))}
                </motion.div>

                {/* Social & Contact */}
                <motion.div
                    className="space-y-3"
                    variants={footerItemVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <p className="font-semibold text-white/60">Get in touch</p>
                    <p className="text-white/50">
                        Questions or feedback? <br />
                        We’d love to hear from you.
                    </p>
                    <div className="flex space-x-4 text-white/50">
                        {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
                            <a key={idx} href="#" className="hover:text-white transition">
                                <Icon />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FooterMiddle;
