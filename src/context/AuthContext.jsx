"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../services/api";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); // State to track loading status
  const router = useRouter(); 


  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        setLoading(false); // If no token, stop loading and do nothing
        return;
      }

      try {
        const user = localStorage.getItem("user"); // Get token from localStorage
        setUser(JSON.parse(user));
        // const res = await api.get('/auth/users');  // Fetch user data
        // setUser(res.data);  // Set user data to state
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
      console.log(payload)
      const res = await api.post("/auth/login", { ...payload });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.parse(res.data.user)); 

      setUser(res.data.user); 
      router.push("/dashboard"); 
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
    // const updated_user = {
    //   firstName,
    //   lastName,
    //   motherName,
    //   gender,
    //   dateOfBirth,
    //   religion,
    //   email,
    //   phone,
    //   position,
    //   experience,
    //   qualification,
    //   achievement,
    //   image,
    // };

    localStorage.setItem("user", updated_user); // Save token to localStorage
    setUser(updated_user); // Set the user info
  };

  // Provide context values to children components
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
