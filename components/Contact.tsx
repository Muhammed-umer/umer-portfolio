"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaHackerrank, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const socialLinks = [
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        url: "https://www.linkedin.com/in/muhammed-umer-s",
        color: "text-blue-500",
        hoverClass: "hover:bg-blue-500/10 hover:border-blue-500/30",
    },
    {
        name: "GitHub",
        icon: FaGithub,
        url: "https://github.com/Muhammed-umer",
        color: "text-white",
        hoverClass: "hover:bg-white/10 hover:border-white/30",
    },
    {
        name: "LeetCode",
        icon: SiLeetcode,
        url: "https://leetcode.com/u/Muhammed_Umer/",
        color: "text-yellow-500",
        hoverClass: "hover:bg-yellow-500/10 hover:border-yellow-500/30",
    },
    {
        name: "HackerRank",
        icon: FaHackerrank,
        url: "https://www.hackerrank.com/profile/Md_umer77",
        color: "text-green-500",
        hoverClass: "hover:bg-green-500/10 hover:border-green-500/30",
    }
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSent, setIsSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "5463be2f-b937-4a97-8156-4e962efde438",
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject || "New Portfolio Contact",
                    message: formData.message,
                }),
            });

            const result = await response.json();
            
            if (result.success) {
                setIsSent(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setIsSent(false), 5000);
            } else {
                console.error("Failed to send message:", result);
                alert("Something went wrong. Please try again later or contact me directly via email.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please check your internet connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="Contact" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Get In <span className="text-purple-400">Touch</span>
                    </h2>
                    <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mt-4"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col h-full"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-3">Let's Connect</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Prefer reaching out directly? You can drop me an email or send a quick message on WhatsApp. I'm highly responsive on both!
                            </p>
                            
                            <div className="flex flex-col gap-4 mb-10">
                                <a href="mailto:muhammedumer77md@gmail.com" className="w-full flex items-center justify-center sm:justify-start gap-4 bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white border border-purple-500/20 py-4 px-6 rounded-xl transition-all duration-300 font-semibold group shadow-lg shadow-purple-500/5 hover:shadow-purple-500/25">
                                    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="tracking-wide">muhammedumer77md@gmail.com</span>
                                </a>
                                <a href="https://wa.me/919445886230" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center sm:justify-start gap-4 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 py-4 px-6 rounded-xl transition-all duration-300 font-semibold group shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/25">
                                    <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    <span className="tracking-wide">+91 9445886230</span>
                                </a>
                            </div>

                            <div className="space-y-4">
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Social Profiles</p>
                                <div className="flex flex-wrap gap-4">
                                    {socialLinks.map((link, idx) => (
                                        <a 
                                            key={idx} 
                                            href={link.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            aria-label={link.name}
                                            className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:-translate-y-1 shadow-lg transition-all duration-300 group ${link.hoverClass}`}
                                        >
                                            <link.icon className={`w-5 h-5 ${link.color} group-hover:scale-110 transition-transform`} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Full Name"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your.email@example.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Job Opportunity / Project Idea"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Hi Umer, I would like to discuss..."
                                    rows={5}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                                />
                            </div>

                            {isSent && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                                    <p className="text-sm font-medium">Message has successfully been sent to Muhammed Umer!</p>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                            >
                                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                                {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
