"use client"

import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/Navbar';
import ChatWindow from '../../../components/Chat/ChatWindow';

export default function ChatPage() {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await api.get('/discussions');
        setDiscussions(res.data);
      } catch (err) {
        console.error('Failed to fetch discussions:', err);
      }
    };
    fetchDiscussions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px]">
            <div className="bg-gray-50 p-4 border-r">
              <h2 className="text-xl font-semibold mb-4">Discussions</h2>
              <div className="space-y-2">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    onClick={() => setSelectedDiscussion(discussion.id)}
                    className={`p-3 rounded cursor-pointer ${
                      selectedDiscussion === discussion.id
                        ? 'bg-blue-100'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-medium">{discussion.title}</h3>
                    <p className="text-sm text-gray-500 truncate">
                      {discussion.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {selectedDiscussion ? (
                <ChatWindow discussionId={selectedDiscussion} />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a discussion to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}