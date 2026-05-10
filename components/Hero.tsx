"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Download } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaHackerrank, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const roles = ["Software Developer", "Web Developer", "AI Enthusiast"];

const socialLinks = [
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/muhammed-umer-s", color: "text-blue-500" },
    { icon: FaGithub, url: "https://github.com/Muhammed-umer", color: "text-white" },
    { icon: SiLeetcode, url: "https://leetcode.com/u/Muhammed_Umer/", color: "text-yellow-500" },
    { icon: FaHackerrank, url: "https://www.hackerrank.com/profile/Md_umer77", color: "text-green-500" },
    { icon: FaEnvelope, url: "mailto:mohdumer77md@gmail.com", color: "text-red-500" },
];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="Hero" className="container mx-auto px-6 pt-32 lg:pt-0 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Photo Container */}
            <div className="flex-1 flex justify-center">
                <div className="relative w-48 h-48 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse group-hover:from-purple-500/40 group-hover:to-cyan-400/40 transition-all duration-500" />
                    <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                        <Image
                            src="/umer.png"
                            alt="Muhammed Umer S"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover scale-110"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="space-y-4">
                    <h2 className="font-extrabold tracking-tight">
                        <span className="text-2xl md:text-4xl text-gray-200">Hi, I'm</span> <br />
                        <span className="text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mt-2 block">Muhammed Umer</span>
                    </h2>

                    <div className="flex flex-col items-center lg:items-start text-xl md:text-4xl font-medium text-gray-300">
                        <span>I'm a Professional</span>
                        <div className="relative overflow-hidden h-10 md:h-16 flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roles[index]}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="font-bold text-purple-400"
                                >
                                    {roles[index]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex justify-center lg:justify-start space-x-6">
                        {socialLinks.map((social, idx) => (
                            <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer">
                                <social.icon className={`w-6 h-6 md:w-8 md:h-8 hover:scale-110 transition-all ${social.color}`} />
                            </a>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <a href="#Contact" className="flex items-center px-6 py-2 md:px-8 md:py-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-sm md:text-base">
                            CONTACT ME <User className="ml-2 w-4 h-4" />
                        </a>
                        <a href="/Md%20Umer%20Resume.pdf" download="Md_Umer_Resume.pdf" className="flex items-center px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:scale-105 transition-transform font-bold shadow-lg shadow-purple-500/25 text-sm md:text-base">
                            GET RESUME <Download className="ml-2 w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

        </section>
    );
}