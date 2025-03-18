"use client"

import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import ProfileForm from '../../../components/Profile/ProfileForm';

export default function ProfilePage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
          <ProfileForm communities={communities} />
        </div>
      </div>
    </div>
  );
}