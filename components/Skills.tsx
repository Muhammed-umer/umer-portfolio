"use client";

import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaJava, FaGithub, FaReact, FaBrain, FaLightbulb, FaGitAlt } from "react-icons/fa";
import { SiC, SiMysql, SiPostgresql, SiMongodb, SiSpringboot, SiTailwindcss, SiHtmx, SiHuggingface, SiVercel, SiRender } from "react-icons/si";

const skills = [
    { name: "HTML", icon: FaHtml5, color: "text-orange-500" },
    { name: "CSS", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400" },
    { name: "Python", icon: FaPython, color: "text-blue-400" },
    { name: "Java", icon: FaJava, color: "text-red-500" },
    { name: "C", icon: SiC, color: "text-blue-600" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "GitHub", icon: FaGithub, color: "text-white" },
    { name: "React", icon: FaReact, color: "text-cyan-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-400" },
    { name: "Spring Boot", icon: SiSpringboot, color: "text-green-500" },
    { name: "HTMX", icon: SiHtmx, color: "text-blue-500" },
    { name: "Hugging Face", icon: SiHuggingface, color: "text-yellow-400" },
    { name: "Vercel", icon: SiVercel, color: "text-white" },
    { name: "Render", icon: SiRender, color: "text-white" },
    { name: "RAG", icon: FaBrain, color: "text-purple-400" },
    { name: "Problem Solving", icon: FaLightbulb, color: "text-yellow-500" },
];

export default function Skills() {
    return (
        <section id="Skills" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 flex flex-col justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    My <span className="text-purple-400">Skills</span>
                </h2>
                <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mt-4"></div>
            </motion.div>

            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
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
