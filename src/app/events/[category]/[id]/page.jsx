"use client";

import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, Trophy, Share2, Users } from "lucide-react";

export default function EventDetail() {
  const params = useParams();
  const { category, id } = params;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Dummy event data with added fields
  const eventData = {
    technical: {
      1: {
        title: "Hackathon",
        description:
          "A 24-hour coding competition where participants work in teams to build innovative solutions to real-world problems.",
        date: "March 15, 2025",
        time: "10:00 AM - 10:00 AM (next day)",
        venue: "Main Computer Lab",
        image: "/api/placeholder/800/400",
        registrationFee: "$10",
        registrationPeriod: "February 15 - March 10, 2025",
        prizes: "Cash prizes worth $1000",
        eligibility: "Open to all undergraduate and graduate students. Teams of 2-4 members allowed.",
        rules: [
          "Each team must have at least 2 and at most 4 members",
          "All code must be written during the hackathon",
          "Use of open source libraries is allowed",
          "Project must be submitted by 10:00 AM on March 16",
          "Teams will present their projects to judges after submission"
        ]
      },
    },
    cultural: {
      5: {
        title: "Battle of Bands",
        description:
          "Show off your musical talent in this exciting competition.",
        date: "March 18, 2025",
        time: "6:00 PM - 10:00 PM",
        venue: "Open Air Theater",
        image: "/api/placeholder/800/400",
        registrationFee: "$15 per band",
        registrationPeriod: "February 20 - March 15, 2025",
        prizes: "Cash prizes and recording opportunity",
        eligibility: "Open to all bands with at least 3 members. At least one member must be a student.",
        rules: [
          "Each performance must be between 10-15 minutes",
          "Only original compositions or approved covers allowed",
          "All instruments must be brought by the participants",
          "Sound check will be scheduled on the morning of the event",
          "Decision of the judges will be final"
        ]
      },
    },
  };

  // Handle invalid parameters
  if (!category || !id || !eventData[category] || !eventData[category][id]) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className={`text-center transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-red-500 text-3xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-300 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link href="/events" passHref>
            <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-full transition-all duration-300 flex items-center mx-auto hover:shadow-lg hover:shadow-red-900/20">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Events
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const event = eventData[category][id];
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Head>
        <title>{event.title} | Campus Fest</title>
        <meta name="description" content={event.description.substring(0, 160)} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <Link href="/events" passHref>
          <button className={`flex items-center text-red-400 hover:text-red-500 mb-8 transition-colors duration-300 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Events
          </button>
        </Link>

        {/* Event Title */}
        <div className={`mb-12 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300">{event.title}</h1>
            <span className="bg-red-700 text-white px-4 py-1 rounded-full text-sm inline-flex items-center w-fit">
              {categoryLabel}
            </span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-red-800 via-red-600 to-transparent mt-6"></div>
        </div>
        
        {/* Event Info Section - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image */}
          <div className={`relative transition-all duration-700 delay-150 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-auto object-cover rounded-lg shadow-xl shadow-red-900/10 hover:shadow-red-900/30 transition-shadow duration-300"
            />
            <button className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors duration-300">
              <Share2 className="h-5 w-5 text-white" />
            </button>
          </div>
          
          {/* Right Column - Event Details */}
          <div className={`space-y-6 transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Date</h3>
                <p className="text-white text-lg font-medium">{event.date}</p>
              </div>
            </div>
            
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <Clock className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Time</h3>
                <p className="text-white text-lg font-medium">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <MapPin className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Venue</h3>
                <p className="text-white text-lg font-medium">{event.venue}</p>
              </div>
            </div>
            
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <Ticket className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Registration Fee</h3>
                <p className="text-white text-lg font-medium">{event.registrationFee}</p>
              </div>
            </div>
            
            <div className="flex items-start hover:translate-x-1 transition-transform duration-300">
              <Calendar className="h-6 w-6 text-red-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-400 text-sm font-medium">Registration Period</h3>
                <p className="text-white text-lg font-medium">{event.registrationPeriod}</p>
              </div>
            </div>
            
            <button className="group w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg mt-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/30 relative overflow-hidden">
              <span className="relative z-10">Register Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
        
        {/* Event Details Sections */}
        <div className="space-y-16">
          {/* Description */}
          <div className={`transition-all duration-700 delay-450 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Description
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
          </div>
          
          {/* Eligibility */}
          <div className={`transition-all duration-700 delay-600 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Eligibility
              <Users className="ml-3 h-5 w-5" />
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{event.eligibility}</p>
          </div>
          
          {/* Rules and Regulations */}
          <div className={`transition-all duration-700 delay-750 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Rules and Regulations
            </h2>
            <ul className="text-gray-300 space-y-4">
              {event.rules.map((rule, index) => (
                <li key={index} className="flex items-start group">
                  <span className="bg-gray-800 text-red-500 rounded-full h-6 w-6 flex items-center justify-center mr-4 mt-1 font-bold text-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                    {index + 1}
                  </span>
                  <span className="text-lg leading-relaxed group-hover:text-white transition-colors duration-300">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Prizes */}
          <div className={`pb-12 transition-all duration-700 delay-900 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-6 text-red-500 flex items-center">
              <span className="w-8 h-px bg-red-500 mr-3"></span>
              Prizes
            </h2>
            <div className="flex items-center bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              <Trophy className="h-8 w-8 text-yellow-500 mr-5" />
              <p className="text-gray-300 text-lg">{event.prizes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}