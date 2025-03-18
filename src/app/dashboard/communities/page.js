"use client"

import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';

export default function CommunitiesPage() {
  const { user } = useAuth();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await api.get('/communities');
        setCommunities(res.data);
      } catch (err) {
        console.error('Failed to fetch communities:', err);
      }
    };
    fetchCommunities();
  }, []);

  const handleJoinCommunity = async (communityId) => {
    try {
      await api.patch(`/communities/${communityId}/join`);
      window.location.reload(); // Refresh to update community status
    } catch (err) {
      alert('Failed to join community');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Faculty Communities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div key={community.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
              <p className="text-gray-600 mb-4">{community.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {community.members?.length} members
                </span>
                <button
                  onClick={() => handleJoinCommunity(community.id)}
                  className={`px-4 py-2 rounded-lg ${
                    user?.communityId === community.id
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={user?.communityId === community.id}
                >
                  {user?.communityId === community.id ? 'Joined' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}