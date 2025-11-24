import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <>
            <Hero />
            <div className="bg-gradient-to-b from-background to-card_light clip-path-polygon pb-24">
                <Skills />
                <Experience />
            </div>
            <Projects />
            <Certifications />
            <Achievements />
            <div className="bg-gradient-to-b from-card_light to-background clip-path-polygon pb-24">
                <Education />
                <Contact />
            </div>
            <Footer />
        </>
    );
};

export default Home;
