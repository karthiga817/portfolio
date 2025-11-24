import React from 'react';
import { motion } from 'framer-motion';
import { DiCssdeck } from 'react-icons/di';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Bio } from '../data/constants';

const Footer = () => {
    return (
        <div className="w-full flex justify-center items-center flex-col gap-4 py-8 bg-[#0a0a0f] relative z-10 border-t border-white/10">
            <div className="w-full max-w-6xl flex flex-col gap-4 items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center text-primary font-display font-bold text-2xl"
                >
                    <DiCssdeck size="3rem" /> Portfolio
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex gap-6"
                >
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href={Bio.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text_secondary hover:text-primary text-2xl transition-colors"
                    >
                        <FaGithub />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        href={Bio.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text_secondary hover:text-primary text-2xl transition-colors"
                    >
                        <FaLinkedin />
                    </motion.a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm text-text_secondary text-center mt-4"
                >
                    © 2025 {Bio.name}. All rights reserved.
                </motion.div>
            </div>
        </div>
    );
};

export default Footer;
