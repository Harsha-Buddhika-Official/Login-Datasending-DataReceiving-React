import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './Component/LoadingSpinner';
import ErrorAlert from './Component/ErrorAlert';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // In a real app, you would get the ID from the route params
  // For this example, we'll get a random product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Get a random product ID between 1 and 20
        const randomId = Math.floor(Math.random() * 20) + 1;
        const response = await axios.get(`https://fakestoreapi.com/products/${randomId}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching product details. Please try again.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, []);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!product) return <ErrorAlert message="Product not found" />;
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
            <h1 className="text-2xl font-bold">Product Details</h1>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="max-h-80 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
              </div>
              
              <div>
                <div className="mb-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h2>
                
                <div className="text-3xl font-bold text-indigo-600 mb-6">
                  ${Number(product.price).toFixed(2)}
                </div>
                
                <div className="text-gray-700 mb-8">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p>{product.description}</p>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center">
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="font-medium w-32">ID:</span>
                      <span>{product.id}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-32">Category:</span>
                      <span className="capitalize">{product.category}</span>
                    </li>
                    <li className="flex">
                      <span className="font-medium w-32">Rating:</span>
                      <span>
                        {product.rating && (
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span>{product.rating.rate} / 5</span>
                            <span className="text-gray-400 ml-2">({product.rating.count} reviews)</span>
                          </div>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button 
              onClick={() => window.history.back()} 
              className="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
