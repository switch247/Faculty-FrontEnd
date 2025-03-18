'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

// Create a Context for authentication
const AuthContext = createContext();

// Provider component to wrap the rest of the app and provide the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // State for storing user info
  const [loading, setLoading] = useState(true);  // State to track loading status
  const router = useRouter();  // useRouter for navigation

  // Effect to check for authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');  // Get token from localStorage
      if (!token) {
        setLoading(false);  // If no token, stop loading and do nothing
        return;
      }

      try {
        const res = await api.get('/auth/users');  // Fetch user data
        setUser(res.data);  // Set user data to state
      } catch (error) {
      console.log('error',error);  // Remove invalid token
      } finally {
        setLoading(false);  // Stop loading once the check is done
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);  // Save token to localStorage
      setUser(res.data.user);  // Set the user info
      router.push('/dashboard');  // Redirect to dashboard
    } catch (error) {
      throw new Error('Invalid credentials');  // Handle login errors
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const res = await api.post('/auth/signup', userData);
      localStorage.setItem('token', res.data.token);  // Save token to localStorage
      setUser(res.data.user);  // Set the user info
      router.push('/dashboard');  // Redirect to dashboard
    } catch (error) {
      throw new Error('Registration failed');  // Handle signup errors
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setUser(null);  // Clear user state
    router.push('/auth/login');  // Redirect to login page
  };

  // Provide context values to children components
  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};