"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Rocket, Trophy } from "lucide-react";

const highlights = [
  {
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    metric: "600+",
    label: "LeetCode Problems",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    border: "border-purple-500/30"
  },
  {
    icon: <Rocket className="w-6 h-6 text-blue-400" />,
    metric: "10+",
    label: "Real-time Projects",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30"
  }
];

export default function About() {
  return (
    <section id="About" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 md:mb-24 space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          About <span className="text-purple-400">Me</span>
        </h2>
        <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mt-4"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="relative">
            <div className="absolute -left-6 top-2 bottom-2 w-1 bg-gradient-to-b from-purple-500 via-cyan-400 to-emerald-500 rounded-full hidden md:block"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Logic.</span><br />
              Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Innovation.</span>
            </h3>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I am a <strong className="text-white font-semibold">Computer Science Engineering student</strong> who bridges the gap between theoretical algorithms and real-world engineering. 
              </p>
              
              <div className="pt-4">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-purple-500 rounded-full"></span>
                  Why Me?
                </h4>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-purple-400 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                    <p className="text-base">
                      <strong className="text-white block mb-1 text-lg">Proven Problem Solver</strong> I don't just write code; I optimize it. Having conquered <strong className="text-purple-400">600+ LeetCode problems</strong>, I tackle complex algorithmic challenges with speed and efficiency.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-blue-400 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                    <p className="text-base">
                      <strong className="text-white block mb-1 text-lg">Full-Stack & AI Ready</strong> I have hands-on expertise building and deploying <strong className="text-white">10+ real-time projects</strong>—ranging from secure Spring Boot & React architectures to cutting-edge LLM-integrated AI applications.
                    </p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-2.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                    <p className="text-base">
                      <strong className="text-white block mb-1 text-lg">Impact-Driven Engineer</strong> Whether through internships or competitive hackathons, I focus on building scalable systems that solve real business logic. I'm actively seeking a role where my skills translate directly into measurable impact.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Bento Box Highlights */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-0">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative group overflow-hidden rounded-[2rem] bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 hover:border-white/20`}
            >
              {/* Hover Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md group-hover:scale-110 group-hover:${item.border} transition-all duration-500`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">{item.metric}</h4>
                  <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">{item.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
