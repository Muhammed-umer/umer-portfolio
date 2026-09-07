"use client";

import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaJava, FaGithub, FaReact, FaBrain, FaLightbulb, FaGitAlt } from "react-icons/fa";
import { SiC, SiMysql, SiPostgresql, SiMongodb, SiSpringboot, SiTailwindcss, SiHtmx, SiHuggingface, SiVercel, SiRender, SiSupabase, SiResend, SiNextdotjs, SiClerk } from "react-icons/si";

const LlamaIndexIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

const skills = [
    // Row 1 — AI + Core
    { name: "RAG", icon: FaBrain, color: "text-purple-400" },
    { name: "LlamaIndex", icon: LlamaIndexIcon, color: "text-cyan-400" },
    { name: "Hugging Face", icon: SiHuggingface, color: "text-yellow-400" },
    { name: "Python", icon: FaPython, color: "text-blue-400" },
    { name: "Java", icon: FaJava, color: "text-red-500" },
    { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
    { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400" },
    { name: "React", icon: FaReact, color: "text-cyan-400" },

    // Row 2 — Full-stack
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
    { name: "Supabase", icon: SiSupabase, color: "text-emerald-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
    { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
    { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },

    // Row 3 — Tools & Infrastructure
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "GitHub", icon: FaGithub, color: "text-white" },
    { name: "Clerk", icon: SiClerk, color: "text-indigo-400" },
    { name: "Resend", icon: SiResend, color: "text-white" },
    { name: "Vercel", icon: SiVercel, color: "text-white" },
    { name: "Render", icon: SiRender, color: "text-white" },
    { name: "HTMX", icon: SiHtmx, color: "text-blue-500" },
    { name: "Problem Solving", icon: FaLightbulb, color: "text-yellow-400" },
];

export default function Skills() {
    return (
        <section id="Skills" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-36 flex flex-col justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Skills</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
            </motion.div>

            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.04 }}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className="liquid-glass lg-card lg-tilt group rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 cursor-pointer"
                        >
                            <skill.icon className={`w-8 h-8 md:w-12 md:h-12 transition-colors duration-300 ${skill.color}`} />
                            <span className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
