"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const StudentProfilePage = () => {
  const router = useRouter();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    grade: "",
    class: "",
    year: "",
    semester: "",
    graduationYear: "",
  });

  // Load student data from localStorage
  useEffect(() => {
    const recentStudent = JSON.parse(localStorage.getItem("recent_student"));
    if (recentStudent) {
      setStudent(recentStudent);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile
  const handleSave = () => {
    localStorage.setItem("recent_student", JSON.stringify(student));
    alert("Profile saved successfully!");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("recent_student");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">👤 Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Email</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Grade</label>
              <input
                type="text"
                name="grade"
                value={student.grade}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Class</label>
              <input
                type="text"
                name="class"
                value={student.class}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Year</label>
              <input
                type="text"
                name="year"
                value={student.year}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Semester</label>
              <input
                type="text"
                name="semester"
                value={student.semester}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Graduation Year</label>
              <input
                type="text"
                name="graduationYear"
                value={student.graduationYear}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default StudentProfilePage;