"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";

const galleryImages = [
    "/Collector Office.jpeg",
    "/8.jpeg",
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

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleCloseModals = () => setIsOpen(false);
        
        window.addEventListener('open-gallery', handleOpen);
        window.addEventListener('close-modals', handleCloseModals);
        
        return () => {
            window.removeEventListener('open-gallery', handleOpen);
            window.removeEventListener('close-modals', handleCloseModals);
        };
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                {/* Custom Tooltip */}
                <div className="mr-4 px-4 py-2 bg-[#0f0826]/90 backdrop-blur-md text-gray-200 text-sm font-semibold rounded-xl border border-purple-500/30 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg shadow-purple-500/10">
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
                                    {galleryImages.map((src, idx) => (
                                        <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-white/10 shadow-lg cursor-pointer">
                                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                            <img
                                                src={src}
                                                alt={`Event Gallery ${idx + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
