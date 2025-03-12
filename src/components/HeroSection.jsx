"use client";
import React from "react";
import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create particles and handle window resize
      const createParticles = () => {
        setParticles(
          [...Array(20)].map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.3 + Math.random() * 0.7,
            scale: 0.1 + Math.random() * 0.3,
          }))
        );
      };

      createParticles();

      // Recreate particles when window resizes
      const handleResize = () => {
        createParticles();
      };

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Runs only on client

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden bg-black">
        {/* Main content */}
        <div className="relative w-full h-screen">
          {/* Video background */}
          <video
            autoPlay
            loop
            muted
            playsInline // Important for iOS devices
            className={`absolute top-0 left-0 w-full h-full object-cover ${
              videoLoaded ? "opacity-100" : "opacity-50"
            } transition-opacity duration-1000`}
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/assets/bg.mp4" type="video/mp4" />
          </video>

          {/* Overlay with content */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white bg-black/50 px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="w-full"
            >
              <h1
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-wide ${uncialAntiqua.className} text-center`}
              >
                Kolaahal-2025
              </h1>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
              }}
            >
              <p className="text-lg sm:text-xl md:text-2xl mt-2 italic text-center">
                Where chaos meets creativity
              </p>
            </motion.div>

            {/* Animated button */}
            <Link href={"/events"}>
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 1.1,
                  duration: 0.5,
                  type: "spring",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 md:mt-12 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-base sm:text-lg font-medium hover:shadow-glow transition-all duration-300"
              >
                Explore Activities
              </motion.button>
            </Link>
          </div>

          {/* Animated particles - adjust for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                initial={{
                  x: particle.x,
                  y: particle.y,
                  opacity: particle.opacity,
                  scale: particle.scale,
                }}
                animate={{
                  y: [
                    particle.y,
                    Math.random() *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 500),
                  ],
                  opacity: [particle.opacity, 0.1 + Math.random() * 0.5],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
