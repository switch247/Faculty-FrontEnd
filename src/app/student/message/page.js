"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const StudentMessagesPage = () => {
  // Sample messages data
  const [messages, setMessages] = useState([
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
  ]);

  // Handle reply
  const handleReply = (messageId) => {
    const reply = prompt("Enter your reply:");
    if (reply) {
      alert(`Reply to message ${messageId}: ${reply}`);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📨 Messages</h2>
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">👤 {msg.sender}</h3>
                <p className="text-sm text-gray-500">🕒 {msg.timestamp}</p>
              </div>
              <p className="text-gray-700 mb-4">💬 {msg.message}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleReply(msg.id)}
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

export default StudentMessagesPage;