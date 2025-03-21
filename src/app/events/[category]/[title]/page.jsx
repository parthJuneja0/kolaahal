"use client";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import { eventsDataContext } from "@/context/eventsDataContext";
import Image from "next/image";
import { AiOutlineTeam } from "react-icons/ai";
import { LuCircleAlert } from "react-icons/lu";
import { userContext } from "@/context/userContext";

export default function EventDetail() {
  const router = useRouter();
  const { userData } = useContext(userContext);
  const params = useParams();
  const { category, title } = params;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const googleForms = {
    Rangmanch: "https://forms.gle/e55MWpN31KXZatCD9",
    "Swar Sangam": "https://forms.gle/Secpvz2AWGv4Q5CX6",
    Foxtrot: "https://forms.gle/DrBfx4zZNMQbahVE9",
    "Battle of Bands":
      "https://docs.google.com/forms/d/e/1FAIpQLScJwsvsBU3hEBTZAMR6EavJbslVexEM69oOcFrUNzjUFk7hrw/viewform?usp=header",
    Artmania:
      "https://docs.google.com/forms/d/e/1FAIpQLSfUFlgT-sPAhd7iJ47b-81C-IvJV2XhNY1E4fKpNGTUBtNZhw/viewform",
  };

  const { activities } = useContext(eventsDataContext);

  // Handle invalid parameters
  if (
    !category ||
    !title ||
    !activities[category] ||
    Object.values(activities[category]).length <= 0 ||
    !Object.values(activities[category]).some(
      (item) => item.title === decodeURIComponent(title)
    )
  ) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div
          className={`text-center transform transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-red-500 text-3xl font-bold mb-4">
            Event Not Found
          </h2>
          <p className="text-gray-300 mb-8">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/events" passHref>
            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full transition-all duration-300 flex items-center mx-auto hover:shadow-lg hover:shadow-red-900/20">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Events
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const activity = Object.values(activities[category])?.find(
    (item) => item.title === decodeURIComponent(title)
  );
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-amber-100 text-white">
      <Head>
        <title>{activity.title} | Campus Fest</title>
        <meta
          name="description"
          content={activity.description.substring(0, 160)}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <Link href="/events" passHref>
          <button
            className={`flex items-center text-red-400 hover:text-red-500 mb-8 transition-colors duration-300 transform ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Events
          </button>
        </Link>

        {/* Event Title */}
        <div
          className={`mb-12 transition-all duration-700 transform ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300">
              {activity.title}
            </h1>
            <span className="bg-red-700 text-white px-4 py-1 rounded-full text-sm inline-flex items-center w-fit">
              {categoryLabel}
            </span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-red-800 via-red-600 to-transparent mt-6"></div>
        </div>

        {/* Event Info Section - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image */}
          <div
            className={`relative transition-all duration-700 delay-150 flex justify-center items-center  transform ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <Image
              src={`/assets/${category}/${activity.title}.jpg`}
              height={400}
              width={400}
              alt={activity.title}
              className="object-cover rounded-lg shadow-xl shadow-red-900/10 hover:shadow-red-900/30 transition-shadow duration-300 w-96 h-96"
            />
          </div>

          {/* Right Column - Event Details */}
          <div
            className={`space-y-6 transition-all duration-700 delay-300  flex flex-col justify-center items-start  transform ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-800 text-sm font-medium">Date</h3>
                <p className="text-gray-800/80 text-lg font-medium">
                  {activity.date}
                </p>
              </div>
            </div>
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <Clock className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-800 text-sm font-medium">Time</h3>
                <p className="text-gray-800/80  text-lg font-medium">
                  {activity.time}
                </p>
              </div>
            </div>
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <MapPin className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-800 text-sm font-medium">Venue</h3>
                <p className="text-gray-800/80  text-lg font-medium">
                  {activity.venue}
                </p>
              </div>
            </div>
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <AiOutlineTeam className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-800 text-sm font-medium">Team Size</h3>
                <p className="text-gray-800/80 text-lg font-medium">
                  {activity.teamSize}
                </p>
              </div>
            </div>
            {googleForms[activity.title] ? (
              <Link href={googleForms[activity.title]} passHref>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className={`group w-full 
                       "bg-red-600 hover:bg-red-700" bg-red-500
                   text-white font-bold py-4 px-8 rounded-lg mt-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/30 relative overflow-hidden cursor-pointer`}
                >
                  <span className="relative z-10">Register Now</span>
                </button>
              </Link>
            ) : (
              <button
                className={`group w-full 
                       "bg-red-600 hover:bg-red-700" bg-gray-500
                   text-white font-bold py-4 px-8 rounded-lg mt-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/30 relative overflow-hidden cursor-not-allowed`}
              >
                <span className="relative z-10">Registration Closed</span>
              </button>
            )}
          </div>
        </div>

        {/* Event Details Sections */}
        <div className="space-y-16">
          {/* Description */}
          <div
            className={`transition-all duration-700 delay-450 transform ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Description
            </h2>
            <p className="text-gray-800/80  text-lg leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Evaluation Scheme */}
          <div
            className={`transition-all duration-700 delay-600 transform ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Evaluation Scheme
            </h2>
            <p className="text-gray-800/80  text-lg leading-relaxed">
              {activity.evaluationScheme}
            </p>
          </div>

          {/* Contact for Enquiry */}
          <div
            className={`transition-all duration-700 delay-600 transform ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Contact for Enquiry
            </h2>
            <p className="text-gray-800/80  text-lg leading-relaxed">
              {activity.OC} - {activity.OCContact} <br />
              {activity.EC} - {activity.ECContact}
            </p>
          </div>

          {/* Prizes */}
          <div
            className={`transition-all duration-700 delay-900 transform ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Prizes
            </h2>
            <div className="flex items-center bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              <Trophy className="h-8 w-8 text-yellow-500 mr-5" />
              <p className="text-gray-300 text-lg">{activity.prizes}</p>
            </div>
          </div>
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
}
