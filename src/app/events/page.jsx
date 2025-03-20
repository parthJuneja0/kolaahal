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
    setAnimateCards(false);
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
    <div className="min-h-screen bg-amber-100 text-white">
      <Head>
        <title>Event Categories</title>
        <meta name="description" content="Explore our exciting event categories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-[32vh] md:h-[32vh] ">
        <div className="absolute top-4 left-4 z-50 flex space-x-4">
          <img src="/assets/miet.png" alt="Logo 1" className="logo h-6 sm:h-8 md:h-10 lg:h-12" />
        </div>
        <div className="absolute top-4 right-4 z-50 flex space-x-4">
          <img src="/assets/28th.png" alt="Logo 2" className="logo h-6 sm:h-8 md:h-10 lg:h-14" />
          <img src="/assets/image.png" alt="Logo 3" className="logo h-6 sm:h-8 md:h-10 lg:h-12" />
        </div>
        <div className="relative z-10  lg:h-[10rem]  md:h-[10rem]  h-[8rem] container mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 lg:-mt-4 md:-mt-4">
            <div className="inline-block">
              {"CAMPUS".split(" ").map((char, index) => (
                <span key={`campus-${index}`} className="text-gray-500   inline-block animate-char-reveal" style={{ animationDelay: `${index * 120}ms` }}>
                  {char}
                </span>
              ))}
            </div>
            <div className="inline-block ml-2">
              {" EVENTS".split(" ").map((char, index) => (
                <span key={`events-${index}`} className="text-red-600 inline-block animate-char-reveal" style={{ animationDelay: `${6 * 120 + index * 120}ms` }}>
                  {char}
                </span>
              ))}
            </div>
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-32 py-10 relative">
        <div className="mb-12 w-full max-w-5xl mx-auto px-4 -mt-32 sm:-mt-44">
          <div className="relative p-3 md:p-6 rounded-xl overflow-hidden">
            <div className="relative backdrop-blur-sm bg-gray-900/30 rounded-lg p-2 md:p-4 border border-gray-800/50">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {categories.map((category) => (
                  <button key={category.id} onClick={() => setActiveTab(category.id)} className={`group relative m-1 px-3 py-2 sm:px-5 md:px-8 md:py-3 text-sm md:text-base ${activeTab === category.id ? "text-white" : "text-gray-900 hover:text-white"}`}>
                    {activeTab === category.id && <div className="absolute inset-0 bg-red-800/80 clip-hexagon"></div>}
                    <div className="absolute inset-0 bg-red-700/0 clip-hexagon transition-all duration-300 group-hover:bg-red-700/20"></div>
                    <span className="relative z-10 font-medium tracking-wide whitespace-nowrap">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

<<<<<<< Updated upstream
=======
        {/* Activity Cards */}
>>>>>>> Stashed changes
        <div className="grid grid-cols-3 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12">
          {activities && activities[activeTab] && Object.values(activities[activeTab]).map((activity, index) => (
            <Link key={activity.title} href={`/events/${activeTab}/${activity.title}`} passHref>
              <div className={`group rounded-xl overflow-hidden ${animateCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-500`} style={{ transitionDelay: `${index * 75}ms` }}>
                <div className="relative overflow-hidden rounded-full w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 mx-auto">
                  <Image width={128} height={128} src={`/assets/${activeTab}/${activity.title}.jpg`} alt={activity.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="p-2 sm:p-3">
                  <h3 className="text-xs sm:text-sm md:text-md font-bold text-black mb-1 text-center group-hover:text-red-500 transition-colors duration-300">{activity.title}</h3>
                  <div className="mt-2 sm:mt-4 flex justify-center">
                    <span className="inline-flex items-center text-yellow-400 text-xs sm:text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">Details</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
