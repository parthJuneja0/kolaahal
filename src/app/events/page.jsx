'use client'
import { useState, useEffect } from 'react';
import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
import Head from 'next/head';
import Link from 'next/link';


const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });
const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

export default function Events() {
  const [activeTab, setActiveTab] = useState('technical');
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
    { id: 'technical', name: 'Technical' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'creativity', name: 'Creativity' },
    { id: 'management', name: 'Management' }
  ];

  const activities = {
    technical: [
      { id: 1, title: 'Hackathon', description: 'A 24-hour coding competition', image: '/assets/img1.jpg' },
      { id: 2, title: 'CTF Challenge', description: 'Capture the flag cybersecurity contest', image: '/assets/img2.jpg' },
      { id: 3, title: 'Tech Quiz', description: 'Test your knowledge of latest technologies', image: '/assets/img3.jpg' },
      { id: 4, title: 'Code Debugging', description: 'Find and fix bugs in record time', image: '/assets/img4.jpg' }
    ],
    cultural: [
      { id: 5, title: 'Battle of Bands', description: 'Show off your musical talent', image: '/api/placeholder/400/250' },
      { id: 6, title: 'Dance Competition', description: 'Showcase your dance moves', image: '/api/placeholder/400/250' },
      { id: 7, title: 'Fashion Show', description: 'Walk the ramp with style', image: '/api/placeholder/400/250' },
      { id: 8, title: 'Art Exhibition', description: 'Display your artistic creations', image: '/api/placeholder/400/250' }
    ],
    creativity: [
      { id: 9, title: 'Cricket Tournament', description: 'Compete in the gentleman\'s game', image: '/api/placeholder/400/250' },
      { id: 10, title: 'Chess Championship', description: 'Strategic mind games at their best', image: '/api/placeholder/400/250' },
      { id: 11, title: 'Basketball', description: 'Show your skills on the court', image: '/api/placeholder/400/250' },
      { id: 12, title: 'Swimming Gala', description: 'Make a splash and win medals', image: '/api/placeholder/400/250' }
    ],
    management: [
      { id: 13, title: 'AI management', description: 'Learn about artificial intelligence', image: '/api/placeholder/400/250' },
      { id: 14, title: 'Robotics Session', description: 'Build your own robot', image: '/api/placeholder/400/250' },
      { id: 15, title: 'Design Thinking', description: 'Creative problem-solving techniques', image: '/api/placeholder/400/250' },
      { id: 16, title: 'Cloud Computing', description: 'Get started with cloud infrastructure', image: '/api/placeholder/400/250' }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Event Categories</title>
        <meta name="description" content="Explore our exciting event categories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-black z-0">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '15px 15px'
          }}></div>
        </div>
        
        <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
            <span className={`text-white ${uncialAntiqua.className}`}>CAMPUS</span>
            <span className={`text-red-600 ${uncialAntiqua.className}`}> EVENTS</span>
          </h1>
          <p className={`text-xl md:text-2xl text-gray-300 max-w-2xl ${nanumGothic.className}`}>Experience the best of technical, cultural, creativity and management events at our campus festival.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10 relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-red-600 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-red-800 rounded-full opacity-10 blur-3xl -z-10"></div>
        
        {/* Category Tabs */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-gray-900/70 backdrop-blur-sm p-2 rounded-xl flex flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`relative px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 mx-1 mb-1 overflow-hidden ${
                  activeTab === category.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/80'
                }`}
              >
                {activeTab === category.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900 animate-gradient"></span>
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activities[activeTab].map((activity, index) => (
            <Link key={activity.id} href={`/events/${activeTab}/${activity.id}`} passHref>
              <div 
                className={`group bg-gray-900 rounded-xl overflow-hidden shadow-xl ${
                  animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } transition-all duration-500`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                  
                  {/* Red accent line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">{activity.title}</h3>
                  <p className="text-gray-400">{activity.description}</p>
                  
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xs text-red-400 uppercase tracking-wider font-medium">{categories.find(c => c.id === activeTab).name}</span>
                    <span className="inline-flex items-center text-white text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                      Details
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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
          <p className="text-gray-500">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>

      {/* Add custom styles */}
      <style jsx global>{`
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
      `}</style>
    </div>
  );
}