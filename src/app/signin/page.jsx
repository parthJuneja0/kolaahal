"use client";
import { useState, useEffect, useContext } from "react";

import { Uncial_Antiqua, Nanum_Gothic } from "next/font/google";
const uncialAntiqua = Uncial_Antiqua({ subsets: ["latin"], weight: ["400"] });
const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });
import Image from "next/image";
import {
  equalTo,
  get,
  orderByChild,
  push,
  query,
  ref,
} from "firebase/database";
import { db } from "../../../firebase.config";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userContext } from "@/context/userContext";

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
  const router = useRouter();
  const { userData, userId, setUserId } = useContext(userContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [signInOrSignUp, setSignInOrSignUp] = useState("sign-in");
  const [processVerification, setProcessVerification] = useState(false);
  const [otp, setOtp] = useState();

  const toggleSignInOrSignUp = () => {
    setSignInOrSignUp(signInOrSignUp === "sign-in" ? "sign-up" : "sign-in");
  };

  const [formFocus, setFormFocus] = useState({
    name: "",
    email: "",
    password: "",
    OTP: "",
  });

  // Track if we're in the browser
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  // Only run useEffect on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (processVerification) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [processVerification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "OTP") {
      setOtp(value);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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

    if (signInOrSignUp === "sign-up") {
      if (field === "contactNo" && formData.contactNo.length !== 10) {
        setError("Phone number must be exactly 10 digits");
      } else if (field === "password") {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
          setError(
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
          );
        } else {
          setError("");
        }
      } else {
        setError("");
      }
    }
  };

  const toggleEmailModal = () => {
    setEmailModalOpen(!emailModalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (signInOrSignUp === "sign-in") {
      try {
        const formRef = ref(db, "users");
        const emailQuery = query(
          formRef,
          orderByChild("email"),
          equalTo(formData.email)
        );

        const snapshot = await get(emailQuery);

        if (snapshot.exists()) {
          const [userId, userData] = Object.entries(snapshot.val())[0]; // Get ID and data
          const storedHashedPassword = userData.password;

          // Compare hashed password with entered password
          const isMatch = await bcrypt.compare(
            formData.password,
            storedHashedPassword
          );

          if (isMatch) {
            setUserId(userId);
            console.log("User ID:", userId);
          } else {
            setError("Incorrect password. Please try again.");
          }
        } else {
          setError("Account not found. Please create your account.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("Something went wrong. Please try again.");
      }
    } else {
      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(formData.password)) {
        setError(
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
        );
        return;
      }
      setEmailModalOpen(true);
    }
  };

  useEffect(() => {
    if (!userId) return;
    router.push("/");
  }, [userId]);

  const handleSignUp = async () => {
    setEmailModalOpen(false);
    try {
      const formRef = ref(db, "users");
      const emailQuery = query(
        formRef,
        orderByChild("email"),
        equalTo(formData.email)
      );

      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        setError("Your account has already been created.");
      } else {
        setProcessVerification(true);

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash the OTP before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp, salt);

        // Store the hashed OTP and timestamp in localStorage
        localStorage.setItem("otpHash", hashedOtp);
        localStorage.setItem("otpUpdateTimestamp", Date.now().toString());

        const response = await axios.post("/api/send-otp", {
          email: formData.email,
          name: formData.name,
          otp: otp, // Sending plain OTP to the API
        });

        console.log("Response from API:", response.data);

        if (response.data.success) {
          setMessage(`OTP has been sent to ${formData.email}. Please verify your email
                  to continue.`);
          setError("");

          // Hash the password before saving it
          const passwordSalt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(
            formData.password,
            passwordSalt
          );
          // Store the hashed password in state
          setPasswordHash(hashedPassword);
        } else {
          setError(response.data.error);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();

    const storedHashedOtp = localStorage.getItem("otpHash");
    const otpTimestamp = localStorage.getItem("otpUpdateTimestamp");

    if (!storedHashedOtp || !otpTimestamp) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    // Convert timestamp to number and check expiry
    const currentTime = Date.now();
    const timeDifference = currentTime - parseInt(otpTimestamp, 10);

    if (timeDifference > 300000) {
      console.log("OTP expired. Clearing stored OTP.");
      localStorage.removeItem("otpHash");
      localStorage.removeItem("otpUpdateTimestamp");
      setError("OTP has expired. Please request a new one.");
      return;
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, storedHashedOtp);

    if (isMatch) {
      // Remove OTP from localStorage
      localStorage.removeItem("otpHash");
      localStorage.removeItem("otpUpdateTimestamp");

      setProcessVerification(false);

      // Store user data in the database
      const formRef = ref(db, "users");
      push(formRef, {
        ...formData,
        password: passwordHash, // Store hashed password
        timestamp: Date.now(),
        activityCount: 0,
      })
        .then((snapshot) => {
          if (snapshot) {
            setUserId(snapshot.key);
          }
        })
        .catch((error) => {
          setError("Error saving data. Please try again.");
          console.error("Error uploading data:", error);
        });
    } else {
      setError("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-4">Alert ⚠️</h2>
            <p className="text-gray-700 mb-4">
              Please use your college email for event participation. Failure to
              do so may affect your winnings.
            </p>
            <button
              onClick={() => toggleEmailModal()}
              className="bg-transparent text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:translate-y-[-2px] focus:outline-none cursor-pointer ring-1 ring-red-500 focus:ring-opacity-50 mr-4"
            >
              Close
            </button>
            <button
              className="bg-red-700  hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:translate-y-[-2px] focus:outline-none cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              onClick={() => handleSignUp()}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

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

      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.2)] bg-amber-100 relative z-10">
        {/* Left Panel - Decorative */}
        <Image
          src={"/assets/kolaahal.png"}
          width={400}
          height={400}
          alt="Kolaahal"
          className="w-96"
        />

        {/* Right Panel - Form */}
        <div className="md:w-3/5 p-10 relative">
          <div className="absolute top-0 right-0 w-full h-full bg-amber-100 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>

          {/* Subtle animated light effect */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-red-500/5 to-transparent rounded-full animate-move-slow"
              style={{ animationDuration: "20s" }}
            ></div>
          </div>

          <div className="relative z-10 flex justify-evenly items-center flex-col h-full">
            <div className="inline-block relative">
              <h1
                className={`text-4xl ${uncialAntiqua.className} font-extrabold text-gray-600`}
              >
                Kolaahal<span className="text-red-500">2025</span>
              </h1>
              <div
                className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-700 mt-2 animate-pulse"
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
            {!processVerification ? (
              <form onSubmit={handleSubmit} className="space-y-8 w-full">
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 ${
                    signInOrSignUp === "sign-in" ? "gap-6" : "gap-4"
                  } mb-2`}
                >
                  {/* User Name */}
                  {signInOrSignUp === "sign-up" && (
                    <div className="space-y-1 md:col-span-2 group">
                      <label
                        htmlFor="name"
                        className={`text-sm font-medium transition-colors duration-300 ${
                          formFocus.name ? "text-red-400" : "text-gray-700"
                        }`}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus("name")}
                          onBlur={() => handleBlur("name")}
                          className="w-full px-4 py-3 rounded-lg border bg-gray-800/30 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder:text-gray-600"
                          required
                        />
                        <div
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform transition-transform duration-300 ${
                            formFocus.name ? "scale-x-100" : "scale-x-0"
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-1 md:col-span-2 group">
                    <label
                      htmlFor="email"
                      className={`text-sm font-medium transition-colors duration-300 ${
                        formFocus.email ? "text-red-400" : "text-gray-700"
                      }`}
                    >
                      College Email ID
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
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

                  {/* Password */}
                  <div className="space-y-1 md:col-span-2 group">
                    <label
                      htmlFor="password"
                      className={`text-sm font-medium transition-colors duration-300 ${
                        formFocus.password ? "text-red-400" : "text-gray-700"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => handleFocus("password")}
                        onBlur={() => handleBlur("password")}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder:text-gray-600"
                        required
                      />
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform transition-transform duration-300 ${
                          formFocus.password ? "scale-x-100" : "scale-x-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="text-blue-500 hover:underline text-sm float-right cursor-pointer"
                  onClick={() => toggleSignInOrSignUp()}
                >
                  {signInOrSignUp === "sign-in" ? "Create Account" : "Sign In"}
                </div>
                <div className="w-full text-sm text-red-500 space-y-1 md:col-span-2 group pr-16">
                  {error}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:translate-y-[-2px] focus:outline-none cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg shadow-red-900/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {" "}
                      {signInOrSignUp === "sign-in"
                        ? "Sign In"
                        : "Verify Email"}
                    </span>
                    {isClient && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-particle"
                            style={{
                              left: "50%",
                              top: "50%",
                              transform: `rotate(${
                                i * 72
                              }deg) translateX(20px)`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-8 w-full" onSubmit={handleSubmitOTP}>
                <p>{message || `Sending OTP to ${formData.email} `}</p>
                {message && (
                  <p className="text-sm text-red-500">
                    OTP will be expired in 5 min.
                  </p>
                )}
                <div className="space-y-1 md:col-span-2 group mb-2">
                  <label
                    htmlFor="OTP"
                    className={`text-sm font-medium transition-colors duration-300 ${
                      formFocus.OTP ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    Enter OTP
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="OTP"
                      name="OTP"
                      placeholder="Enter your 6-digit OTP"
                      value={otp || ""}
                      onChange={handleChange}
                      onFocus={() => handleFocus("OTP")}
                      onBlur={() => handleBlur("OTP")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/30 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder:text-gray-600"
                      required
                    />
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform transition-transform duration-300 ${
                        formFocus.OTP ? "scale-x-100" : "scale-x-0"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="w-full text-sm text-red-500 space-y-1 md:col-span-2 group">
                  {error}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-800 hover:to-red-950 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:translate-y-[-2px] focus:outline-none cursor-pointer focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 shadow-lg shadow-red-900/20 relative overflow-hidden group"
                >
                  <span className="relative z-10">Submit</span>
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
              </form>
            )}
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
