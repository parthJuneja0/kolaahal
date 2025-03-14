'use client'
import React, { useState, useEffect } from 'react';
import { Nanum_Gothic } from 'next/font/google';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'] });

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('throwback-section');
      if (!section) return;

      const sectionPosition = section.getBoundingClientRect();
      const isVisible = sectionPosition.top < window.innerHeight * 0.75;
      setIsVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-gray-400 ${nanumGothic.className}`}>
              © 2025 Kolaahal. All Rights Reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center gap-5 mt-12"
            >
              {[
                {
                  icon: <Instagram size={24} />,
                  label: 'Instagram',
                  link: 'https://www.instagram.com/kolaahal_miet?igsh=eThyNzM1Zm5hM3hp', 
                },
                {
                  icon: <Facebook size={24} />,
                  label: 'Facebook',
                  link: 'https://www.facebook.com', 
                },
                {
                  icon: <Twitter size={24} />,
                  label: 'Twitter',
                  link: 'https://twitter.com', 
                },
                {
                  icon: <Youtube size={24} />,
                  label: 'YouTube',
                  link: 'https://www.youtube.com', 
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank" // Open in a new tab
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-red-500 border border-red-900/30 hover:bg-red-900/10 hover:text-white hover:border-red-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.2,
                      ease: 'easeInOut',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
