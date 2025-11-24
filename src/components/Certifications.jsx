import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaCertificate } from 'react-icons/fa';

const Certifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const certCollectionRef = collection(db, "certifications");
                const data = await getDocs(certCollectionRef);
                const certList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setCertifications(certList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching certifications:', error);
                setLoading(false);
            }
        };
        fetchCertifications();
    }, []);

    // Group by category
    const frontendCerts = certifications.filter(c => c.category === 'Frontend');
    const backendCerts = certifications.filter(c => c.category === 'Backend');
    const otherCerts = certifications.filter(c => c.category !== 'Frontend' && c.category !== 'Backend');

    const renderCertCard = (cert, index) => (
        <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-card border border-gray-700 rounded-2xl p-6 flex flex-col gap-3"
        >
            <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                <FaCertificate className="text-primary text-2xl" />
            </div>
            <p className="text-text_secondary text-sm">{cert.issuer}</p>
            <p className="text-text_secondary/80 text-xs">{cert.date}</p>
            {cert.link && (
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline mt-2 inline-block font-medium">
                    View Certificate →
                </a>
            )}
        </motion.div>
    );

    return (
        <div id="certifications" className="flex flex-col justify-center relative z-10 items-center py-20">
            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center font-display font-bold text-white mt-5 md:mt-3"
                >
                    Certifications
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center max-w-xl text-text_secondary mb-10"
                >
                    My professional certifications and achievements.
                </motion.p>

                {loading ? (
                    <div className="text-text_secondary">Loading certifications...</div>
                ) : certifications.length === 0 ? (
                    <div className="text-text_secondary">No certifications added yet.</div>
                ) : (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                        {frontendCerts.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-display font-bold text-primary text-center mb-4">Frontend</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {frontendCerts.map((cert, idx) => renderCertCard(cert, idx))}
                                </div>
                            </div>
                        )}

                        {backendCerts.length > 0 && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-display font-bold text-primary text-center mb-4">Backend</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {backendCerts.map((cert, idx) => renderCertCard(cert, idx))}
                                </div>
                            </div>
                        )}

                        {otherCerts.length > 0 && (
                            <div className="col-span-1 md:col-span-2 flex flex-col gap-4 mt-8">
                                <h3 className="text-2xl font-display font-bold text-primary text-center mb-4">Other Certifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {otherCerts.map((cert, idx) => renderCertCard(cert, idx))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Certifications;
