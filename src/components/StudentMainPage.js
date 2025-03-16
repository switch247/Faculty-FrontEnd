"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const StudentMainPage = () => {
  // Sample news data
  const recentNews = [
    {
      id: 1,
      title: "New Semester Schedule Released",
      date: "2023-10-15",
      content: "The schedule for the upcoming semester is now available. Check it out!",
    },
    {
      id: 2,
      title: "Scholarship Applications Open",
      date: "2023-10-10",
      content: "Apply for scholarships before the deadline on November 1st.",
    },
    {
      id: 3,
      title: "Campus Maintenance Notice",
      date: "2023-10-05",
      content: "There will be maintenance work on campus from October 20th to 25th.",
    },
  ];

  // Sample messages data
  const messages = [
    {
      id: 1,
      sender: "Professor Smith",
      message: "Don't forget to submit your assignment by Friday.",
      timestamp: "2023-10-14 10:30 AM",
    },
    {
      id: 2,
      sender: "Class Representative",
      message: "The class meeting is rescheduled to next Monday.",
      timestamp: "2023-10-13 03:15 PM",
    },
    {
      id: 3,
      sender: "Library",
      message: "Your requested book is now available for pickup.",
      timestamp: "2023-10-12 09:00 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Recent News Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Recent News</h2>
        <div className="space-y-4">
          {recentNews.map((news) => (
            <motion.div
              key={news.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-700">{news.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{news.date}</p>
              <p className="text-gray-700">{news.content}</p>
            </motion.div>
          ))}
        </div>
        <Link href="/student/news">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            More News
          </motion.button>
        </Link>
      </motion.section>

      {/* Messaging Room Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Messages</h2>
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">{msg.sender}</h3>
                <p className="text-sm text-gray-500">{msg.timestamp}</p>
              </div>
              <p className="text-gray-700 mb-4">{msg.message}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reply
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default StudentMainPage;