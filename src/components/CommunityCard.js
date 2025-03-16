// components/CommunityCard.js
import React from 'react';

const CommunityCard = ({ community }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-primary mb-2">{community.name}</h2>
      <p className="text-gray-600 mb-4">{community.description}</p>
      <p className="text-sm text-gray-500">Created At: {new Date(community.createdAt).toLocaleDateString()}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-primary">Members</h3>
        <ul className="list-disc list-inside">
          {community.members.map((member, index) => (
            <li key={index} className="text-gray-700">{member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunityCard;