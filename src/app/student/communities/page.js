"use client";
import React, { useEffect, useState } from "react";
import CommunityCard from "../../../components/cardcommunity";
import { getToken } from "../../../services/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`);
        const data = await res.json();
        setCommunities(data);
      } catch (error) {
        console.error("Failed to fetch communities:", error);
        toast.error("Failed to load communities. Please try again.");
      }
    };

    fetchCommunities();
  }, []);

 
  const handleJoinCommunity = async (communityId) => {
    try {
      setLoading(true);
      const token = getToken();
      const user = JSON.parse(atob(token.split(".")[1])); 

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${communityId}/join`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.id }),
        }
      );

      if (res.ok) {
        toast.success("Successfully joined the community!");
    
        const updatedCommunities = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`
        ).then((res) => res.json());
        setCommunities(updatedCommunities);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to join the community.");
      }
    } catch (error) {
      console.error("Error joining community:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCommunity = async (name, description) => {
    try {
      setLoading(true);
      const token = getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (res.ok) {
        toast.success("Community created successfully!");
        // Refresh the list of communities
        const updatedCommunities = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`
        ).then((res) => res.json());
        setCommunities(updatedCommunities);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to create the community.");
      }
    } catch (error) {
      console.error("Error creating community:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-8">Communities</h1>

        {/* Create Community Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create a New Community</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const description = e.target.description.value;
              handleCreateCommunity(name, description);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Community Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              placeholder="Community Description"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Community"}
            </button>
          </form>
        </div>

        {/* List of Communities */}
        <div>
          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onJoin={() => handleJoinCommunity(community.id)}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;