"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../../services/api";
import { getToken, removeToken } from "../../../../services/auth";
import "react-toastify/dist/ReactToastify.css";

export default function CreateDiscussionPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const token = getToken();
        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          router.push("/auth/login");
          return;
        }

        const res = await api.get("/communities", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setCommunities(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch communities:", err);
        if (err.response && err.response.status === 401) {
          toast.error("Unauthorized: Please log in again.");
          removeToken();
          router.push("/auth/login");
        } else {
          toast.error("Failed to fetch communities. Please try again later.");
        }
      }
    };

    fetchCommunities();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content || !communityId) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        router.push("/auth/login");
        return;
      }

      const user = JSON.parse(atob(token.split(".")[1])); // Decode token to get user info
      const authorId = user.id;

      const res = await api.post(
        "/discussions",
        { title, content, authorId, communityId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Discussion created successfully!");
        // Use the discussion ID from the response for routing
        router.push(`/student/discussions/${res.data.id}/chat`);
      }
    } catch (err) {
      console.error("Failed to create discussion:", err);

      if (err.response) {
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
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-black mb-8">Create New Discussion</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-black">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="community" className="block text-sm font-medium text-black">
                Community
              </label>
              <select
                id="community"
                value={communityId}
                onChange={(e) => setCommunityId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              >
                <option value="">Select a community</option>
                {communities.map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Discussion"}
              </button>
            </div>
          </form>
        </div>
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