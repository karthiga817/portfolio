import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const serviceId = 'service_7w4mcjr';
    const templateId = 'template_j1pxbzj';
    const publicKey = '8Ah8bTxwmikLjhito';

    // Initialize EmailJS once
    useEffect(() => {
        emailjs.init(publicKey);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');
        emailjs.sendForm(serviceId, templateId, form.current)
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
                setStatus('success');
                setLoading(false);
                e.target.reset();
            })
            .catch((error) => {
                console.error('FAILED...', error);
                setStatus('error');
                setLoading(false);
            });
    };

    const inputVariants = {
        focus: { scale: 1.02, borderColor: "#854CE6", boxShadow: "0px 0px 8px rgba(133, 76, 230, 0.5)" },
        blur: { scale: 1, borderColor: "rgba(255, 255, 255, 0.2)", boxShadow: "none" }
    };

    return (
        <div id="contact" className="flex flex-col justify-center relative z-10 items-center py-20 overflow-hidden">


            <div className="relative flex justify-between items-center flex-col w-full max-w-6xl gap-3 z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl text-center font-display font-bold text-white mt-5 md:mt-3"
                >
                    Contact
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg text-center max-w-xl text-text_secondary mb-10"
                >
                    Feel free to reach out to me for any questions or opportunities!
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full max-w-[600px] bg-[#171721] border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 relative"
                >
                    <div className="text-2xl font-bold text-white mb-2">Email Me 🚀</div>
                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-xl mb-2">
                            ✅ Message sent successfully! I'll get back to you soon.
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-2">
                            ❌ Failed to send message. Please try again or email me directly at karthigaavcet@gmail.com
                        </motion.div>
                    )}
                    <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative">
                            <motion.input
                                whileFocus="focus"
                                initial="blur"
                                variants={inputVariants}
                                type="email" name="from_email" placeholder="Your Email"
                                className="w-full bg-[#1C1C27] border border-white/10 rounded-xl outline-none text-lg text-white px-4 py-3 transition-all duration-300 placeholder-text_secondary/70 focus:bg-[#252532]"
                                required
                            />
                        </div>
                        <div className="relative">
                            <motion.input
                                whileFocus="focus"
                                initial="blur"
                                variants={inputVariants}
                                type="text" name="from_name" placeholder="Your Name"
                                className="w-full bg-[#1C1C27] border border-white/10 rounded-xl outline-none text-lg text-white px-4 py-3 transition-all duration-300 placeholder-text_secondary/70 focus:bg-[#252532]"
                                required
                            />
                        </div>
                        <div className="relative">
                            <motion.input
                                whileFocus="focus"
                                initial="blur"
                                variants={inputVariants}
                                type="text" name="subject" placeholder="Subject"
                                className="w-full bg-[#1C1C27] border border-white/10 rounded-xl outline-none text-lg text-white px-4 py-3 transition-all duration-300 placeholder-text_secondary/70 focus:bg-[#252532]"
                                required
                            />
                        </div>
                        <div className="relative">
                            <motion.textarea
                                whileFocus="focus"
                                initial="blur"
                                variants={inputVariants}
                                name="message" placeholder="Message" rows="4"
                                className="w-full bg-[#1C1C27] border border-white/10 rounded-xl outline-none text-lg text-white px-4 py-3 transition-all duration-300 placeholder-text_secondary/70 resize-none focus:bg-[#252532]"
                                required
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(133, 76, 230, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="w-full text-center bg-gradient-to-r from-primary to-secondary py-3 px-4 mt-2 rounded-xl border-none text-white text-lg font-bold cursor-pointer shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
