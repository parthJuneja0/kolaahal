'use client'
import React, { useState, useEffect } from 'react';
import { Nanum_Gothic } from 'next/font/google';
import { motion } from 'framer-motion';
import { Instagram, /* Facebook, Twitter,  Youtube,*/ Mail } from 'lucide-react';

const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'] });

// Define details for three persons
const contacts = [
  { name: 'Parth Juneja', phone: '9084774537', branch: 'CSE(Ai & ML)' },
  { name: 'Deepanshi Gautam', phone: '8445605566', branch: 'CSE(Ai & ML)' },
  { name: 'Dhruv Gupta', phone: '8923007871', branch: 'CSE(Ai)' },
];

// Social icons array, with commented-out sections for Facebook and Twitter.
const socialIcons = [
  {
    icon: <Instagram size={24} />,
    label: 'Instagram',
    link: 'https://www.instagram.com/kolaahal_miet?igsh=eThyNzM1Zm5hM3hp',
  },
  // {
  //   icon: <Facebook size={24} />,
  //   label: 'Facebook',
  //   link: 'https://www.facebook.com',
  // },
  // {
  //   icon: <Twitter size={24} />,
  //   label: 'Twitter',
  //   link: 'https://twitter.com',
  // },
  {
    // Changed Youtube to Email
    icon: <Mail size={24} />,
    label: 'Email',
    link: 'mailto:contact@kolaahal.com',
  },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('throwback-section');
      if (!section) return;
      const sectionPosition = section.getBoundingClientRect();
      const visible = sectionPosition.top < window.innerHeight * 0.75;
      setIsVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Column: Copyright */}
          <div className="w-full md:w-1/4 text-left">
            <p className={`text-gray-400 ${nanumGothic.className} text-sm`}>
              © 2025 Kolaahal. All Rights Reserved.
            </p>
          </div>

          {/* Center Column: Wider Animated Contact Details */}
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Outer container for overall fade and pulsing highlight */}
            <motion.div
              className="p-8 px-20 rounded-lg"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-row items-center space-x-8"
              >
                {/* Pulsing highlight animation */}
                <motion.div
                  initial={{ boxShadow: "0 0 0 rgba(255, 0, 0, 0)" }}
                  animate={{
                    boxShadow: isVisible
                      ? "0 0 20px rgba(255, 0, 0, 0.6)"
                      : "0 0 0 rgba(255, 0, 0, 0)"
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                  className="flex flex-row items-center space-x-8"
                >
                  {contacts.map((contact, index) => (
                    <motion.div
                      key={contact.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        y: isVisible ? 0 : 20,
                      }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.3 }}
                      className="text-center text-xs text-gray-300"
                    >
                      {/* Wave animation for each contact's text */}
                      <motion.div
                        animate={{
                          y: [0, 20, 0],
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        <p className="font-bold">{contact.name}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.branch}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Social Icons as "Logo" */}
          <div className="w-full md:w-1/4 flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-4"
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
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
