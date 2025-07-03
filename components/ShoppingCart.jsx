// app/components/ShoppingCart.jsx
"use client";

import React from 'react';
import { ShoppingCart as CartIcon, Trash2, Plus, Minus } from 'lucide-react';

const ShoppingCart = () => {
  return (
    <div className="w-full max-w-[380px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl border-4 border-white shadow-2xl overflow-hidden">
      
      {/* Cart Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CartIcon className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Cart</h2>
          <p className="text-amber-100 text-sm mt-1">Ready to order?</p>
        </div>
      </div>
      
      {/* Cart Content */}
      <div className="p-6">
        
        {/* Empty Cart State */}
        <div className="text-center py-8">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 opacity-60">
            <span className="text-5xl">☕</span>
          </div>
          <p className="text-gray-600 text-lg font-medium mb-2">Your cart is empty</p>
          <p className="text-gray-500 text-sm">Add some delicious items to get started!</p>
        </div>
        
        {/* Cart Summary */}
        <div className="space-y-4 border-t border-amber-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Subtotal:</span>
            <span className="text-xl font-bold text-amber-700">Rs. 0.00</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Delivery Fee:</span>
            <span>Rs. 150.00</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Service Charge:</span>
            <span>Rs. 50.00</span>
          </div>
          
          <div className="border-t border-amber-200 pt-3 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-amber-700">Rs. 0.00</span>
          </div>
          
          {/* Checkout Button */}
          <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 mt-6">
            <CartIcon className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </button>
          
          {/* Promo Code */}
          <div className="mt-4">
            <input 
              type="text" 
              placeholder="Enter promo code" 
              className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 transition-colors duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
