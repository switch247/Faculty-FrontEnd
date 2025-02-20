"use client"

import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar'
import Link from 'next/link'; 


export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin' ? 'Administrator Dashboard' : 'Faculty Dashboard'}
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Latest News</h3>
              <p className="mt-2 text-gray-600">Check the latest announcements</p>
              <Link href="/dashboard/news" className="mt-4 inline-block text-blue-600 hover:underline">
                View News →
              </Link>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Your Community</h3>
              <p className="mt-2 text-gray-600">
                {user?.community?.name || 'Not joined any community yet'}
              </p>
              <Link href="/dashboard/communities" className="mt-4 inline-block text-green-600 hover:underline">
                Manage Community →
              </Link>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Discussions</h3>
              <p className="mt-2 text-gray-600">Participate in community discussions</p>
              <Link href="/dashboard/chat" className="mt-4 inline-block text-purple-600 hover:underline">
                Join Chat →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}