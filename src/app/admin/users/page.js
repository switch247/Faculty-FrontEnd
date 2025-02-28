"use client";

import { UsersIcon, PlusIcon } from '@heroicons/react/24/outline';

const users = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Admin',
    community: 'Tech Enthusiasts',
    status: 'Active',
    joined: '2023-01-15'
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'Member',
    community: 'Design Collective',
    status: 'Inactive',
    joined: '2023-03-22'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'Moderator',
    community: 'Digital Artists',
    status: 'Active',
    joined: '2023-02-10'
  },
  // Add more mock users as needed
];

export default function UsersPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <UsersIcon className="h-6 w-6 mr-2 text-blue-600" />
            User Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all registered users including their details and community information
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Community
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : 
                      user.role === 'Moderator' ? 'bg-purple-100 text-purple-800' : 
                      'bg-green-100 text-green-800'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.community}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center">
  <span className={`h-2 w-2 rounded-full mr-2 ${
    user.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'
  }`}></span>
  <span className="text-sm text-gray-900">{user.status}</span>
</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.joined).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}