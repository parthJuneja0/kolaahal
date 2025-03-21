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

  const [activeTab, setActiveTab] = useState("cultural");
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
        <meta
          name="description"
          content="Explore our exciting event categories"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative h-28">
        <div className="absolute top-4 left-4 z-50 flex space-x-4">
          <img
            src="/assets/miet.png"
            alt="Logo 1"
            className="logo h-6 sm:h-8 md:h-10 lg:h-12"
          />
        </div>
        <div className="absolute top-4 right-4 z-50 flex space-x-4">
          <img
            src="/assets/28th.png"
            alt="Logo 2"
            className="logo h-6 sm:h-8 md:h-10 lg:h-14"
          />
          <img
            src="/assets/image.png"
            alt="Logo 3"
            className="logo h-6 sm:h-8 md:h-10 lg:h-12"
          />
        </div>
        <div className="relative z-10  lg:h-[10rem]  md:h-[10rem]  h-[8rem] container mx-auto px-4 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 lg:-mt-4 md:-mt-4">
            <div className="inline-block">
              {"CULTURAL".split(" ").map((char, index) => (
                <span
                  key={`campus-${index}`}
                  className="text-gray-500   inline-block animate-char-reveal"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="inline-block ml-2">
              {" EVENTS".split(" ").map((char, index) => (
                <span
                  key={`events-${index}`}
                  className="text-red-600 inline-block animate-char-reveal"
                  style={{ animationDelay: `${6 * 120 + index * 120}ms` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-32 py-10 relative">
        {/* Activity Cards */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:space-x-32 space-y-8 lg:mt-8">
          {activities &&
            activities[activeTab] &&
            Object.values(activities[activeTab]).map((activity, index) => (
              <Link
                key={activity.title}
                href={`/events/${activeTab}/${activity.title}`}
                passHref
              >
                <div
                  className={`group rounded-xl overflow-hidden ${
                    animateCards
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  } transition-all duration-500`}
                  style={{ transitionDelay: `${index * 75}ms` }}
                >
                  <div className="relative overflow-hidden rounded-full w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 mx-auto">
                    <Image
                      width={128}
                      height={128}
                      src={`/assets/${activeTab}/${activity.title}.jpg`}
                      alt={activity.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm md:text-md font-bold text-black mb-1 text-center group-hover:text-red-500 transition-colors duration-300">
                      {activity.title}
                    </h3>
                    <div className="mt-2 sm:mt-4 flex justify-center">
                      <span className="inline-flex items-center text-gray-600 text-xs sm:text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                        Details
                      </span>
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
