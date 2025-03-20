import React from "react";

const CommunityCard = ({ community, onJoin, OnExplore }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{community.name}</h2>
      <p className="text-gray-600 mt-2">{community.description}</p>
      <div className="mt-4">
        <button
          onClick={onJoin}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Join Community
        </button>
      </div>
      {OnExplore && (
        <button
          onClick={OnExplore}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Explore Community
        </button>
      )}
    </div>
  );
};

export default CommunityCard;
