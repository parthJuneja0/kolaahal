"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Nanum_Gothic } from "next/font/google";
import HeroSection from '@/components/HeroSection';
import { ThrowbackSection } from '@/components/ThrowBacks';
import Footer from "@/components/Footer";

const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState([]);
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position for parallax effects
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);
  
  useEffect(() => {
    // Lock body scroll when loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, [loading]);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setParticles(
        [...Array(20)].map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: 0.3 + Math.random() * 0.7,
          scale: 0.1 + Math.random() * 0.3,
        }))
      );
    }
  }, []); // Runs only on client
  
  // Detect when each section is in view
  const [heroInView, setHeroInView] = useState(false);
  
  // Observer for scroll animations
  useEffect(() => {
    if (!loading && typeof window !== "undefined" && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.id === "hero-section") {
              setHeroInView(entry.isIntersecting);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => observer.observe(section));
      
      return () => sections.forEach((section) => observer.unobserve(section));
    }
  }, [loading]);
  
  return (
    <>
      {/* Loading screen */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          {/* Animated particles for loading screen */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle, i) => (
              <motion.div
                key={`loading-particle-${i}`}
                initial={{
                  x: particle.x,
                  y: particle.y,
                  opacity: particle.opacity,
                  scale: particle.scale,
                }}
                animate={{
                  y: [particle.y, Math.random() * window.innerHeight],
                  opacity: [particle.opacity, 0.1 + Math.random() * 0.5],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute w-2 h-2 rounded-full bg-white"
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-6xl font-bold text-white ${nanumGothic.className} z-10`}
          >
            Presenting
          </motion.div>
          <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden z-10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
            />
          </div>
        </div>
      )}
      
      {/* Hero reveal animation after loading finishes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: loading ? 2 : 0 }}
        className="w-full h-full"
      >
        <main className="relative">
          {/* Parallax Hero Section wrapper */}
          <motion.div 
            id="hero-section" 
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: loading ? 0 : 1, 
                y: loading ? 50 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: "easeOut" 
              }}
            >
              <HeroSection />
            </motion.div>
          </motion.div>
          
          {/* Throwback section with reveal on scroll */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <ThrowbackSection />
          </motion.section>
          
          {/* Footer with subtle fade in */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <Footer />
          </motion.div>
        </main>
      </motion.div>
    </>
  );
}