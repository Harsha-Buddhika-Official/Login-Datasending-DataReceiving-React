import React from 'react';

const ErrorAlert = ({ message }) => {
  return (
    <div className="bg-red-100 p-4 rounded-md mb-6">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
        </svg>
        <span className="text-red-800 font-medium">{message}</span>
      </div>
    </div>
  );
};

export default ErrorAlert;
