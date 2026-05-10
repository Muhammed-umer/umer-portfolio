"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const navLinks = [
        { name: "About", id: "About" },
        { name: "Experience", id: "Experience" },
        { name: "Skills", id: "Skills" },
        { name: "Projects", id: "Projects" },
        { name: "Achievements", id: "Achievements" },
        { name: "Certifications", id: "Certifications" },
        { name: "Education", id: "Education" },
        { name: "Beyond Resume", id: "BeyondResume" },
        { name: "Contact", id: "Contact" }
    ];

    const handleLinkClick = () => {
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent('close-modals'));
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <nav ref={navRef} className="fixed top-0 w-full z-50 bg-[#0a051a]/80 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center justify-between px-5 lg:px-10 py-5 md:py-6 gap-8">
                
                {/* Logo - Left aligned */}
                <div className="flex-shrink-0 text-xl md:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 whitespace-nowrap z-50">
                    Muhammed Umer S
                </div>
                
                {/* Desktop Menu - Right Aligned */}
                <div className="hidden lg:flex flex-1 justify-end">
                    <ul className="flex space-x-4 xl:space-x-6 text-[10px] xl:text-xs font-semibold tracking-widest uppercase text-gray-400">
                        {navLinks.map((link) => (
                            <li key={link.id} className="relative group cursor-pointer">
                                <Link href={`/#${link.id}`} onClick={handleLinkClick} className="hover:text-white transition-all duration-300 px-3 py-2 rounded-xl border border-transparent hover:border-purple-500/30 hover:bg-purple-500/10 flex items-center whitespace-nowrap">
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center z-50">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-gray-400 hover:text-white focus:outline-none flex items-center justify-center p-2"
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <motion.path 
                                animate={{ d: isOpen ? "M18 6L6 18" : "M4 6h16" }} 
                                transition={{ duration: 0.3 }}
                            />
                            <motion.path 
                                d="M4 12h16" 
                                animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? -10 : 0 }} 
                                transition={{ duration: 0.3 }}
                            />
                            <motion.path 
                                animate={{ d: isOpen ? "M6 6l12 12" : "M4 18h16" }} 
                                transition={{ duration: 0.3 }}
                            />
                        </svg>
                    </button>
                </div>
                
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-[#0a051a]/95 backdrop-blur-md border-t border-white/5 overflow-hidden shadow-2xl"
                    >
                        <ul className="flex flex-col items-center py-6 space-y-6 text-sm font-semibold tracking-widest uppercase text-gray-400">
                            {navLinks.map((link) => (
                                <li key={link.id} className="relative group cursor-pointer w-full text-center">
                                    <Link 
                                        href={`/#${link.id}`}
                                        onClick={handleLinkClick}
                                        className="hover:text-white active:scale-95 transition-all duration-300 pb-2 flex items-center justify-center whitespace-nowrap"
                                    >
                                        <span className="text-base">{link.name}</span>
                                    </Link>
                                    <span className="absolute bottom-0 left-1/4 w-1/2 h-[2px] bg-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full"></span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}