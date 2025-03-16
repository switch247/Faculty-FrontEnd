// pages/index.js

"use client"
import React, { useEffect, useState } from 'react';
import CommunityCard from '../../../components/CommunityCard';

const Home = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`);
      const data = await res.json();
      setCommunities(data);
    };

    fetchCommunities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary mb-8">Communities</h1>
        <div>
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;