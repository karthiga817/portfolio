import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const expCollectionRef = collection(db, "experience");
                const data = await getDocs(expCollectionRef);
                const expList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setExperiences(expList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching experiences:', error);
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    return (
        <div id="experience" className="flex flex-col justify-center relative z-10 items-center py-20">
            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center font-bold text-white mt-5 md:mt-3"
                >
                    Experience
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center max-w-xl text-text_secondary mb-10"
                >
                    My work experience as a developer working on different companies and projects.
                </motion.p>
                {loading ? (
                    <div className="text-text_secondary">Loading experience...</div>
                ) : experiences.length === 0 ? (
                    <div className="text-text_secondary">No experience entries yet. Add some from the admin panel!</div>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-6">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="w-full max-w-[800px] bg-card border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-primary"
                            >
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                        <FaBriefcase className="text-white text-2xl" />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-start flex-wrap gap-2">
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-white">{exp.role}</div>
                                                <div className="text-base font-medium text-primary mt-1">{exp.company}</div>
                                            </div>
                                            <div className="text-sm font-normal text-text_secondary">
                                                {exp.duration}<br />{exp.location}
                                            </div>
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            {exp.description && exp.description.map((desc, idx) => (
                                                <div key={idx} className="text-text_secondary text-sm flex gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span>{desc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Experience;
