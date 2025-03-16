"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../services/api";
import { getToken, removeToken } from "../../../services/auth"; // Import token utility functions
import "react-toastify/dist/ReactToastify.css";

export default function CreateNewsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!title || !content) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }
  
    try {
      const token = getToken();
      console.log("Token from CreateNewsPage:", token);
  
      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        router.push("/auth/login");
        return;
      }
  
      // Log the request body and headers for debugging
      console.log("Request Body:", { title, content });
      console.log("Request Headers:", {
        Authorization: `Bearer ${token}`,
      });
  
      const res = await api.post(
        "/news",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.status === 201) {
        toast.success("News created successfully!");
        router.push("/auth/choose");
      }
    } catch (err) {
      console.error("Failed to create news:", err);
  
      if (err.response) {
        console.error("Server response:", err.response.data);
        if (err.response.status === 401) {
          toast.error("Unauthorized: Please log in again.");
          removeToken();
          router.push("/auth/login");
        } else if (err.response.status === 400) {
          toast.error(`Bad Request: ${err.response.data.message || "Invalid input"}`);
        } else if (err.response.status === 500) {
          toast.error("Server error: Please try again later.");
        } else {
          toast.error(`Error: ${err.response.data.message || "Something went wrong"}`);
        }
      } else if (err.request) {
        toast.error("Network error: Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
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
}