import React, { useState } from 'react';
import { Link as LinkR } from 'react-router-dom';
import { DiCssdeck } from 'react-icons/di';
import { FaBars, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full z-50 flex justify-center pt-6 px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-full max-w-5xl bg-card border border-gray-700 rounded-2xl px-6 py-3 flex justify-between items-center"
      >
        <LinkR to='/' className="flex items-center gap-2 text-white cursor-pointer">
          <DiCssdeck size="2.5rem" className="text-primary" />
          <span className="font-display font-bold text-xl tracking-wide">Portfolio</span>
        </LinkR>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.05 }}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-text_secondary font-medium text-sm hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop Socials */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.1, rotate: 10 }}
            href="https://www.linkedin.com/in/karthiga-m-8a1216291"
            target="_blank"
            className="text-text_secondary hover:text-primary text-2xl transition-colors"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/karthiga817"
            target="_blank"
            className="px-4 py-2 rounded-full border border-primary/50 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300"
          >
            Github
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden text-2xl cursor-pointer text-text_primary" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-20 left-0 right-0 mx-4 p-6 bento-card flex flex-col gap-4 z-50"
            >
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-text_primary font-medium text-lg text-center py-2 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex justify-center gap-6 mt-4">
                <a href="https://www.linkedin.com/in/karthiga-m-8a1216291" target="_blank" className="text-primary text-3xl">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/karthiga817" target="_blank" className="px-6 py-2 bg-primary text-white rounded-full font-medium">
                  Github
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;
