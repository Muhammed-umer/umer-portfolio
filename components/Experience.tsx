"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";

const experienceData = [
    {
        role: "Software Engineering Intern",
        company: "National Informatics Centre (NIC)",
        period: "Oct 2025 – Dec 2025",
        location: "Erode, India",
        description: [
            "Developed one of the core modules for the e-Record Room digital solution of the Erode Collectorate using Spring Boot, PostgreSQL, JPA, and HTMX.",
            "Implemented efficient data rendering techniques for large database records and improved table-based data navigation."
        ],
        image: "/Collector Office.jpeg",
        imageCaption: "Getting completion certificate from ERODE Collector",
        gradient: "from-blue-500 to-purple-500",
        shadow: "shadow-blue-500/20"
    },
    {
        role: "Campus Crew Ambassador",
        company: "HackerRank",
        period: "Jan 2026 – Present",
        location: "GCE Erode",
        description: [
            "Conducted coding events, promoted competitive programming, and mentored students as a selected campus representative."
        ],
        gradient: "from-green-500 to-emerald-500",
        shadow: "shadow-green-500/20"
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="Experience" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">My <span className="text-purple-400">Experience</span></h2>
                <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mt-4"></div>
            </motion.div>

            <div ref={containerRef} className="max-w-4xl mx-auto w-full relative">
                {/* Vertical Line */}
                <div className="absolute left-[18px] md:left-[31px] top-0 bottom-0 w-1 bg-white/5 rounded-full" />

                {/* Animated fill line */}
                <motion.div
                    className="absolute left-[18px] md:left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 rounded-full origin-top z-0"
                    style={{ scaleY }}
                />

                <div className="space-y-12">
                    {experienceData.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className="relative flex flex-row gap-4 md:gap-12 group"
                        >
                            {/* Timeline Node */}
                            <div className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center relative z-10 pl-0 mt-4 md:mt-0">
                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#0a0a0a] flex items-center justify-center p-1">
                                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg ${exp.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                        <Briefcase className="w-4 h-4 md:w-7 md:h-7 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-white/5 border border-white/10 p-5 md:p-8 rounded-2xl transition-all duration-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 hover:bg-white/10 active:bg-white/10 active:-translate-y-1 active:border-purple-500/50">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 md:gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                            {exp.role}
                                        </h3>
                                        <p className="text-base md:text-lg text-purple-400 font-medium mt-1">{exp.company}</p>
                                    </div>
                                    <div className="flex items-center text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-full bg-white/10 text-gray-300 w-fit shrink-0">
                                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                                        {exp.period}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-400 text-sm md:text-base mb-6 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                                    <MapPin className="w-4 h-4 mr-1.5 text-red-400" />
                                    {exp.location}
                                </div>

                                <ul className="space-y-3">
                                    {exp.description.map((desc, i) => (
                                        <li key={i} className="flex items-start text-gray-300 text-sm md:text-base">
                                            <ArrowRight className="w-5 h-5 mr-3 mt-0.5 shrink-0 text-purple-500" />
                                            <span className="leading-relaxed">{desc}</span>
                                        </li>
                                    ))}
                                </ul>

                                {exp.image && (
                                    <div className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-2xl relative group/image">
                                        <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10" />
                                        <img src={exp.image} alt={exp.company} className="w-full max-h-80 object-cover object-top hover:scale-105 transition-transform duration-700" />

                                        {(exp as any).imageCaption && (
                                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 flex items-end">
                                                <p className="text-white text-sm md:text-base font-medium tracking-wide flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                                                    {(exp as any).imageCaption}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
