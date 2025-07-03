// app/components/MenuItemCard.jsx
"use client";

import React from 'react';
import { Star, Plus, Heart } from 'lucide-react';

const MenuItemCard = ({ name, description, price, rating, image }) => {
  return (
    <div className="group w-full max-w-[320px] bg-gradient-to-br from-amber-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-amber-200">
      
      {/* Decorative Header */}
      <div className="h-4 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500"></div>
      
      {/* Card Content */}
      <div className="p-6 flex flex-col items-center space-y-4">
        
        {/* Product Image */}
        <div className="relative w-40 h-40 mb-2">
          <div className="w-full h-full rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            {image ? (
              <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-5xl filter drop-shadow-lg">🍔</span>
            )}
          </div>
          
          {/* Favorite Button */}
          <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110">
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
        
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-800 text-center font-serif group-hover:text-amber-700 transition-colors duration-200">
          {name}
        </h3>
        
        {/* Product Description */}
        <p className="text-sm text-gray-600 text-center leading-relaxed px-2 min-h-[3rem] flex items-center">
          {description}
        </p>
        
        {/* Rating Stars */}
        <div className="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 transition-all duration-200 ${
                index < rating 
                  ? 'fill-yellow-400 text-yellow-400 scale-110' 
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600 font-medium">({rating}/5)</span>
        </div>
        
        {/* Price and Add Button */}
        <div className="w-full flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-amber-700">
            LKR {price}
          </div>
          
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 group-hover:from-amber-700 group-hover:to-orange-700">
            <Plus className="w-5 h-5" />
            <span>ADD</span>
          </button>
        </div>
      </div>
      
      {/* Decorative Footer */}
      <div className="h-4 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400"></div>
    </div>
  );
};

export default MenuItemCard;
