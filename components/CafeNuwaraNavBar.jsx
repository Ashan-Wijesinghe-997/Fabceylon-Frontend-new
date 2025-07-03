"use client";

import React, { useState } from 'react';
import { Menu, X, User, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import cafenuwara_nav from '@/components/Assets/cafenuwara_nav.png';
import Nuwara_Logo_flat from '@/components/Assets/Nuwara _Logo_flat.png';

const CafeNuwaraNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Main Navigation */}
      <div className="relative rounded-[20px] overflow-hidden mx-4 sm:mx-10 mt-6 shadow-xl h-[120px] sm:h-[160px]">
        {/* Background Image */}
        <Image
          src={cafenuwara_nav}
          alt="Cafe background"
          fill
          className="object-cover opacity-50"
          priority
        />

        {/* Content on top of image */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4 sm:px-8 lg:px-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-[120px] sm:w-[180px] lg:w-[220px] h-[50px] sm:h-[70px] lg:h-[80px] rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-200">
              <Image 
                src={Nuwara_Logo_flat} 
                alt="Cafe Nuwara Logo" 
                width={180}
                height={70}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex gap-6 xl:gap-8 text-black font-serif font-semibold">
              {["menu", "order", "reservation", "register"].map((id) => (
                <a
                  key={id}
                  href={`/cafenuwara/${id}/appetizers`}
                  className="text-lg xl:text-xl hover:text-amber-300 transition-colors duration-200 relative group"
                >
                  {id === "order" ? "Place Order" : id.charAt(0).toUpperCase() + id.slice(1)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* User Icon */}
            <div className="w-[45px] h-[45px] bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-[40px] h-[40px] bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-xl shadow-2xl border border-amber-200 z-50 animate-fade-in">
          <div className="p-6 space-y-4">
            {["menu", "order", "reservation", "register"].map((id) => (
              <a
                key={id}
                href={`/cafenuwara/${id}/appetizers`}
                className="block text-lg font-semibold text-gray-800 hover:text-amber-700 transition-colors duration-200 py-2 border-b border-amber-100"
              >
                {id === "order" ? "Place Order" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <div className="pt-4 border-t border-amber-100">
              <div className="flex items-center justify-center w-full">
                <div className="w-[40px] h-[40px] bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Bar */}
      <div className="hidden sm:flex items-center justify-center space-x-8 mt-4 text-sm text-amber-700">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>Kandy, Sri Lanka</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4" />
          <span>+94 77 123 4567</span>
        </div>
      </div>
    </div>
  );
};

export default CafeNuwaraNavBar;
