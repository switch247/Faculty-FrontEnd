"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Homepage = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const images = [
    "/home1.jpg",
    "/home2.jpg", 
    "/home3.jpg", 
    "/home4.JPG", 
  ];


  const dimensions = [
    [1800, 1800], 
    [1800, 1800], 
    [1800, 1800], 
    [1800, 1800], 
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000); // 9 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      {/* Dark/Light Mode Toggle */}
      <motion.div
        className="fixed top-4 right-4 flex items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        <motion.div
          className="relative flex gap-0 overflow-hidden rounded-full border border-gray-300 w-28 h-12 shadow-lg"
          initial={false}
          animate={{ backgroundColor: isDark ? "#000" : "#fff" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            boxShadow: isDark
              ? "0 0 15px rgba(96, 165, 250, 0.6)"
              : "0 0 15px rgba(59, 130, 246, 0.6)",
          }}
        >
          <motion.div
            className="absolute w-12 h-12 bg-blue-600 rounded-full z-10"
            layout
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
          <div
            onClick={() => setIsDark(false)}
            className="w-12 h-12 cursor-pointer flex items-center justify-center z-20"
          >
            <span className="text-lg">☀️</span>
          </div>
          <div
            onClick={() => setIsDark(true)}
            className="w-12 h-12 cursor-pointer flex items-center justify-center z-20"
          >
            <span className="text-lg">🌙</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 h-screen flex items-center">
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="md:w-1/2"
          >
            <div className={`${isDark ? "filter invert" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt="Students"
                    width={dimensions[currentImageIndex][0]}
                    height={dimensions[currentImageIndex][1]}
                    className="w-full h-auto"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side: Text and Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 120,
            }}
            className="md:w-1/2"
          >
            <motion.h1
              className={`text-6xl font-bold mb-6 leading-tight ${
                isDark ? "text-white" : "text-blue-900"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                delay: 0.1,
              }}
            >
              Welcome to
              <br />
              <motion.span
                className="text-blue-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150,
                  delay: 0.3,
                }}
              >
                AribaMinch Faculty Management
              </motion.span>
              <br />
              System
            </motion.h1>

            <motion.p
              className={`text-xl mb-8 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                delay: 0.5,
              }}
            >
              Stay updated with real-time notifications, manage profiles for
              staff and students, and collaborate easily with live chat
              features...
            </motion.p>

            <div className="flex flex-col space-y-4">
              {/* Get Started Button */}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/choose">
                  <span
                    className={`block text-center py-4 px-8 rounded-xl font-bold text-lg transition-all ${
                      isDark
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    style={{
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                  >
                    Get Started
                  </span>
                </Link>
              </motion.div>

              {/* Register Link */}
              <motion.p
                className={`text-center ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  delay: 0.7,
                }}
              >
                Don't have an account?{" "}
                <Link href="/auth/signup">
                  <span
                    className={`font-semibold underline ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Register now
                  </span>
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;