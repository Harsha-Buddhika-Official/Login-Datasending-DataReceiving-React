import React from 'react';

const UserProfile = ({ profile, onEditProfile, onViewProfile }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">Profile</h3>
      </div>
      <div className="p-5">
        <div className="flex items-center space-x-5">
          <img 
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-200" 
            src={profile.avatar || "https://via.placeholder.com/100"} 
            alt="User avatar" 
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <div className="text-gray-600">{profile.email}</div>
            <div className="text-sm text-gray-500">{profile.role}</div>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          <button 
            onClick={onViewProfile}
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Full Profile
          </button>
          
          <button 
            onClick={onEditProfile}
            className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
