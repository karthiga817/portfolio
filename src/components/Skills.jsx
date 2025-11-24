import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const skillsCollectionRef = collection(db, "skills");
                const data = await getDocs(skillsCollectionRef);
                const skillsList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setSkills(skillsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching skills:', error);
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const category = skill.category || 'Others';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {});

    // Define category order
    const categoryOrder = ['Technical Skills', 'Frameworks', 'Others'];

    return (
        <div id="skills" className="flex flex-col justify-center relative z-10 items-center py-20">
            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center font-bold text-white mt-5 md:mt-3"
                >
                    Skills
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center max-w-xl text-text_secondary mb-10"
                >
                    Here are some of my skills on which I have been working on for the past 2 years.
                </motion.p>

                {loading ? (
                    <div className="text-text_secondary">Loading skills...</div>
                ) : skills.length === 0 ? (
                    <div className="text-text_secondary">No skills added yet. Add some from the admin panel!</div>
                ) : (
                    <div className="w-full flex flex-wrap justify-center gap-8">
                        {categoryOrder.map((categoryName) => {
                            const categorySkills = groupedSkills[categoryName];
                            if (!categorySkills || categorySkills.length === 0) return null;

                            return (
                                <motion.div
                                    key={categoryName}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ y: -5 }}
                                    className="w-full max-w-[500px] bg-card border border-gray-700 rounded-2xl p-8 md:p-9 transition-all duration-300 hover:border-primary"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                        {categoryName}
                                    </h3>
                                    <div className="flex justify-center flex-wrap gap-3">
                                        {categorySkills.map((skill) => (
                                            <motion.div
                                                key={skill.id}
                                                whileHover={{ scale: 1.1, y: -3 }}
                                                className="text-base font-normal text-text_primary border border-gray-700 rounded-xl px-4 py-3 flex items-center justify-center gap-2 bg-card_light hover:border-primary transition-all duration-300 cursor-pointer"
                                            >
                                                <img src={skill.image} alt={skill.name} className="w-6 h-6 object-contain" />
                                                {skill.name}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Skills;
