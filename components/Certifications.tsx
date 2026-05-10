"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Certificate images from the public/cert folder
const certificatesData = [
  { id: 1, image: "/cert/cert1.jpg" },
  { id: 2, image: "/cert/cert2.png" },
  { id: 3, image: "/cert/cert3.png" },
  { id: 4, image: "/cert/cert4.png" },
  { id: 5, image: "/cert/cert5.png" },
  { id: 6, image: "/cert/cert6.png" },
  { id: 7, image: "/cert/certA.jpg" },
  { id: 8, image: "/cert/certb.jpg" }
];

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = certificatesData.length - 1;
      if (nextIndex >= certificatesData.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [currentIndex]); // Resets timer if user manually changes slide

  const currentCert = certificatesData[currentIndex];

  return (
    <section id="Certifications" className="container mx-auto px-4 md:px-6 py-12 md:py-16 scroll-mt-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] right-[10%] w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Certificates</span>
        </h2>
        <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mt-4"></div>
      </motion.div>

      <div className="max-w-4xl mx-auto relative flex items-center justify-center">
        
        {/* Carousel Container (Zero gap, perfectly wrapping the image) */}
        <div className="w-full relative aspect-[1.41/1] sm:aspect-[1.5/1] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group shadow-[0_0_40px_rgba(168,85,247,0.15)] border border-white/5 bg-transparent">
          
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            >
              {currentCert.image ? (
                <img 
                  src={currentCert.image} 
                  alt={`Certificate ${currentIndex + 1}`}
                  className="w-full h-full object-contain md:object-cover pointer-events-none"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500">
                  Image Missing
                </div>
              )}

              {/* Bottom gradient overlay to make dots clearly visible over any image */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow (Overlaid on image) */}
          <button 
            onClick={() => paginate(-1)}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-purple-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 opacity-100"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow (Overlaid on image) */}
          <button 
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-purple-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 opacity-100"
            aria-label="Next certificate"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator (Overlaid at bottom of image) */}
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center items-center space-x-2 z-20">
            {certificatesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? "w-8 h-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]" 
                    : "w-2 h-2 bg-white/40 hover:bg-white/80"
                }`}
                aria-label={`Go to certificate ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
