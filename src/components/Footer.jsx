'use client'
import React, { useState, useEffect } from 'react'
import { Nanum_Gothic } from 'next/font/google'
import { motion } from 'framer-motion'
import { Instagram, Mail } from 'lucide-react'

const nanumGothic = Nanum_Gothic({ subsets: ['latin'], weight: ['400'] })

const socialIcons = [
  {
    icon: <Instagram size={24} />,
    label: 'Instagram',
    link: 'https://www.instagram.com/kolaahal_miet?igsh=eThyNzM1Zm5hM3hp',
  },
  {
    icon: <Mail size={24} />,
    label: 'Email',
    link: 'mailto:contact@kolaahal.com',
  },
]

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('throwback-section')
      if (!section) return
      const sectionPosition = section.getBoundingClientRect()
      const visible = sectionPosition.top < window.innerHeight * 0.75
      setIsVisible(visible)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer className="bg-amber-100 text-black py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Column: Copyright */}
          <div className="w-full md:w-1/4 text-left">
            <p className={`text-gray-600 ${nanumGothic.className} text-sm`}>
              © 2025 Kolaahal. All Rights Reserved.
            </p>
          </div>

          {/* Center Column: Additional text (optional) */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center text-gray-700"
            >
              <p className="text-base">for enquery contract Parth Juneja number 90847 74537</p>
            </motion.div>
          </div>

          {/* Right Column: Social Icons */}
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-200 text-amber-600 border border-amber-400 hover:bg-amber-400 hover:text-white hover:border-amber-500 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
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
  )
}
