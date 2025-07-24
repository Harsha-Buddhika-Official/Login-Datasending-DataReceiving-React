import React, { useState, useEffect } from 'react';
import LoadingSpinner from './Component/LoadingSpinner';
import ErrorAlert from './Component/ErrorAlert';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // In a real app, you would fetch from your API
        // For this example, we'll use mock data
        const mockProfileData = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          role: 'Product Manager',
          department: 'Marketing',
          location: 'New York, NY',
          bio: 'Experienced product manager with a passion for creating user-friendly solutions.',
          joinDate: 'January 2022',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          social: {
            twitter: 'johndoe',
            linkedin: 'john-doe',
            github: 'johndoe'
          },
          stats: {
            products: 42,
            followers: 128,
            following: 86
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setProfile(mockProfileData);
        setError(null);
      } catch (err) {
        setError('Failed to load profile data. Please try again.');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    // In a real app with routing
    // history.push('/profile/edit');
    
    // For demo purposes, we'll just redirect to the edit page
    window.location.href = '/profile/edit';
  };

  const handleBackToDashboard = () => {
    // In a real app with routing
    // history.push('/dashboard');
    
    window.history.back();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!profile) return <ErrorAlert message="Profile not found" />;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header / Navigation */}
        <div className="mb-8 flex justify-between items-center">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
          >
            <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          
          <button
            onClick={handleEditProfile}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-32 flex justify-center">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="h-32 w-32 rounded-full object-cover border-4 border-white mt-16"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/128?text=No+Image";
                  }}
                />
              </div>
              
              <div className="pt-16 px-6 pb-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-indigo-600 font-medium">{profile.role}</p>
                <p className="text-gray-500 text-sm mt-1">{profile.location}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="font-bold text-xl text-gray-900">{profile.stats?.products || 0}</div>
                      <div className="text-xs text-gray-500">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl text-gray-900">{profile.stats?.followers || 0}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl text-gray-900">{profile.stats?.following || 0}</div>
                      <div className="text-xs text-gray-500">Following</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Connect with {profile.name.split(' ')[0]}</h3>
                  <div className="flex justify-center space-x-4">
                    {profile.social?.twitter && (
                      <a href={`https://twitter.com/${profile.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    
                    {profile.social?.github && (
                      <a href={`https://github.com/${profile.social.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    )}
                    
                    {profile.social?.linkedin && (
                      <a href={`https://linkedin.com/in/${profile.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">About</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            </div>
            
            {/* Contact & Personal Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Contact & Personal Information</h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                    <dd className="mt-1 text-gray-900">{profile.email}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd className="mt-1 text-gray-900">{profile.phone || 'Not provided'}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-gray-900">{profile.location || 'Not specified'}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                    <dd className="mt-1 text-gray-900">{profile.joinDate}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* Work Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Work Information</h2>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                    <dd className="mt-1 text-gray-900">{profile.role}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Department</dt>
                    <dd className="mt-1 text-gray-900">{profile.department || 'Not specified'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
