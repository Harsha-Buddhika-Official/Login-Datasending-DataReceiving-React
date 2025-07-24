import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './Component/LoadingSpinner';
import ErrorAlert from './Component/ErrorAlert';

const ProfileEditPage = () => {
  // Initial profile data - in a real app, you'd fetch this from an API
  const [originalProfile, setOriginalProfile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
          }
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setOriginalProfile(mockProfileData);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested social fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // In a real app, you would send this to your API
      // await axios.put('/api/profile', profile);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalProfile(profile);
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error('Error saving profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original data
    setProfile(originalProfile);
    // Navigate back (in a real app with routing)
    // history.push('/dashboard');
    window.history.back();
  };

  if (loading) return <LoadingSpinner />;
  if (!profile) return <ErrorAlert message="Profile not found" />;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <button 
                onClick={handleCancel}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {error && <ErrorAlert message={error} />}
            
            {success && (
              <div className="mb-6 bg-green-100 p-4 rounded-md text-green-800 flex items-center">
                <svg className="h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Profile updated successfully!</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-32 h-32 relative">
                  <img 
                    src={profile.avatar || "https://via.placeholder.com/128"} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/128?text=No+Image";
                    }}
                  />
                  <div className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Photo</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload a new avatar or provide an image URL.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      value={profile.avatar || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
              </div>
              
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={profile.phone || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={profile.location || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
              </div>
              
              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={profile.role || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Product Manager"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={profile.department || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Marketing"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={profile.bio || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        id="twitter"
                        name="social.twitter"
                        value={profile.social?.twitter || ''}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        linkedin.com/in/
                      </span>
                      <input
                        type="text"
                        id="linkedin"
                        name="social.linkedin"
                        value={profile.social?.linkedin || ''}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        github.com/
                      </span>
                      <input
                        type="text"
                        id="github"
                        name="social.github"
                        value={profile.social?.github || ''}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="border-t border-gray-200 pt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
