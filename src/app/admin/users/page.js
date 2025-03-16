"use client";

import { UsersIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import api from '../../../services/api'; // Import the API service
import { getToken } from '../../../services/auth'; // Import token utility functions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin', // Default role
  });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken(); // Retrieve the token from localStorage
        if (!token) {
          toast.error("Unauthorized: Please log in again.");
          return;
        }

        // Fetch users from the API
        const response = await api.get('/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        // Set the fetched users to state
        setUsers(response.data.users); // Assuming the API returns an array of users under the `users` key
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError(err.message);
        toast.error(`Error: ${err.response?.data?.message || "Failed to fetch users"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        toast.error("Unauthorized: Please log in again.");
        return;
      }

      // Send a POST request to the /auth/signup endpoint
      const response = await api.post(
        '/auth/signup',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("User added successfully!");
        setIsAddUserModalOpen(false); // Close the modal
        setFormData({ name: '', email: '', password: '', role: 'admin' }); // Reset form
        // Optionally, refetch users to update the list
        const updatedUsersResponse = await api.get('/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(updatedUsersResponse.data.users);
      }
    } catch (err) {
      console.error("Failed to add user:", err);
      toast.error(`Error: ${err.response?.data?.message || "Failed to add user"}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            onClick={() => setIsAddUserModalOpen(true)} // Open the modal
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="member">Member</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)} // Close the modal
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Community
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                        user.role === 'moderator' ? 'bg-purple-100 text-purple-800' : 
                        'bg-green-100 text-green-800'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.communityId || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center">
                    <span className={`h-2 w-2 rounded-full mr-2 ${
                      user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                    }`}></span>
                    <span className="text-sm text-gray-900">{user.status || "N/A"}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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