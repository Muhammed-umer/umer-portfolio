"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Play, Download, ChevronLeft, ChevronRight, Code, Brain } from 'lucide-react';
import { FaGithub, FaPython, FaReact, FaJava, FaMapMarkedAlt } from 'react-icons/fa';
import { SiSpringboot, SiTailwindcss, SiMysql, SiFirebase } from 'react-icons/si';
import Link from 'next/link';

const projectsData = [
  {
    id: 1,
    title: "AI Code Debugger",
    subtitle: "Automated CLI Debugging Tool",
    description: "Built a CLI tool that detects errors from source files, generates fixes using LLMs, and updates the code automatically. Integrated Qwen-2.5-7B using Hugging Face Inference API for automated debugging workflows.",
    tech: ["Python", "Hugging Face API", "LLMs", "Qwen-2.5-7B"],
    github: "https://github.com/Muhammed-umer/Ai-debugger-agent.git",
    demo: "/projects/Ai Debugger demo.mp4",
    demoType: "video",
    border: "border-blue-500/20"
  },
  {
    id: 2,
    title: "Job Application Tracker",
    subtitle: "Full-Stack Recruitment System",
    description: "Developed a comprehensive full-stack recruitment tracking system for managing job applications. Implemented secure authentication using Spring Security with MySQL integration.",
    tech: ["React", "Spring Boot", "MySQL", "Spring Security"],
    github: "https://github.com/Muhammed-umer/Job-Application-Tracker.git",
    demo: "https://job-application-tracker-2i8j.onrender.com",
    demoType: "live",
    border: "border-emerald-500/20"
  },
  {
    id: 3,
    title: "GCEE Smart College Hackathon",
    subtitle: "Event Registration Platform",
    description: "Built and deployed the official registration platform for Smart Campus Hackathon ’26. Managed participant onboarding and event workflows seamlessly using Firebase.",
    tech: ["React", "Tailwind CSS", "Firebase"],
    github: "https://github.com/Dineshkumar-DK19/GCEE-Smart-college-hackathon.git",
    demo: "https://gcee-sch26.web.app/", 
    demoType: "live",
    border: "border-indigo-500/20"
  },
  {
    id: 4,
    title: "Linguastream",
    subtitle: "Real-time Multilingual Chat",
    description: "Built a real-time multilingual chat platform using React, Spring Boot, Python, and WebSockets. Integrated AI4Bharat IndicTrans via Python microservice for automatic translation with scalable microservices architecture.",
    tech: ["React", "Spring Boot", "Python", "WebSockets"],
    github: "https://github.com/Muhammed-umer/linguastream-multilingual-chat-app.git",
    demo: "/projects/LinguaStream demo.mp4", 
    demoType: "video",
    border: "border-pink-500/20"
  },
  {
    id: 5,
    title: "TripSync",
    subtitle: "Collaborative Trip Management",
    description: "A collaborative trip management application designed for real-time coordination, safety monitoring, and attendance tracking. It combines mapping, emergency alerts, and attendance management in one platform.",
    tech: ["React", "Tailwind CSS", "Firebase", "Leaflet"],
    github: "https://github.com/Muhammed-umer/TripSync.git",
    demo: "https://tripsync-college-trip.web.app",
    demoType: "live",
    border: "border-orange-500/20"
  },
  {
    id: 6,
    title: "2048 Game Clone",
    subtitle: "GUI-based Desktop Game",
    description: "Developed a robust GUI-based implementation of the classic 2048 puzzle game. Features smooth tile animations and state management using Java and JavaFX.",
    tech: ["Java", "JavaFX"],
    github: "https://github.com/Muhammed-umer/2048-in-java-and-javafx.git",
    demo: "/projects/2048-javafx-1.0-SNAPSHOT.jar",
    demoType: "jar",
    border: "border-yellow-500/20"
  }
];

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('python')) return <FaPython className="w-4 h-4 text-[#3776AB]" />;
  if (t.includes('react')) return <FaReact className="w-4 h-4 text-[#61DAFB]" />;
  if (t.includes('java') && !t.includes('javafx')) return <FaJava className="w-4 h-4 text-[#f89820]" />;
  if (t.includes('java') && t.includes('fx')) return <FaJava className="w-4 h-4 text-[#f89820]" />;
  if (t.includes('spring')) return <SiSpringboot className="w-4 h-4 text-[#6DB33F]" />;
  if (t.includes('mysql')) return <SiMysql className="w-4 h-4 text-[#4479A1]" />;
  if (t.includes('firebase')) return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />;
  if (t.includes('leaflet')) return <FaMapMarkedAlt className="w-4 h-4 text-[#199900]" />;
  if (t.includes('llm') || t.includes('qwen') || t.includes('ai')) return <Brain className="w-4 h-4 text-purple-400" />;
  return <Code className="w-4 h-4 text-gray-400" />;
};

