import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';

const Education = () => {
    const education = [
        {
            institution: 'Velammal College of Engineering and Technology',
            degree: 'B.E COMPUTER SCIENCE AND ENGINEERING',
            duration: '2022-2026',
            grade: 'CGPA | 8.27 / 10.0',
            icon: 'college'
        },
        {
            institution: 'Mrr Mavmm Matriculation HR Sec School',
            degree: 'HSC - Higher Secondary Certificate',
            duration: '2022',
            grade: '89.1%',
            icon: 'school'
        },
        {
            institution: 'Mrr Mavmm Matriculation HR Sec School',
            degree: 'SSLC - Secondary School Leaving Certificate',
            duration: '2020',
            grade: '76.4%',
            icon: 'school'
        }
    ];

    return (
        <div id="education" className="flex flex-col justify-center relative z-10 items-center py-20">
            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl text-center font-bold text-white mt-5 md:mt-3"
                >
                    Education
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-center max-w-xl text-text_secondary mb-10"
                >
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </motion.p>
                <div className="w-full flex flex-col items-center justify-center gap-6">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="w-full max-w-[800px] bg-card border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-primary"
                        >
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                    {edu.icon === 'college' ? (
                                        <FaGraduationCap className="text-white text-2xl" />
                                    ) : (
                                        <FaSchool className="text-white text-2xl" />
                                    )}
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div className="flex-1">
                                            <div className="text-lg font-bold text-white">{edu.institution}</div>
                                            <div className="text-base font-medium text-primary mt-1">{edu.degree}</div>
                                        </div>
                                        <div className="text-sm font-normal text-text_secondary">{edu.duration}</div>
                                    </div>
                                    <div className="mt-3 text-text_secondary text-sm">
                                        <span className="font-medium">Grade: </span>{edu.grade}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
