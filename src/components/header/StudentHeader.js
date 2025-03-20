"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const StudentHeader = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/student">
            {/* <img
              src="/logo.png" // Replace with your logo path
              alt="Logo"
              width={120}
              height={40}
              className="cursor-pointer"
            /> */}
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          <Link href="/student/discussions/create">
            <motion.div
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg">💬</span> {/* Message icon */}
              <span className="hidden md:inline">Disscutions</span>
            </motion.div>
          </Link>

          <Link href="/student/profile">
            <motion.div
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg">👤</span> {/* Profile icon */}
              <span className="hidden md:inline">Profile</span>
            </motion.div>
          </Link>

          <Link href="/student/news">
            <motion.div
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg">📰</span> {/* News icon */}
              <span className="hidden md:inline">News</span>
            </motion.div>
          </Link>
        </nav>

        {/* Logo for Mobile */}
        <motion.div
          className="md:hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/student">
            {/* <Image
              src="/logo.png" // Replace with your logo path
              alt="Logo"
              width={80}
              height={30}
              className="cursor-pointer"
            /> */}
          </Link>
        </motion.div>
      </div>
    </header>
  );
};

export default StudentHeader;