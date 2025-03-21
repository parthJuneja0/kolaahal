"use client";
import React, { useContext, useEffect, useState } from "react";
import { Uncial_Antiqua } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { userContext } from "@/context/userContext";

const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });

const HeroSection = () => {
  const { userData } = useContext(userContext);
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

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Top-left logos */}
      <div className="absolute top-4 z-50 flex justify-between space-x-4 w-full px-6">
        <img
          src="/assets/miet.png"
          alt="Logo 1"
          className="lg:h-12 md:h-10 sm:h-8 h-6"
        />
        <img
          src="/assets/image.png"
          alt="Logo 2"
          className="lg:h-12 md:h-10 sm:h-8 h-6"
        />
      </div>

      {/* Top-right Sign In */}
      {/* <div className="absolute top-4 right-4 z-50 flex space-x-4">
        {!userData && (
          <>
            <Link href="/signin">
              <button className="lg:px-6 lg:py-2 px-3 py-1 bg-amber-500 text-white rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-glow">
                Sign In
              </button>
            </Link>
          </>
        )}
      </div> */}

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

        {/* Overlay with content adjusted to amber theme */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 bg-amber-100/50 text-black">
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

          {/* Buttons Container adjusted to amber theme */}
          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4">
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
                className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full text-base sm:text-lg font-medium text-black hover:shadow-glow transition-all duration-300 cursor-pointer hover:scale-105"
              >
                Events Registration
              </motion.button>
            </Link>
            <Link
              href="https://linktr.ee/intelliasociety"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                className="px-6 sm:px-8 py-2 sm:py-3 bg-amber-200 rounded-full border border-amber-300 text-black cursor-pointer hover:scale-105 transition-all duration-300"
              >
                Register Now
              </motion.button>
            </Link>
          </div>
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
