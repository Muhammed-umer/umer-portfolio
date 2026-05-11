"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Download } from "lucide-react";
import Image from "next/image";
import { SkeletonImage } from "./SkeletonImage";
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
        <section id="Hero" className="container mx-auto px-6 pt-32 pb-16 lg:pt-0 lg:pb-0 lg:min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">

            {/* Photo Container */}
            <div className="w-full lg:flex-1 flex justify-center">
                <div className="relative w-48 h-48 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] group transition-transform duration-500 hover:scale-105">
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse group-hover:from-purple-500/40 group-hover:to-cyan-400/40 transition-all duration-500" />

                    {/* Open to Work ring — SVG arc mimicking LinkedIn */}
                    <svg
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="otw-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="100" cy="100" r="96"
                            stroke="url(#otw-gradient)"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeDasharray="490"
                            strokeDashoffset="120"
                            transform="rotate(-210 100 100)"
                            className="drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                        />
                    </svg>

                    {/* "Open to Work" pill label at bottom */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-lg shadow-purple-500/40 border border-purple-400/30">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse shrink-0"></span>
                            Open to Work
                        </div>
                    </div>

                    {/* Profile photo */}
                    <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                        <SkeletonImage
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
            <div className="w-full lg:flex-1 text-center lg:text-left space-y-6 lg:space-y-8">
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