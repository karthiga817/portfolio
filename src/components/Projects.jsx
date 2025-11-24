import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsCollectionRef = collection(db, "projects");
                const data = await getDocs(projectsCollectionRef);
                const projectsList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setProjects(projectsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div id="projects" className="flex justify-center items-center py-20 min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div id="projects" className="relative z-10 py-20 px-4 flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Projects</h2>
                    <p className="text-text_secondary text-lg max-w-2xl mx-auto">
                        I have worked on a wide range of projects. Here are some of my projects.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-card border border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary group"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6 flex flex-col gap-3">
                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                <p className="text-text_secondary text-sm line-clamp-3">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.tags && project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 text-xs bg-card_light border border-gray-700 rounded-full text-text_secondary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                        >
                                            <FaGithub /> Code
                                        </a>
                                    )}
                                    {project.webapp && (
                                        <a
                                            href={project.webapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-white transition-all"
                                        >
                                            <FaExternalLinkAlt /> Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
