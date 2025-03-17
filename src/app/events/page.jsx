"use client";
import { useState, useEffect, useContext } from "react";
import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { eventsDataContext } from "@/context/eventsDataContext";

const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });
const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

export default function Events() {
  const { activities } = useContext(eventsDataContext);

  const [activeTab, setActiveTab] = useState("technical");
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    // Reset animation state when tab changes
    setAnimateCards(false);

    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setAnimateCards(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const categories = [
    { id: "technical", name: "Technical" },
    { id: "cultural", name: "Cultural" },
    { id: "creativity", name: "Creativity" },
    { id: "management", name: "Management" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Event Categories</title>
        <meta
          name="description"
          content="Explore our exciting event categories"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute top-4 right-4 z-50 flex space-x-4">
          <img src="/assets/miet.png" alt="Logo 1" className="lg:h-12 h-8" />
          <img src="/assets/image.png" alt="Logo 2" className="lg:h-12 h-8" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-black z-0">
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "15px 15px",
            }}
          ></div>
        </div>

        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
            {/* Character-by-character reveal for CAMPUS */}
            <div className="inline-block">
              {"CAMPUS".split("").map((char, index) => (
                <span
                  key={`campus-${index}`}
                  className={`text-white ${uncialAntiqua.className} inline-block animate-char-reveal`}
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Character-by-character reveal for EVENTS (same animation as CAMPUS) */}
            <div className="inline-block ml-2">
              {" EVENTS".split("").map((char, index) => (
                <span
                  key={`events-${index}`}
                  className={`text-red-600 ${uncialAntiqua.className} inline-block animate-char-reveal`}
                  style={{ animationDelay: `${6 * 120 + index * 120}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h1>

          {/* Gradient reveal for paragraph */}
          <div className="overflow-hidden">
            <p
              className={`text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-red-300 max-w-2xl animate-gradient-reveal ${nanumGothic.className}`}
            >
              Experience the best of technical, cultural, creativity and
              management events at our campus festival.
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 lg:px-32 py-10 relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-red-600 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-red-800 rounded-full opacity-10 blur-3xl -z-10"></div>

        {/* Category Tabs */}
        <div className="mb-12 w-full max-w-5xl mx-auto px-4">
          <div className="relative bg-gradient-to-br from-gray-900/20 to-gray-950 p-3 md:p-6 rounded-xl overflow-hidden">
            {/* Glass panel for buttons */}
            <div className="relative backdrop-blur-sm bg-gray-900/30 rounded-lg p-2 md:p-4 border border-gray-800/50">
              <div className="flex flex-wrap justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`
                  group relative m-1 px-3 py-2 md:px-8 md:py-3 overflow-hidden
                  text-sm md:text-base
                  ${
                    activeTab === category.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }
                `}
                  >
                    {/* Hexagonal background for active state */}
                    {activeTab === category.id && (
                      <div className="absolute inset-0 bg-red-800/80 clip-hexagon"></div>
                    )}

                    {/* Hover effect - subtle glow */}
                    <div className="absolute inset-0 bg-red-700/0 clip-hexagon transition-all duration-300 group-hover:bg-red-700/20"></div>

                    {/* Text content */}
                    <span className="relative z-10 font-medium tracking-wide whitespace-nowrap">
                      {category.name}
                    </span>

                    {/* Bottom accent line */}
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-red-600 transition-all duration-300 ${
                        activeTab === category.id
                          ? "w-full"
                          : "w-0 group-hover:w-2/3"
                      }`}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-20">
          {activities[activeTab].map((activity, index) => (
            <Link
              key={activity.title}
              href={`/events/${activeTab}/${activity.title}`}
              passHref
            >
              <div
                className={`group bg-gray-900 rounded-xl overflow-hidden shadow-xl ${
                  animateCards
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } transition-all duration-500`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    width={400}
                    height={400}
                    src={activity.image}
                    alt={activity.title}
                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

                  {/* Red accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-gray-400">
                    {activity.description.substring(0, 100) + "..."}
                  </p>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-red-400 uppercase tracking-wider font-medium">
                      {categories.find((c) => c.id === activeTab).name}
                    </span>
                    <span className="inline-flex items-center text-white text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-20 py-12 bg-gradient-to-t from-gray-900 to-black border-t border-red-900/20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-600 font-bold text-xl mb-2">CAMPUS FEST</div>
          <p className="text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add custom styles */}
      <style jsx global>{`
        .clip-hexagon {
          clip-path: polygon(
            10% 0%,
            90% 0%,
            100% 50%,
            90% 100%,
            10% 100%,
            0% 50%
          );
        }

        @media (max-width: 640px) {
          .clip-hexagon {
            clip-path: polygon(
              5% 0%,
              95% 0%,
              100% 50%,
              95% 100%,
              5% 100%,
              0% 50%
            );
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes charReveal {
          0% {
            opacity: 0;
            transform: translateY(50px) rotate(20deg) scale(0);
            filter: blur(10px);
          }
          80% {
            opacity: 1;
            transform: translateY(0) rotate(0) scale(1.1);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-char-reveal {
          opacity: 0;
          animation: charReveal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        /* Gradient reveal animation */
        @keyframes gradientReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
            background-position: 0% 50%;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            background-position: 100% 50%;
          }
        }

        .animate-gradient-reveal {
          background-size: 200% 200%;
          opacity: 0;
          animation: gradientReveal 1.5s 1.5s forwards;
        }
      `}</style>
    </div>
  );
}