export default function Projects() {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(projectsData.length / itemsPerPage);

  useEffect(() => {
    if (mounted && currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [totalPages, currentPage, mounted]);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentProjects = projectsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Video Modal State
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section id="Projects" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 md:mb-24 space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          My <span className="text-purple-400">Projects</span>
        </h2>
        <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mt-4"></div>
      </motion.div>

      {/* Projects Grid with Side Navigation */}
      <div className="relative w-full flex items-center group/slider mt-4">
        
        {/* Left Arrow */}
        {mounted && totalPages > 1 && (
          <button 
            onClick={prevPage}
            className="absolute left-0 md:-left-4 lg:-left-8 xl:-left-12 z-20 p-3 md:p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md group"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}

        <div className="w-full overflow-hidden">
          <div className="min-h-[420px] md:min-h-[480px] lg:min-h-[450px] relative px-2 md:px-4 py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, staggerChildren: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
              >
                {currentProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group relative flex flex-col h-full rounded-[2.5rem] bg-[#0A0A0A]/80 backdrop-blur-3xl border-2 ${project.border} overflow-hidden hover:-translate-y-4 hover:border-purple-500/40 hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] transition-all duration-500`}
                  >
                    {/* Subtle top light effect */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="p-8 md:p-10 flex-1 flex flex-col">
                      <div className="mb-6 md:mb-8">
                        <p className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">{project.subtitle}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{project.title}</h3>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed mb-8 md:mb-10 flex-1 text-[0.95rem]">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2.5 mb-2 mt-auto">
                        {project.tech.map((t, i) => (
                          <span key={i} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-white/[0.03] border border-white/5 rounded-2xl text-gray-300 hover:border-white/10 transition-all duration-300 cursor-default">
                            {getTechIcon(t)}
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 md:p-8 pt-0 flex justify-between items-center z-10 relative">
                      <div className="flex flex-wrap gap-3 md:gap-4 w-full">
                        <Link 
                          href={project.github} 
                          target="_blank"
                          className="p-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex-shrink-0"
                          title="View Source"
                        >
                          <FaGithub className="w-5 h-5" />
                        </Link>

                        {project.demoType === 'live' && (
                          <Link 
                            href={project.demo} 
                            target="_blank"
                            className="flex-1 flex justify-center items-center gap-2 px-4 md:px-6 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 font-bold text-xs md:text-sm whitespace-nowrap"
                          >
                            <span>Live Preview</span>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}

                        {project.demoType === 'video' && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedVideo(project.demo);
                            }}
                            className="flex-1 flex justify-center items-center gap-2 px-4 md:px-6 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 font-bold text-xs md:text-sm cursor-pointer whitespace-nowrap"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>Watch Demo</span>
                          </button>
                        )}

                        {project.demoType === 'jar' && (
                          <Link 
                            href={project.demo} 
                            download
                            className="flex-1 flex justify-center items-center gap-2 px-4 md:px-6 py-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all duration-300 font-bold text-xs md:text-sm whitespace-nowrap"
                          >
                            <Download className="w-4 h-4" />
                            <span>Play game</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Arrow */}
        {mounted && totalPages > 1 && (
          <button 
            onClick={nextPage}
            className="absolute right-0 md:-right-4 lg:-right-8 xl:-right-12 z-20 p-3 md:p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-white/10 hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md group"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {/* Pagination Controls */}
      {mounted && totalPages > 1 && (
        <div className="flex flex-col items-center mt-4 md:mt-8">
          <div className="flex gap-3 mb-4 md:mb-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`group relative h-2 transition-all duration-500 rounded-full ${
                  currentPage === i ? 'w-12 bg-gradient-to-r from-purple-500 to-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to page ${i + 1}`}
              >
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentPage}
            className="px-6 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl"
          >
            <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase">
              Project Batch <span className="text-white">{currentPage + 1}</span> <span className="text-gray-600 mx-2">/</span> <span className="text-gray-500">{totalPages}</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0F0F0F] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.2)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h4 className="text-white font-bold tracking-wide">Project Demonstration</h4>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-gray-400 rounded-xl transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <video 
                  src={selectedVideo} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain shadow-2xl"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
