"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AccountCircle, School, Group } from '@mui/icons-material';
import { useAuth } from '../../../context/AuthContext';

const ChooseUser = ({ visitor }) => {
  const { loginUser, user, currentRole, loading, error } = useAuth();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.5 }
    }
  };

  const handleRoleSelection = async (selectedRole) => {
    if (visitor === "guest") {
      // Demo credentials for guest access
      const credentials = {
        Admin: { email: "admin@example.com", password: "zxc" },
        Student: { rollNumber: "S123", studentName: "John Doe", password: "zxc" },
        Teacher: { email: "teacher@example.com", password: "zxc" }
      };
      await loginUser(credentials[selectedRole], selectedRole.toLowerCase());
    } else {
      router.push(`/auth/login?role=${selectedRole.toLowerCase()}`);
    }
  };

  useEffect(() => {
    if (user && currentRole) {
      router.push(`/${currentRole}/dashboard`);
    }
  }, [user, currentRole, router]);

  useEffect(() => {
    if (error) {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 flex flex-col items-center justify-center p-8 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8 max-w-4xl"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Empower Your Educational Journey
        </h1>
        <p className="text-xl text-blue-100/90 px-4">
          Transform your academic experience with our comprehensive school management platform
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-4">
        {['Admin', 'Student', 'Teacher'].map((role) => (
          <motion.div
            key={role}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="col-span-1"
          >
            <div
              onClick={() => handleRoleSelection(role)}
              className="group p-8 h-[420px] flex flex-col items-center justify-between rounded-3xl shadow-2xl
                bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                cursor-pointer text-white transform transition-all duration-300 ease-out"
            >
              <div className="space-y-8 text-center">
                <div className="inline-flex items-center justify-center rounded-full bg-white/10 p-6 group-hover:bg-white/20 transition-all">
                  {role === 'Admin' && <AccountCircle className="!w-24 !h-24" />}
                  {role === 'Student' && <School className="!w-24 !h-24" />}
                  {role === 'Teacher' && <Group className="!w-24 !h-24" />}
                </div>
                
                <h2 className="text-4xl font-bold tracking-tight">{role}</h2>
                <p className="text-lg text-blue-100/90 leading-relaxed">
                  {role === 'Admin' && 'Oversee institution operations and manage system configurations'}
                  {role === 'Student' && 'Access learning materials and track academic progress'}
                  {role === 'Teacher' && 'Develop curriculum and monitor student performance'}
                </p>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div className="w-full h-full bg-white/40 animate-progress" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-400 border-t-transparent" />
            <p className="text-2xl text-white font-medium">Securing Your Access...</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center shadow-lg"
          >
            <span className="pr-4">{error}</span>
            <button
              onClick={() => setShowPopup(false)}
              className="text-red-800 hover:text-red-600 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChooseUser;