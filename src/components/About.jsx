import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div id="about" className="flex flex-col justify-center items-center relative z-10 py-20">
            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center font-display font-bold text-white mt-5 md:mt-3"
                >
                    About Me
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center max-w-2xl text-text_secondary mb-10 leading-relaxed"
                >
                    I am a passionate developer with a strong foundation in web technologies.
                    I love creating efficient, scalable, and beautiful applications that solve real-world problems.
                    With expertise in modern frameworks and a keen eye for design, I bring ideas to life through code.
                </motion.p>
            </div>
        </div>
    );
};

export default About;
