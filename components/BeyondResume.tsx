"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SkeletonImage } from "./SkeletonImage";
import { Sparkles, Users, Presentation, Cpu, BookOpen } from "lucide-react";

const events = [
  {
    title: "Lead Organizer",
    icon: <Users className="w-6 h-6 text-purple-400" />,
    description: "Organized and led the Smart Campus Hackathon with a team of 15 members. Managed event planning, coordination, and execution for intra-college participants. Oversaw registrations, evaluation process, and ensured smooth execution of the event.",
    images: ["/beyond_resume/sch1.jpeg", "/beyond_resume/sch2.jpeg"],
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    border: "group-hover/card:border-purple-500/50"
  },
  {
    title: "ITEF Paper Presentation",
    icon: <Presentation className="w-6 h-6 text-blue-400" />,
    description: "Our paper \"AI for Climate Forecasting and Resource Optimization – Advancing SDG 13\" was selected, and we proudly presented it as a team at the International Tamil Engineers Forum (ITEF).",
    images: ["/beyond_resume/itef2.jpeg", "/beyond_resume/itef1.jpeg"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover/card:border-blue-500/50"
  },
  {
    title: "AI Tools Seminar for EEE",
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    description: "Conducted an interactive seminar for 3rd-year EEE students detailing the practical applications and capabilities of modern AI tools like Gemini, Claude, ChatGPT, Comet, Perplexity, and more.",
    images: ["/beyond_resume/eee1.jpeg", "/beyond_resume/eee2.jpeg"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "group-hover/card:border-emerald-500/50"
  },
  {
    title: "Class Seminars & Knowledge Sharing",
    icon: <BookOpen className="w-6 h-6 text-amber-400" />,
    description: "Regularly took the initiative to conduct numerous technical seminars within the class, fostering a collaborative learning environment and sharing insights on emerging tech.",
    images: ["/beyond_resume/class1.jpeg", "/beyond_resume/class2.jpg"],
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "group-hover/card:border-amber-500/50"
  }
];

function EventCard({ event, idx }: { event: typeof events[0], idx: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`group/card relative rounded-3xl bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-500 overflow-hidden flex flex-col`}
    >
      {/* Hover Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
      
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Interactive Flip Container */}
        <div
          className="mb-6 md:mb-8 w-full relative aspect-video group/flip [perspective:1000px] cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] md:group-hover/flip:[transform:rotateY(180deg)] rounded-2xl ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

            {/* Front Face */}
            <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <SkeletonImage
                src={event.images[0]}
                alt={`${event.title} front`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium text-white/80 pointer-events-none transition-opacity duration-300 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="md:hidden">Tap to Flip</span>
                <span className="hidden md:inline">Hover to Flip</span>
              </div>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <SkeletonImage
                src={event.images[1]}
                alt={`${event.title} back`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            {event.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">{event.title}</h3>
        </div>
        
        <div className="text-gray-400 text-sm md:text-lg leading-relaxed flex-grow">
          {event.description}
        </div>

      </div>
    </motion.div>
  );
}

export default function BeyondResume() {
  return (
    <section id="BeyondResume" className="container mx-auto px-6 py-12 md:py-16 scroll-mt-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[30%] right-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 md:mb-24 space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
          <span>Beyond the</span>
          <span className="flex items-center gap-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Resume</span>
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4 mb-4"></div>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg text-center">
          Leadership, seminars, event organization, and more. A glimpse into my active involvement beyond just code.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 md:px-0">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} idx={idx} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-16 md:mt-24"
      >
        <div className="inline-block px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <p className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
            ...and many more initiatives & activities!
          </p>
        </div>
      </motion.div>
    </section>
  );
}
