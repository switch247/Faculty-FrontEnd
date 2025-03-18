"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../services/api";
import { setToken } from "../../../services/auth"; // Import token utility functions
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../../components/InputField"; // Import InputField component

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "student"; // Get the role from the URL
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  // Validate form fields
  const validateFields = (fields) => {
    const newErrors = {};
    const roleType = role.toLowerCase();

    if (roleType === "student" || roleType === "staff") {
      if (!fields.name) newErrors.name = "Name required";
      if (!fields.email) newErrors.email = "Email required";
    } else if (roleType === "admin") {
      if (!fields.email) newErrors.email = "Email required";
    }
    if (!fields.password) newErrors.password = "Password required";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData.entries());

    // Validate fields
    const validationErrors = validateFields(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        email: fields.email,
        name: fields.name,
        password: fields.password,
        role,
      };

      // Make API call to login
      const { data } = await api.post("/auth/login", payload);

      // Check if the user's role matches the portal they are trying to access
      if (data.user.role.toLowerCase() !== role.toLowerCase()) {
        toast.error(`You are not authorized to access the ${role} portal.`);
        setLoading(false);
        return;
      }

      // Set new token
      setToken(data.token);
      console.log("Token set in login:", data.token); // Debugging

      // Save the logged-in user's email to localStorage with a unique key
      localStorage.setItem("uniqueUserEmail", data.user.email);

      // Redirect to the appropriate role page
      router.push(`/${role}`);
    } catch (error) {
      // Handle login error
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-blue-400 to-blue-300 flex items-center justify-center p-8">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section - Form */}
        <motion.div
          className="w-full md:w-1/2 p-12 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 10px rgba(99,102,241,0.3)",
                  "0 0 20px rgba(99,102,241,0.5)",
                  "0 0 10px rgba(99,102,241,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                {role.charAt(0).toUpperCase() + role.slice(1)} Portal
              </h1>
            </motion.div>
            <p className="text-gray-600 text-lg">
              Welcome to Arbaminch Faculty Management System
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              {(role === "student" || role === "staff") && (
                <>
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    error={errors.name}
                    placeholder={`Enter ${role} name`}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    error={errors.email}
                    placeholder={`Enter ${role} email`}
                  />
                </>
              )}
              {role === "admin" && (
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  error={errors.email}
                  placeholder="Enter admin email"
                />
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                error={errors.password}
                toggle={showPassword}
                setToggle={setShowPassword}
                placeholder="Enter your password"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all relative overflow-hidden"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-6 w-6 border-4 border-white border-t-transparent rounded-full mx-auto"
                  />
                ) : (
                  <motion.span
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Sign In
                  </motion.span>
                )}
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </button>
            </motion.div>

            {role === "admin" && (
              <motion.div
                className="text-center mt-4 text-gray-600"
                variants={itemVariants}
              >
                New Admin?{" "}
                <a
                  href="/auth/signup"
                  className="text-indigo-600 hover:underline font-semibold"
                >
                  Create Account
                </a>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Right Section - Image */}
        <motion.div
          className="hidden md:block w-1/2 bg-indigo-100 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 " />
          <img
            src="/home4.JPG"
            alt="Login Visual"
            className="w-full h-full object-cover p-12 animate-float"
          />
        </motion.div>
      </motion.div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginPage;