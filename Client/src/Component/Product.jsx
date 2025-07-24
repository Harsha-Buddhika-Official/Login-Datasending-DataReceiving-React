import React from 'react';

const Product = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
        <img 
          src={product.image || "https://via.placeholder.com/150"} 
          alt={product.title} 
          className="object-contain h-full w-full p-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-full truncate max-w-[120px]">
            {product.category}
          </span>
          <span className="text-lg font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
        </div>
        <h3 className="mt-2 text-md font-medium text-gray-800 line-clamp-2 h-12">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-3 h-14">{product.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <button 
            onClick={() => onEdit(product)}
            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product.id)}
            className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
