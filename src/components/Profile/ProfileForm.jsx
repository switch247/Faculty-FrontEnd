import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    communityId: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        age: user.age || '',
        education: user.education || '',
        communityId: user.communityId || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   
      alert('Profile updated successfully');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {/* Form fields */}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Update Profile
      </button>
    </form>
  );
}