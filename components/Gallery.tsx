"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonImg } from "./SkeletonImage";

const galleryImages = [
    {
        src: "/Collector Office.jpeg",
        caption: "Receiving internship completion certificate from Erode District Collector (NIC Internship)."
    },
    {
        src: "/8.jpeg",
        caption: "1st Prize in Inferno technical event (Code from Output) at GCT Coimbatore (Feb 2026)."
    },
    {
        src: "/01.jpeg",
        caption: "Top 4th Position at AgentVerse AI Project Expo, presenting our placement system to HOD (March 2026)."
    },
    {
        src: "/1.jpeg",
        caption: "1st Prize in CodeQuest coding contest at GCT Coimbatore (Feb 2026)."
    },
    {
        src: "/4.jpeg",
        caption: "1st Prize in CrackNCode coding contest at PSG iTech, Coimbatore (Feb 2026)."
    },
    {
        src: "/5.jpeg",
        caption: "1st Prize in Blind Coding contest at GCE Erode (March 2026)."
    },
    {
        src: "/2.jpeg",
        caption: "1st Prize in Code Debugging contest during GUSTO 2026 (March 2026)."
    },
    {
        src: "/3.jpeg",
        caption: "1st Prize in Code Debugging contest during GUSTO 2025 (April 2025)."
    },
    {
        src: "/6.jpeg",
        caption: "2nd Prize in Inter College Coding Contest at Kongu Engineering College (Feb 2026)."
    },
    {
        src: "/7.jpeg",
        caption: "2nd Prize Paper Presentation (Hallucination-Free AI using RAG) at Kongu Engineering College (Feb 2026)."
    },
    {
        src: "/leetcode 300 days badge.jpg",
        caption: "LeetCode 300 Days Coding Badge (Consistency and Problem Solving milestone)."
    }
];

export default function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleCloseModals = () => {
            setIsOpen(false);
            setLightboxIndex(null);
        };
        
        window.addEventListener('open-gallery', handleOpen);
        window.addEventListener('close-modals', handleCloseModals);
        
        return () => {
            window.removeEventListener('open-gallery', handleOpen);
            window.removeEventListener('close-modals', handleCloseModals);
        };
    }, []);

    // Auto-show hint on first load for 2 seconds
    useEffect(() => {
        const show = setTimeout(() => setShowHint(true), 800);
        const hide = setTimeout(() => setShowHint(false), 2800);
        return () => { clearTimeout(show); clearTimeout(hide); };
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen || lightboxIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, lightboxIndex]);

    const handlePrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === null || prev === 0 ? galleryImages.length - 1 : prev - 1));
        }
    };

    const handleNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev === null || prev === galleryImages.length - 1 ? 0 : prev + 1));
        }
    };

    // Keyboard controls for Lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Escape") setLightboxIndex(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex]);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
            
            {/* Floating Action Button Wrapper */}
            <div className="fixed bottom-6 right-6 z-40 flex items-center group">
                {/* Custom Tooltip — shows on hover OR on initial load hint */}
                <div className={`mr-4 px-4 py-2 bg-[#0f0826]/90 backdrop-blur-md text-gray-200 text-sm font-semibold rounded-xl border border-purple-500/30 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg shadow-purple-500/10 ${
                    showHint
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                    Achievement Gallery
                </div>
                
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                    aria-label="Open Gallery"
                >
                    <ImageIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-[#05020a]/90 backdrop-blur-xl"
                        />

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-6xl max-h-[85vh] bg-[#0f0826]/80 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col mt-4"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Event Gallery</h3>
                                    <p className="text-gray-400 text-sm mt-1">Hackathons, Contests & Milestones</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto hide-scroll">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {galleryImages.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setLightboxIndex(idx)}
                                            className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-white/10 shadow-lg cursor-pointer"
                                        >
                                            {/* Beautiful dark gradient with animated caption text on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex flex-col justify-end p-4">
                                                <p className="text-white text-xs md:text-sm font-semibold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 leading-snug">
                                                    {item.caption}
                                                </p>
                                            </div>
                                            
                                            <SkeletonImg
                                                src={item.src}
                                                alt={item.caption}
                                                className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                                                    item.src.includes('leetcode') 
                                                    ? 'object-contain bg-black/60 p-2' 
                                                    : 'object-cover'
                                                }`}
                                                loading="lazy"
                                                wrapperClassName="w-full h-full"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Semi-transparent Backdrop click to close */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightboxIndex(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center z-10 gap-4"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setLightboxIndex(null)}
                                className="absolute top-[-50px] right-0 p-3 rounded-full bg-white/5 hover:bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors z-20"
                                aria-label="Close Lightbox"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Main Slide view */}
                            <div className="relative w-full aspect-[4/3] max-h-[70vh] bg-black/40 rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center group/lightbox">
                                <img
                                    src={galleryImages[lightboxIndex].src}
                                    alt={galleryImages[lightboxIndex].caption}
                                    className={`max-w-full max-h-full object-contain select-none transition-all duration-300 ${
                                        galleryImages[lightboxIndex].src.includes('leetcode') 
                                        ? 'p-6' 
                                        : ''
                                    }`}
                                />

                                {/* Left navigation arrow */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="absolute left-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-gray-300 hover:text-white border border-white/10 transition-all duration-300 md:opacity-0 md:group-hover/lightbox:opacity-100 z-20"
                                    aria-label="Previous Image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                {/* Right navigation arrow */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="absolute right-4 p-3 rounded-full bg-black/60 hover:bg-black/80 text-gray-300 hover:text-white border border-white/10 transition-all duration-300 md:opacity-0 md:group-hover/lightbox:opacity-100 z-20"
                                    aria-label="Next Image"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Caption text display */}
                            <div className="w-full text-center px-4 max-w-2xl">
                                <motion.p 
                                    key={lightboxIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white text-base md:text-lg font-medium leading-relaxed"
                                >
                                    {galleryImages[lightboxIndex].caption}
                                </motion.p>
                                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-400">
                                    {lightboxIndex + 1} of {galleryImages.length}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
