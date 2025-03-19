'use client'
import React, { useState, useEffect } from 'react'
import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });
const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });


const images = [
  "/assets/throwback/1.jpg",
  "/assets/throwback/2.jpg",
  "/assets/throwback/3.jpg",
  "/assets/throwback/4.jpg",
  "/assets/throwback/5.jpg",
  "/assets/throwback/6.jpg"
];

// Custom hook to update a container's image index with a staggered delay
function useStaggeredImage(globalCycle, offset, delayMs) {
  const [localIndex, setLocalIndex] = useState((globalCycle + offset) % images.length);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalIndex((globalCycle + offset) % images.length);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [globalCycle, offset, delayMs]);

  return localIndex;
}

const ThrowbackSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [globalCycle, setGlobalCycle] = useState(0);

  // Global cycle updates every 5 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalCycle(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Each container gets its local image index with a staggered delay.
  const winesIndex = useStaggeredImage(globalCycle, 0, 0);
  const ginIndex = useStaggeredImage(globalCycle, 1, 400);
  const whiskeyIndex = useStaggeredImage(globalCycle, 2, 800);
  const vodkaIndex = useStaggeredImage(globalCycle, 3, 1200);
  const brandyIndex = useStaggeredImage(globalCycle, 4, 1600);

  // Visibility check for the section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("throwback-section");
      if (!section) return;
      const sectionPosition = section.getBoundingClientRect();
      const visible = sectionPosition.top < window.innerHeight * 0.75;
      setIsVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="throwback-section" className="py-12 relative overflow-hidden">
      {/* Modern background with animated elements */}
      <div className="absolute inset-0 bg-gray-700/10 z-0">
        {/* Animated diagonal stripes */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full"
              style={{
                width: '2px',
                background: `rgba(255, 0, 0, ${0.1 + i * 0.05})`,
                left: `${15 + i * 20}%`,
                transform: 'skewX(-45deg) translateX(-50%)',
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                height: ['100%', '120%', '100%'],
              }}
              transition={{
                duration: 8,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Modern geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute rounded-full border border-red-600/20"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: '15%',
                top: '50%',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10,
                delay: i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Modern mesh gradient effect */}
          <motion.div
            className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-red-900/10 via-transparent to-transparent"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 0, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className={`text-4xl mb-6 text-white ${uncialAntiqua.className} relative inline-block`}>
            Throwbacks
            {/* Animated modern underline effect */}
            <motion.div 
              className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-red-400 via-red-600 to-red-400"
              initial={{ width: "0%" }}
              animate={{ 
                width: isVisible ? "100%" : "0%",
                boxShadow: isVisible ? "0 0 10px rgba(239, 68, 68, 0.7)" : "none"
              }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </h2>
          <p className={`text-lg text-gray-300 ${nanumGothic.className}`}>
            Magnificent moments from our previous editions
          </p>
        </motion.div>

        {/* Compact Collage Layout with staggered, distinct image transitions */}
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          
            {/* Wines Container */}
            <div className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
              <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`wines-${winesIndex}`}
                    src={images[winesIndex]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  
                </h3>
              </a>
            </div>

            {/* Gin Container */}
            <div className="col-span-2 sm:col-span-1 md:col-span-2 ">
              <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`gin-${ginIndex}`}
                    src={images[ginIndex]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                
                </h3>
              </a>
              
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                {/* Whiskey Container */}
                <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={`whiskey-${whiskeyIndex}`}
                      src={images[whiskeyIndex]}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 1 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    
                  </h3>
                </a>

                {/* Vodka Container */}
                <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={`vodka-${vodkaIndex}`}
                      src={images[vodkaIndex]}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 1 }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    
                  </h3>
                </a>
              </div>
            </div>

            {/* Brandy Container */}
            <div className="col-span-2 sm:col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
              <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`brandy-${brandyIndex}`}
                    src={images[brandyIndex]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  
                </h3>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export { ThrowbackSection };
