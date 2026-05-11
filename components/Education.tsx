"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Calendar, Award, Building } from "lucide-react";

const educationData = [
    {
        degree: "B.E. Computer Science and Engineering",
        institution: "Government College of Engineering Erode",
        period: "2023 - 2027",
        score: "CGPA: 8.90 / 10 (Till 5th Semester)",
        gradient: "from-purple-500 to-indigo-500",
        shadow: "shadow-purple-500/20"
    },
    {
        degree: "Higher Secondary Second Year",
        institution: "Shri Maruti Matric Higher Secondary School",
        period: "Completed in 2022",
        score: "Percentage: 92.67%",
        gradient: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/20"
    },
    {
        degree: "10th Standard",
        institution: "Shri Maruti Matric Higher Secondary School",
        period: "Completed in 2020",
        score: "Percentage: 99.4%",
        gradient: "from-emerald-500 to-teal-500",
        shadow: "shadow-emerald-500/20"
    }
];

export default function Education() {
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
        <section id="Education" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Education</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
            </motion.div>

            <div ref={containerRef} className="max-w-4xl mx-auto w-full relative">
                {/* Static Timeline vertical line background */}
                <div className="absolute left-[18px] md:left-[31px] top-0 bottom-0 w-1 bg-white/5 rounded-full" />

                {/* Animated fill line */}
                <motion.div
                    className="absolute left-[18px] md:left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-cyan-500 to-emerald-500 rounded-full origin-top z-0"
                    style={{ scaleY }}
                />

                <div className="space-y-12">
                    {educationData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative flex flex-row gap-4 md:gap-12"
                        >
                            {/* Timeline Node & Icon */}
                            <div className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center relative z-10 pl-0 mt-4 md:mt-0">
                                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#0a0a0a] flex items-center justify-center p-1 md:p-1`}>
                                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg ${item.shadow}`}>
                                        <GraduationCap className="w-4 h-4 md:w-7 md:h-7 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 bg-white/5 border border-white/10 p-5 md:p-8 rounded-2xl transition-all duration-300 shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50 active:bg-white/10 active:-translate-y-1 active:border-purple-500/50">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                        {item.degree}
                                    </h3>
                                    <div className="flex items-center text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 rounded-full bg-white/10 text-gray-300 w-fit shrink-0">
                                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
                                        {item.period}
                                    </div>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-start text-gray-400">
                                        <Building className="w-4 h-4 md:w-5 md:h-5 mr-3 mt-0.5 md:mt-1 shrink-0 text-gray-500" />
                                        <p className="text-base md:text-lg leading-relaxed">{item.institution}</p>
                                    </div>

                                    <div className="flex items-center text-gray-300 bg-white/5 w-fit px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-white/5 text-sm md:text-base">
                                        <Award className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-yellow-500" />
                                        <span className="font-semibold">{item.score}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
