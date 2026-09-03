"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonImg } from "./SkeletonImage";

const galleryImages = [
    "/Collector Office.jpeg",
    "/8.jpeg",
    "/01.jpeg",
    "/1.jpeg",
    "/4.jpeg",
    "/5.jpeg",
    "/2.jpeg",
    "/3.jpeg",
    "/6.jpeg",
    "/7.jpeg",
    "/leetcode 300 days badge.jpg"
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
                <div className={`liquid-glass lg-chip mr-4 px-4 py-2 bg-[#faf9ff]/85 text-gray-200 text-sm font-semibold rounded-xl transition-all duration-300 pointer-events-none whitespace-nowrap ${
                    showHint
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                    Achievement Gallery
                </div>
                
                <button
                    onClick={() => setIsOpen(true)}
                    className="liquid-glass lg-btn lg-lift lg-alive bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-paper p-4 rounded-full flex items-center justify-center"
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
                            className="absolute inset-0 bg-[#17112f]/55 backdrop-blur-xl"
                        />

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="liquid-glass lg-card relative w-full max-w-6xl max-h-[85vh] bg-[#faf9ff]/85 rounded-3xl shadow-2xl overflow-hidden flex flex-col mt-4"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-paper/60 backdrop-blur-md sticky top-0 z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Event Gallery</h3>
                                    <p className="text-gray-400 text-sm mt-1">Hackathons, Contests & Milestones</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="liquid-glass lg-btn lg-lift lg-accent-rose p-3 rounded-full hover:bg-red-500/20 text-gray-300 hover:text-red-400"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto hide-scroll">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {galleryImages.map((src, idx) => (
                                        <div 
                                            key={idx} 
                                            onClick={() => setLightboxIndex(idx)}
                                            className="liquid-glass lg-card lg-lift lg-tilt relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
                                        >
                                            {/* Original purple gradient overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                            
                                            <SkeletonImg
                                                src={src}
                                                alt={`Event Gallery ${idx + 1}`}
                                                className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                                                    src.includes('leetcode') 
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
                            className="absolute inset-0 bg-[#17112f]/75 backdrop-blur-md"
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
                                className="liquid-glass lg-btn lg-lift lg-accent-rose absolute top-[-50px] right-0 p-3 rounded-full hover:bg-red-500/20 text-gray-300 hover:text-red-400 z-20"
                                aria-label="Close Lightbox"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Main Slide view */}
                            <div className="liquid-glass lg-card relative w-full aspect-[4/3] max-h-[75vh] bg-black/40 rounded-3xl overflow-hidden flex items-center justify-center group/lightbox">
                                <img
                                    src={galleryImages[lightboxIndex]}
                                    alt={`Event Gallery ${lightboxIndex + 1}`}
                                    className={`max-w-full max-h-full object-contain select-none transition-all duration-300 ${
                                        galleryImages[lightboxIndex].includes('leetcode') 
                                        ? 'p-6' 
                                        : ''
                                    }`}
                                />

                                {/* Left navigation arrow */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="liquid-glass lg-btn absolute left-4 p-3 rounded-full bg-paper/60 text-gray-300 hover:text-white transition-all duration-300 md:opacity-0 md:group-hover/lightbox:opacity-100 z-20"
                                    aria-label="Previous Image"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>

                                {/* Right navigation arrow */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="liquid-glass lg-btn absolute right-4 p-3 rounded-full bg-paper/60 text-gray-300 hover:text-white transition-all duration-300 md:opacity-0 md:group-hover/lightbox:opacity-100 z-20"
                                    aria-label="Next Image"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Counter display (no captions) */}
                            <div className="w-full text-center px-4 max-w-2xl">
                                <span className="liquid-glass lg-chip inline-block px-3 py-1 rounded-full text-xs font-semibold text-gray-400">
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
