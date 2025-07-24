import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductForm from './Component/ProductForm'
import ProductList from './Component/ProductList'
import UserProfile from './Component/UserProfile'
import ProfileEditForm from './Component/ProfileEditForm'
import LoadingSpinner from './Component/LoadingSpinner'
import ErrorAlert from './Component/ErrorAlert'

const Dashboard = () => {
  // User profile state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  // Product states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // UI control states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  
  const [profileForm, setProfileForm] = useState({...profile});

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Using the public FakeStore API for demonstration
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle product form input change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };
  
  // Handle profile form input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  
  // Handle add/edit product submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      if (editingProduct) {
        // Edit existing product
        await axios.put(`https://fakestoreapi.com/products/${editingProduct.id}`, productForm);
        
        // Update local state (in a real app, you'd use the response data)
        setProducts(products.map(p => 
          p.id === editingProduct.id ? {...productForm, id: editingProduct.id} : p
        ));
        setEditingProduct(null);
      } else {
        // Add new product
        const response = await axios.post('https://fakestoreapi.com/products', productForm);
        
        // Add to local state (in a real app with a proper backend, you'd use the response data)
        setProducts([...products, {...productForm, id: Date.now()}]);
      }
      
      // Reset form
      setProductForm({
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      });
      
      // Hide the form
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError('Error saving product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle profile update submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      // In a real app, you would send this to your API
      // await axios.put('api/profile', profileForm);
      
      // Update local state
      setProfile(profileForm);
      setShowEditProfile(false);
      setError(null);
    } catch (err) {
      setError('Error updating profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle edit product
  const handleEditProduct = (product) => {
    setProductForm({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image || ''
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };
  
  // Handle delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      
      // Remove from local state
      setProducts(products.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Error deleting product. Please try again.');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle edit profile
  const handleEditProfile = () => {
    // In a real app with routing, you would use a router for navigation
    // For this example we'll just change the window location
    window.location.href = '/profile/edit';
    
    // The below code is kept for reference if we want to use the inline editing
    // setProfileForm({...profile});
    // setShowEditProfile(true);
  };
  
  // Navigate to full profile page
  const handleViewProfile = () => {
    // In a real app with routing, you would use a router for navigation
    // For this example we'll just change the window location
    window.location.href = '/profile';
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">Product Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full object-cover" src={profile.avatar} alt="User avatar" />
                  <span className="ml-2 text-sm font-medium">{profile.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header with Add Product Button */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Product Management</h2>
                    <p className="opacity-80">View and manage your product inventory</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => {
                        if (showAddForm && editingProduct) {
                          // Cancel editing
                          setEditingProduct(null);
                        }
                        setShowAddForm(!showAddForm);
                        setProductForm({
                          title: '',
                          price: '',
                          description: '',
                          category: '',
                          image: ''
                        });
                      }}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center"
                    >
                      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {showAddForm ? 'Cancel' : 'Add Product'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Add/Edit Product Form */}
            {showAddForm && (
              <ProductForm 
                product={productForm}
                onChange={handleProductChange}
                onSubmit={handleProductSubmit}
                loading={loading}
                error={error}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                }}
                isEditing={!!editingProduct}
              />
            )}

            {/* Product List or Loading State */}
            {loading && !showAddForm ? (
              <LoadingSpinner />
            ) : error && !showAddForm ? (
              <ErrorAlert message={error} />
            ) : (
              <ProductList 
                products={products} 
                onEdit={handleEditProduct} 
                onDelete={handleDeleteProduct} 
              />
            )}
          </div>

          {/* Right Column - User Profile */}
          <div>
            <UserProfile 
              profile={profile} 
              onEditProfile={handleEditProfile}
              onViewProfile={handleViewProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
