"use client";
import React, { useState, useEffect } from "react";
import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
import { motion } from "framer-motion";

const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });
const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

// Array of images to cycle through
const images = [
  "/assets/img1.jpg",
  "/assets/img2.jpg",
  "/assets/img3.jpg",
  "/assets/img4.jpg",
  "/assets/img5.jpg", // Ensure this image exists or replace it with one you have
];

const ThrowbackSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [globalIndex, setGlobalIndex] = useState(0);

  // Visibility check for the section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("throwback-section");
      if (!section) return;
      
      const sectionPosition = section.getBoundingClientRect();
      const isVisible = sectionPosition.top < window.innerHeight * 0.75;
      setIsVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update global image index every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
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
                width: "2px",
                background: `rgba(255, 0, 0, ${0.1 + i * 0.05})`,
                left: `${15 + i * 20}%`,
                transform: "skewX(-45deg) translateX(-50%)",
              }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                height: ["100%", "120%", "100%"],
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
                left: "15%",
                top: "50%",
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
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 0, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
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

        {/* Compact Collage Layout with dynamic image rotation */}
        <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          
            {/* Container 1 */}
            <div className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col">
              <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                <motion.img 
                  key={`img0-${globalIndex}`}
                  src={images[(globalIndex + 0) % images.length]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Wines
                </h3>
              </a>
            </div>

            {/* Container 2 */}
            <div className="col-span-2 sm:col-span-1 md:col-span-2">
              <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 mb-4">
                <motion.img 
                  key={`img1-${globalIndex}`}
                  src={images[(globalIndex + 1) % images.length]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Gin
                </h3>
              </a>
              
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
                {/* Nested Container 1 */}
                <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                  <motion.img 
                    key={`img2-${globalIndex}`}
                    src={images[(globalIndex + 2) % images.length]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Whiskey
                  </h3>
                </a>

                {/* Nested Container 2 */}
                <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40">
                  <motion.img 
                    key={`img3-${globalIndex}`}
                    src={images[(globalIndex + 3) % images.length]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                  <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                    Vodka
                  </h3>
                </a>
              </div>
            </div>

            {/* Container 3 */}
            <div className="col-span-2 sm:col-span-1 md:col-span-1 h-auto md:h-full flex flex-col">
              <a href="" className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow">
                <motion.img 
                  key={`img4-${globalIndex}`}
                  src={images[(globalIndex + 4) % images.length]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <h3 className="z-10 text-2xl font-medium text-white absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  Brandy
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
