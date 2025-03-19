"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); // Move useSearchParams here

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setLoading(false); // If no token, stop loading and do nothing
        return;
      }

      try {
        const user = localStorage.getItem("user"); // Get user from localStorage
        setUser(JSON.parse(user));
      } catch (error) {
        console.log("error", error); // Remove invalid token
      } finally {
        setLoading(false); // Stop loading once the check is done
      }
    };

    checkAuth();
  }, []);

  const login = async (payload) => {
    try {
      const role = searchParams.get("role") || "admin"; // Use searchParams here
      const res = await api.post("/auth/login", { ...payload });
console.log("respnse",res);
      // Save token and user to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Check if there's a saved profile for the user
      const savedProfile = JSON.parse(localStorage.getItem(`facultyProfile_${res.data.user.email}`));
      if (savedProfile) {
        setUser({ ...res.data.user, ...savedProfile });
      } else {
        setUser(res.data.user);
      }

      // Redirect to the role-based page
      router.push(`/${role}`);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const signup = async (userData) => {
    try {
      const res = await api.post("/auth/signup", userData);
      localStorage.setItem("token", res.data.token); // Save token to localStorage
      setUser(res.data.user); // Set the user info
      router.push("/dashboard"); // Redirect to dashboard
    } catch (error) {
      throw new Error("Registration failed"); // Handle signup errors
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
    router.push("/auth/login"); // Redirect to login page
  };

  const updateProfile = (updated_user) => {
    localStorage.setItem("user", JSON.stringify(updated_user)); // Save updated user to localStorage
    setUser(updated_user); // Update user state
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};