import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaTrophy } from 'react-icons/fa';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const achCollectionRef = collection(db, "achievements");
                const data = await getDocs(achCollectionRef);
                const achList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAchievements(achList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching achievements:', error);
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    return (
        <div id="achievements" className="flex flex-col justify-center relative z-10 items-center py-20">
            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center font-display font-bold text-white mt-5 md:mt-3"
                >
                    Achievements
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center max-w-xl text-text_secondary mb-10"
                >
                    My awards and recognitions.
                </motion.p>

                {loading ? (
                    <div className="text-text_secondary">Loading achievements...</div>
                ) : achievements.length === 0 ? (
                    <div className="text-text_secondary">No achievements added yet.</div>
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        {achievements.map((ach, index) => (
                            <motion.div
                                key={ach.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="bg-card border border-gray-700 rounded-2xl p-6 flex flex-col gap-3"
                            >
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-white">{ach.title}</h3>
                                    <FaTrophy className="text-primary text-2xl" />
                                </div>
                                <p className="text-text_secondary text-sm">{ach.description}</p>
                                <p className="text-text_secondary/80 text-xs">{ach.date}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;
