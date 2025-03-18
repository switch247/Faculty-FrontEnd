"use client";

import { useEffect, useState } from "react";
import api from "../../../services/api";
import NewsCard from "../../../components/News/NewsCard";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import Link from "next/link";
import Spinner from "../../../components/Spinner"; 
export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { user } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/news");

    
        const sortedNews = res.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setNews(sortedNews);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Latest News</h1>
          {user?.role === "admin" && (
            <Link href="/admin/news" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Create New Post
            </Link>
          )}
        </div>

      
        {loading ? (
          <Spinner /> 
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}