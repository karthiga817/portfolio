import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Bio } from '../data/constants';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Hero = () => {
    const [profile, setProfile] = useState({ resumeUrl: Bio.resume, profileImgUrl: '' });
    const [showResume, setShowResume] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, 'profile', 'info');
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    const data = snap.data();
                    setProfile(prev => ({
                        ...prev,
                        resumeUrl: data.resumeUrl || Bio.resume,
                        profileImgUrl: data.profileImgUrl || Bio.profileImg
                    }));
                }
            } catch (e) {
                console.error('Error fetching profile for Hero:', e);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div id="about" className="relative w-full min-h-[90vh] py-20 px-4 flex justify-center items-center">
            <div className="relative w-full max-w-7xl flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                {/* Left Side - Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex flex-col gap-6"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Hi, I am <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            {Bio.name}
                        </span>
                    </h1>

                    <div className="text-xl md:text-2xl font-medium text-text_primary flex gap-2 items-center flex-wrap">
                        I am a
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold">
                            <TypeAnimation
                                sequence={Bio.roles.flatMap(role => [role, 2000])}
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                    </div>

                    <p className="text-text_secondary text-lg leading-relaxed">
                        {Bio.description}
                    </p>

                    <div className="flex gap-4 flex-wrap mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowResume(true)}
                            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-bold text-lg shadow-lg transition-all"
                        >
                            Check Resume
                        </motion.button>
                    </div>
                </motion.div>

                {/* Right Side - Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 flex justify-center items-center"
                >
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-2xl" />
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={profile.profileImgUrl || 'https://via.placeholder.com/400?text=Profile+Image'}
                            alt="Profile"
                            className="relative w-full h-full object-cover rounded-full border-4 border-primary shadow-2xl transition-all duration-500"
                        />
                    </div>
                </motion.div>
            </div>
            {/* Resume Modal */}
            {showResume && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setShowResume(false)}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="bg-background rounded-lg overflow-hidden w-11/12 max-w-3xl h-5/6"
                        onClick={e => e.stopPropagation()}
                    >
                        <iframe src={profile.resumeUrl} className="w-full h-full" title="Resume" />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Hero;
