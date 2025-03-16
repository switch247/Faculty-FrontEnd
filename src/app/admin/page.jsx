"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CountUp from 'react-countup';
import {
  UsersIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';
import stats from '../../services/sats';

// Mock data for charts
const userData = [
  { name: 'Active', value: 2400 },
  { name: 'Inactive', value: 456 },
];

const communityData = [
  { name: 'Tech', members: 4000 },
  { name: 'Sports', members: 3000 },
  { name: 'Education', members: 2000 },
];

const messageData = [
  { month: 'Jan', count: 400 },
  { month: 'Feb', count: 300 },
  { month: 'Mar', count: 600 },
  { month: 'Apr', count: 800 },
];

const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Users', icon: UsersIcon, href: '/admin/users', current: false },
    { name: 'Communities', icon: UserGroupIcon, href: '/admin/communities', current: false },
    // { name: 'Messages', icon: ChatBubbleLeftRightIcon, href: '/admin/messages', current: false },
    { name: 'News', icon: NewspaperIcon, href: '/admin/news', current: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => setIsOpen(false)} />
        <div className="relative bg-white w-64 min-h-screen p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                <item.icon className="h-6 w-6 mr-3" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white border-r p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <item.icon className="h-6 w-6 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-6">
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value]) => {
            const navItem = navigation.find(n => n.name.toLowerCase() === key);
            return (
              <div
                key={key}
                onClick={() => router.push(`/admin/${key}`)}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-blue-50 hover:border-blue-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 capitalize">{key}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      <CountUp end={value} duration={2} />
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {navItem?.icon && (
                      <navItem.icon className="h-8 w-8 text-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Stats</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Distribution Pie Chart */}
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">User Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Community Growth Line Chart */}
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Community Growth</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={communityData}>
                    <Line 
                      type="monotone" 
                      dataKey="members" 
                      stroke="#3B82F6" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Message Activity Bar Chart */}
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-medium mb-4">Message Activity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageData}>
                    <Bar dataKey="count" fill="#60A5FA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <UsersIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Communities</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <NewspaperIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending News</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;