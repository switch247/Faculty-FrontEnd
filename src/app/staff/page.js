"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from '../../context/AuthContext';

export default function FacultyProfile({ userEmail }) {
  const {user , updateProfile}=useAuth();
  const [filter, setFilter] = useState('basic'); 
  const [editMode, setEditMode] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [isAuthorized, setIsAuthorized] = useState(false); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [religion, setReligion] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [achievement, setAchievement] = useState('');
  const [image, setImage] = useState(null);

  
useEffect(()=>{
  if(userEmail){
      if(userEmail === user?.email) {
        setIsAuthorized(true);

        const savedProfile=JSON.parse(localStorage.getItem(`facultyProfile_${userEmail}`));

        if(savedProfile){
          setFirstName(savedProfile.firstName || '');
          setLastName(savedProfile.lastName || '');
          setMotherName(savedProfile.motherName || '');
          setGender(savedProfile.gender || '');
          setDateOfBirth(savedProfile.dateOfBirth || '');
          setReligion(savedProfile.religion || '');
          setEmail(savedProfile.email || '');
          setPhone(savedProfile.phone || '');
          setPosition(savedProfile.position || '');
          setExperience(savedProfile.experience || '');
          setQualification(savedProfile.qualification || '');
          setAchievement(savedProfile.achievement || '');
          setImage(savedProfile.image || null);
        }



  } else {
    setIsAuthorized(false);
    // Reset form fields if the user is not authorized
    setFirstName('');
    setLastName('');
    setMotherName('');
    setGender('');
    setDateOfBirth('');
    setReligion('');
    setEmail('');
    setPhone('');
    setPosition('');
    setExperience('');
    setQualification('');
    setAchievement('');
    setImage(null);
  }
}
},[userEmail,user]);

 
const handleSave = (e) => {
  e.preventDefault();
  if (userEmail === user?.email) {
    const profileData = {
      firstName,
      lastName,
      motherName,
      gender,
      dateOfBirth,
      religion,
      email,
      phone,
      position,
      experience,
      qualification,
      achievement,
      image,
    };

   
    updateProfile({ ...user, ...profileData });
    setEditMode(false);
    toast.success('Profile saved successfully!');
  }
};

 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`bg-white w-64 p-4 border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black">Staff Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/staff/create"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>create disscutions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/staff/news"
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>News</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
      
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-md z-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

       
        <div className="bg-white p-8 rounded-lg shadow-md">
       
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-gray-200">
              {image ? (
                <img src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">Welcome, {firstName || 'User'}</h1>
              <p className="text-gray-600">{position || 'Position'}</p>
            </div>
          </div>

       
          <div className="mb-8">
            <input
              type="file"
              
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700"
            >
              Upload Image
            </label>
          </div>

      
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setFilter('basic')}
              className={`px-4 py-2 rounded-md ${
                filter === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setFilter('contact')}
              className={`px-4 py-2 rounded-md ${
                filter === 'contact' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Contact Info
            </button>
            <button
              onClick={() => setFilter('qualification')}
              className={`px-4 py-2 rounded-md ${
                filter === 'qualification' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Qualification
            </button>
            <button
              onClick={() => setFilter('achievement')}
              className={`px-4 py-2 rounded-md ${
                filter === 'achievement' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Achievement
            </button>
          </div>

        
          {filter === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mothers Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{motherName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  {editMode ? (
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{gender}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{dateOfBirth}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Religion</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{religion}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contact Info Section */}
          {filter === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{position}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{experience}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Qualification Section */}
          {filter === 'qualification' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Qualification</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{qualification}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Achievement Section */}
          {filter === 'achievement' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Achievement</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => setAchievement(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded-md text-black">{achievement}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Edit and Save Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-green-500"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}