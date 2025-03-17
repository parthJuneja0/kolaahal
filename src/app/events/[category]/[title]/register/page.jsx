"use client";
import { useState, useEffect } from "react";

import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
import { useParams } from "next/navigation";
import { db } from "../../../../../../firebase.config";
import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
} from "firebase/database";

const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });
const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

// Components for animated elements that will only render on client-side
const AnimatedParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      blur: Math.random() * 30 + 5,
      color: `rgba(${Math.floor(Math.random() * 100 + 155)}, 0, 0, ${
        Math.random() * 0.2
      })`,
    }));
    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
    };

    const animationId = setInterval(animateParticles, 50);
    return () => clearInterval(animationId);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            filter: `blur(${particle.blur}px)`,
            opacity: particle.opacity,
            transition: "left 2s ease-out, top 2s ease-out",
          }}
        />
      ))}
    </>
  );
};

const AnimatedSparkles = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-red-500 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </>
  );
};

export default function RegistrationForm() {
  const params = useParams();
  const { category, title } = params;
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    course: "",
    branch: "",
    year: "",
    contactNo: "",
    email: "",
  });

  const [formFocus, setFormFocus] = useState({
    name: false,
    college: false,
    course: false,
    branch: false,
    year: false,
    contactNo: false,
    email: false,
  });

  // Track if we're in the browser
  const [isClient, setIsClient] = useState(false);

  // Only run useEffect on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError("");
  };

  const handleFocus = (field) => {
    setFormFocus((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setFormFocus((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email is required.");
      return;
    }

    try {
      const formRef = ref(db, "submissions");
      const emailQuery = query(
        formRef,
        orderByChild("email"),
        equalTo(formData.email)
      );

      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        setError("You have already registered for this event.");
      } else {
        await push(formRef, formData);
        console.log("Form submitted successfully:", formData);
        setFormData({ name: "", email: "" }); // Reset form on success
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated floating particles - only render on client */}
      {isClient && (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <AnimatedParticles />
        </div>
      )}

      {/* Animated gradient waves */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          <div
            className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-gradient-radial from-red-900/10 to-transparent animate-pulse-slow"
            style={{ animationDuration: "15s" }}
          ></div>
          <div
            className="absolute w-[200%] h-[200%] top-[-40%] left-[-30%] bg-gradient-radial from-red-700/5 to-transparent animate-pulse-slow"
            style={{ animationDuration: "18s", animationDelay: "2s" }}
          ></div>
          <div
            className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%] bg-gradient-radial from-red-600/10 to-transparent animate-pulse-slow"
            style={{ animationDuration: "12s", animationDelay: "4s" }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-black/40 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* Original decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-float"
          style={{ animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl animate-float-reverse"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-red-700/10 rounded-full blur-3xl animate-float"
          style={{ animationDuration: "18s", animationDelay: "5s" }}
        ></div>
        <div
          className="absolute bottom-1/2 left-1/3 w-72 h-72 bg-red-800/10 rounded-full blur-3xl animate-float-reverse"
          style={{ animationDuration: "25s", animationDelay: "2s" }}
        ></div>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.2)] bg-gradient-to-br from-gray-900 to-black relative z-10 border border-gray-800">
        {/* Left Panel - Decorative */}
        <div className="md:w-2/5 p-10 relative overflow-hidden bg-[#0e0e0e]">
          <div className="absolute inset-0">
            <div
              className="absolute -top-20 -left-20 w-40 h-40 bg-red-600 rounded-full opacity-10 blur-3xl animate-pulse"
              style={{ animationDuration: "8s" }}
            ></div>
            <div
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-800 rounded-full opacity-10 blur-3xl animate-pulse"
              style={{ animationDuration: "12s", animationDelay: "2s" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/50 to-black"></div>
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
          </div>

          {/* Animated sparkles - only render on client */}
          {isClient && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <AnimatedSparkles />
            </div>
          )}

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-block relative">
                <h1
                  className={`text-4xl ${uncialAntiqua.className} font-extrabold text-white`}
                >
                  Kolaahal<span className="text-red-500">2025</span>
                </h1>
                <div
                  className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-700 mt-2 animate-pulse"
                  style={{ animationDuration: "3s" }}
                ></div>
              </div>

              <div className="pt-6 space-y-4">
                {[
                  { icon: "🎓", text: "Exposure" },
                  { icon: "💼", text: "Networking" },
                  { icon: "🚀", text: "enjoyment" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 hover:translate-x-1 transition-transform duration-300"
                  >
                    <div
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center text-white animate-pulse"
                      style={{ animationDuration: `${3 + i * 0.5}s` }}
                    >
                      {item.icon}
                    </div>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="space-y-8 mt-12">
                <div className="space-y-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div
                        className="w-2 h-2 rounded-full bg-red-500 animate-pulse"
                        style={{ animationDuration: `${2 + i}s` }}
                      ></div>
                      <div className="h-0.5 flex-1 bg-gray-800 relative overflow-hidden">
                        <div
                          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/30 to-transparent animate-slide-right"
                          style={{
                            animationDuration: `${7 + i * 2}s`,
                            animationIterationCount: "infinite",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-3/5 p-10 relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>

          {/* Subtle animated light effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-red-500/5 to-transparent rounded-full animate-move-slow"
              style={{ animationDuration: "20s" }}
            ></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                Registration
              </span>
              <div className="ml-4 flex-1 h-px bg-gradient-to-r from-red-700 to-transparent relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/50 to-transparent animate-slide-right"
                  style={{
                    animationDuration: "3s",
                    animationIterationCount: "infinite",
                  }}
                ></div>
              </div>
            </h2>
            <p className="text-gray-400 mb-8">
              Fill in your details to complete your registration
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "John Doe",
                  },
                  {
                    id: "college",
                    label: "College",
                    type: "text",
                    placeholder: "Your College",
                  },
                  {
                    id: "course",
                    label: "Course",
                    type: "text",
                    placeholder: "e.g. Computer Science",
                  },
                  {
                    id: "branch",
                    label: "Branch",
                    type: "text",
                    placeholder: "e.g. Engineering",
                  },
                  {
                    id: "contactNo",
                    label: "Contact No.",
                    type: "tel",
                    placeholder: "+1 (123) 456-7890",
                  },
                ].map((field) => (
                  <div key={field.id} className="space-y-1 group">
                    <label
                      htmlFor={field.id}
                      className={`text-sm font-medium transition-colors duration-300 ${
                        formFocus[field.id] ? "text-red-400" : "text-gray-400"
                      }`}
                    >
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={handleChange}
                        onFocus={() => handleFocus(field.id)}
                        onBlur={() => handleBlur(field.id)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder:text-gray-600"
                        required
                      />
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform transition-transform duration-300 ${
                          formFocus[field.id] ? "scale-x-100" : "scale-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}

                <div className="space-y-1 group">
                  <label
                    htmlFor="year"
                    className={`text-sm font-medium transition-colors duration-300 ${
                      formFocus.year ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    Year
                  </label>
                  <div className="relative">
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      onFocus={() => handleFocus("year")}
                      onBlur={() => handleBlur("year")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 appearance-none"
                      required
                    >
                      <option value="" disabled>
                        Select Year
                      </option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform transition-transform duration-300 ${
                        formFocus.year ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2 group">
                  <label
                    htmlFor="email"
                    className={`text-sm font-medium transition-colors duration-300 ${
                      formFocus.email ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    Email ID
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder:text-gray-600"
                      required
                    />
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform transition-transform duration-300 ${
                        formFocus.email ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg shadow-red-900/20 relative overflow-hidden group"
                >
                  <span className="relative z-10">Submit</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

                  {/* Animated particles on hover - only render on client */}
                  {isClient && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: `rotate(${i * 72}deg) translateX(20px)`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add the needed keyframe animations to the global styles */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(10px) translateX(10px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(10px) translateX(-10px);
          }
          50% {
            transform: translateY(0) translateX(-20px);
          }
          75% {
            transform: translateY(-10px) translateX(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }

        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes move-slow {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(25%) translateY(25%);
          }
          50% {
            transform: translateX(50%) translateY(0);
          }
          75% {
            transform: translateX(25%) translateY(-25%);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes particle {
          0% {
            transform: rotate(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: rotate(0) translateX(100px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 15s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-slide-right {
          animation: slide-right 3s linear infinite;
        }

        .animate-move-slow {
          animation: move-slow 10s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 5s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
