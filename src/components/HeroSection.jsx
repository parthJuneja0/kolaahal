"use client";
import React, { useEffect, useState } from "react";
import { Uncial_Antiqua } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuCircleAlert } from "react-icons/lu";
const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
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

      const handleResize = () => {
        createParticles();
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const [showToast, setShowToast] = useState(false);

  const handleRegisterClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Top-left logos */}
      <div className="absolute top-4 left-4 z-50 flex space-x-4">
        <img src="/assets/miet.png" alt="Logo 1" className="lg:h-12 h-8" />
        <img src="/assets/image.png" alt="Logo 2" className="lg:h-12 h-8" />
      </div>

      {/* Top-right buttons */}
      {/* <Link href="/signup">
          <button className="px-6 py-2 bg-red-600 text-white rounded-full">
            Sign Up
          </button>
        </Link> */}
      {/* Top-right buttons */}
      <div className="absolute top-4 right-4 z-50 flex space-x-4">
        <button
          onClick={handleRegisterClick}
          className="lg:px-6 lg:py-2 px-3 py-1 bg-white/10 backdrop-blur text-white rounded-full border-red-300 border cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          Register Now
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          id="toast-default"
          className="fixed bottom-5 right-5 z-[100] flex items-center max-w-xs p-4 text-white bg-gray-900 rounded-lg shadow-lg animate-slide-in"
          role="alert"
        >
          <div className="inline-flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-lg">
            <LuCircleAlert />
          </div>
          <div className="ml-3 text-sm font-medium">
            Registration opening very soon...
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative w-full h-screen">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
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
          <Link href="/events">
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
              Explore Events
            </motion.button>
          </Link>
        </div>

        {/* Animated particles */}
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
                    (typeof window !== "undefined" ? window.innerHeight : 500),
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
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
