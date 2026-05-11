"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, Star, MapPin, Image as ImageIcon, X, List } from "lucide-react";
import HackerRankCard from "./HackerRankCard";
import { SkeletonImg } from "./SkeletonImage";

const achievementsData = [
    {
        title: "Top 4th team among 30+ teams (Project Expo)",
        description: "Built a fully proctored placement management system and secured Top 4th position among 30 plus teams in AgentVerse AI Project Expo.",
        college: "Government College Of Engineering Erode",
        month: "March 2026",
        icon: Trophy,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        badge: "Top 4"
    },
    {
        title: "1st Prize in CodeQuest",
        description: "Secured 1st Prize among 50+ participants from various colleges in the coding contest.",
        college: "Government College of Technology, Coimbatore",
        month: "Feb 2026",
        icon: Medal,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        badge: "1st Prize"
    },
    {
        title: "1st Prize in Inferno",
        description: "Secured 1st Prize for 'Code from the Output' among 50+ participants from various colleges.",
        college: "Government College of Technology, Coimbatore",
        month: "Feb 2026",
        icon: Medal,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        badge: "1st Prize"
    },
    {
        title: "1st Prize in CrackNCode",
        description: "Secured 1st Prize among 25+ teams in a multiple-level coding contest.",
        college: "PSG Institute of Technology and Applied Research",
        month: "Feb 2026",
        icon: Star,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        badge: "1st Prize"
    },
    {
        title: "1st Prize in Blind Coding",
        description: "Secured 1st prize in blind coding contest in GUSTO 2026 over 50+ participants.",
        college: "Government College Of Engineering Erode",
        month: "March 2026",
        icon: Medal,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        badge: "1st Prize"
    },
    {
        title: "1st Prize in Code Debugging",
        description: "Secured 1st prize in code debugging in GUSTO 2026 over 50+ participants.",
        college: "Government College Of Engineering Erode",
        month: "March 2026",
        icon: Medal,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        badge: "1st Prize"
    },
    {
        title: "1st Prize in Code Debugging (GUSTO 2025)",
        description: "Secured 1st prize in code debugging in GUSTO 2025 over 50+ participants.",
        college: "Government College Of Engineering Erode",
        month: "April 2025",
        icon: Medal,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        badge: "1st Prize"
    },
    {
        title: "2nd Prize in Inter College Coding Contest",
        description: "Secured 2nd Prize among 50+ participants from various colleges.",
        college: "Kongu Engineering College",
        month: "Feb 2026",
        icon: Award,
        color: "text-slate-300",
        bg: "bg-slate-300/10",
        badge: "2nd Prize"
    },
    {
        title: "2nd Prize Paper Presentation",
        description: "Presented a paper on Hallucination-Free AI using RAG among 50+ participants.",
        college: "Kongu Engineering College",
        month: "Feb 2026",
        icon: Award,
        color: "text-slate-300",
        bg: "bg-slate-300/10",
        badge: "2nd Prize"
    }
];

const topRow = achievementsData.slice(0, 5);
const bottomRow = achievementsData.slice(5);

const MarqueeRow = ({ items, reverse = false }: { items: typeof achievementsData, reverse?: boolean }) => {
    // Duplicate 3 times so there's always enough content to scroll seamlessly
    const duplicatedItems = [...items, ...items, ...items, ...items];
    const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';

    return (
        <div className="flex w-full overflow-hidden py-4 group-container">
            <div className={`flex gap-6 w-max ${animationClass} hover:[animation-play-state:paused]`}>
                {duplicatedItems.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="relative w-[280px] md:w-[340px] flex-shrink-0 bg-white/5 border border-white/10 p-5 md:p-6 rounded-3xl hover:bg-white/10 hover:border-purple-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group cursor-default flex flex-col justify-between"
                    >
                        {/* Top Medal Badge */}
                        <div className="absolute -top-4 -right-2 z-10 flex items-center justify-center">
                            {item.badge === "1st Prize" && (
                                <div className="bg-gradient-to-br from-yellow-300 to-yellow-600 text-black font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-yellow-500/20 flex items-center gap-1 border border-yellow-200">
                                    <Medal className="w-3.5 h-3.5" />
                                    1st Prize
                                </div>
                            )}
                            {item.badge === "2nd Prize" && (
                                <div className="bg-gradient-to-br from-slate-200 to-slate-400 text-black font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-slate-500/20 flex items-center gap-1 border border-white">
                                    <Award className="w-3.5 h-3.5" />
                                    2nd Prize
                                </div>
                            )}
                            {item.badge === "Top 4" && (
                                <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-1 border border-purple-300">
                                    <Trophy className="w-3.5 h-3.5" />
                                    Top 4
                                </div>
                            )}
                            {item.badge === "Top Coder" && (
                                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1 border border-orange-300">
                                    <Star className="w-3.5 h-3.5" />
                                    Top Coder
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`p-3 md:p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                    <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base md:text-lg font-bold text-gray-200 group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">{item.title}</h3>
                                    <p className="text-xs md:text-sm text-gray-500 mt-1">{item.month}</p>
                                </div>
                            </div>
                            <p className="text-sm md:text-base text-gray-400 mb-6 line-clamp-3 leading-relaxed h-[65px] md:h-[75px]">{item.description}</p>
                        </div>
                        
                        <div className="flex items-center text-xs md:text-sm font-medium px-4 py-2.5 rounded-xl bg-black/40 text-gray-300 border border-white/5 w-full truncate mt-auto">
                            <MapPin className="w-4 h-4 mr-2 text-purple-400 shrink-0" />
                            <span className="truncate">{item.college}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Achievements() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleCloseModals = () => setIsModalOpen(false);
        window.addEventListener('close-modals', handleCloseModals);
        return () => window.removeEventListener('close-modals', handleCloseModals);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <section id="Achievements" className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-25%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-25%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee {
                    animation: marquee 45s linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 45s linear infinite;
                }
                .group-container:hover .animate-marquee,
                .group-container:hover .animate-marquee-reverse {
                    animation-play-state: paused;
                }
            `}} />

            <div className="container mx-auto px-6 mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Achievements</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 w-full max-w-5xl mx-auto">
                    {/* LeetCode Profile Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-white/10 group bg-[#110A1F] hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 w-full flex items-center justify-center min-h-[220px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <a href="https://leetcode.com/u/Muhammed_Umer/" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                            <SkeletonImg 
                                src="https://leetcard.jacoblin.cool/Muhammed_Umer?theme=dark&font=Inter&ext=heatmap" 
                                alt="LeetCode Profile" 
                                className="w-full h-full object-contain relative z-10 p-4"
                                wrapperClassName="w-full h-full"
                                skeletonClassName="rounded-3xl m-4"
                            />
                        </a>
                    </motion.div>

                    {/* HackerRank Profile Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full h-full"
                    >
                        <HackerRankCard />
                    </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-10"
                >
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-gallery'))}
                        className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 px-8 py-4 rounded-xl transition-all duration-300 font-semibold group shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:border-purple-500/30 w-full sm:w-auto"
                    >
                        <ImageIcon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                        Event Photos
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold group shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] w-full sm:w-auto"
                    >
                        <List className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Show All Achievements
                    </button>
                </motion.div>
            </div>

            {/* Infinite Marquee Section wrapped in container for gaps on left and right! */}
            <div className="container mx-auto px-6">
                <div className="w-full overflow-hidden flex flex-col gap-4 md:gap-8 relative z-10 rounded-3xl">
                    {/* Left/Right Fade Masks for inside the container */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#0a051a] to-transparent z-20"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#0a051a] to-transparent z-20"></div>

                    <MarqueeRow items={topRow} />
                    <MarqueeRow items={bottomRow} reverse={true} />
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
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
                                    <h3 className="text-2xl font-bold text-white">All Achievements</h3>
                                    <p className="text-gray-400 text-sm mt-1">A comprehensive list of all my milestones and awards.</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto hide-scroll">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {achievementsData.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="relative bg-white/5 border border-white/10 p-6 rounded-3xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group flex flex-col justify-between"
                                        >
                                            <div className="absolute -top-4 -right-2 z-10 flex items-center justify-center">
                                                {item.badge === "1st Prize" && (
                                                    <div className="bg-gradient-to-br from-yellow-300 to-yellow-600 text-black font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-yellow-500/20 flex items-center gap-1 border border-yellow-200">
                                                        <Medal className="w-3.5 h-3.5" />
                                                        1st Prize
                                                    </div>
                                                )}
                                                {item.badge === "2nd Prize" && (
                                                    <div className="bg-gradient-to-br from-slate-200 to-slate-400 text-black font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-slate-500/20 flex items-center gap-1 border border-white">
                                                        <Award className="w-3.5 h-3.5" />
                                                        2nd Prize
                                                    </div>
                                                )}
                                                {item.badge === "Top 4" && (
                                                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-1 border border-purple-300">
                                                        <Trophy className="w-3.5 h-3.5" />
                                                        Top 4
                                                    </div>
                                                )}
                                                {item.badge === "Top Coder" && (
                                                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1 border border-orange-300">
                                                        <Star className="w-3.5 h-3.5" />
                                                        Top Coder
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                                                        <item.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-base font-bold text-gray-200 group-hover:text-purple-300 transition-colors leading-snug">{item.title}</h3>
                                                        <p className="text-xs text-gray-500 mt-1">{item.month}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-6 leading-relaxed">{item.description}</p>
                                            </div>
                                            
                                            <div className="flex items-center text-xs font-medium px-4 py-2.5 rounded-xl bg-black/40 text-gray-300 border border-white/5 w-full mt-auto">
                                                <MapPin className="w-4 h-4 mr-2 text-purple-400 shrink-0" />
                                                <span className="truncate">{item.college}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
