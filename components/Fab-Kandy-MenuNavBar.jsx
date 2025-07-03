"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import cafenuwaranav_2 from '@/components/Assets/cafenuwaranav_2.png';

export const KandyMenuNavBar = () => {
  const [beveragesOpen, setBeveragesOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const router = useRouter();

  const toggleBeverages = () => setBeveragesOpen(!beveragesOpen);
  const toggleShowAll = () => setShowAllCategories(!showAllCategories);
  const closeBeverages = () => setBeveragesOpen(false);

  const handleCategoryClick = (name) => {
    const path = `/fabceylon-kandy/menu/${name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
    router.push(path);
    closeBeverages();
    setShowAllCategories(false);
  };

  const menuCategories = [
    { name: 'Appetizers', emoji: '🥗' },
    { name: 'Salads & Soups', emoji: '🥄' },
    { name: 'Pasta & Spaghetti', emoji: '🍝' },
    { name: 'Noodles', emoji: '🍜' },
    { name: 'Kottu', emoji: '🍛' },
    { name: 'Fried Rice', emoji: '🍚' },
    { name: 'Biriyani', emoji: '🥘' },
    { name: 'Signature Meals', emoji: '⭐' },
    { name: 'Add-On', emoji: '➕' },
    { name: 'Burgers', emoji: '🍔' },
    { name: 'Sandwiches & Submarines', emoji: '🥪' },
    { name: 'Bowls', emoji: '🍲' },
    { name: 'Desserts', emoji: '🍰' }
  ];

  const beverageTypes = [
    { name: 'Iced Tea & Coffee', emoji: '🧊' },
    { name: 'Hot Beverages', emoji: '☕' },
    { name: 'Bubble Tea', emoji: '🧋' },
    { name: 'Mojito', emoji: '🍃' },
    { name: 'Milk Shakes', emoji: '🥤' }
  ];

  return (
    <div className="px-4 sm:px-10 mt-6">
      <div className="relative w-full bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl shadow-lg border border-amber-200 p-6 overflow-visible">

        {/* Background image */}
        <div className="absolute inset-0 z-0 pointer-events-none pb-10 lg:pb-0 sm:pb-10">
         
        </div>

        {/* Foreground Content */}
        <div className="relative z-10">

          {/* Desktop View */}
          <div className="hidden lg:flex flex-wrap justify-center items-start gap-4 xl:gap-6">

            {menuCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="group text-center cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1 p-3 rounded-lg hover:bg-amber-100 transition-colors duration-200">
                  <span className="text-xl group-hover:scale-125 transition-transform duration-200">{category.emoji}</span>
                  <span className="text-sm font-semibold text-[#caa767] group-hover:text-amber-700 transition-colors duration-200">
                    {category.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Beverages Dropdown (floating absolute) */}
            <div className="flex flex-col items-start relative">
              <div
                className="flex flex-col items-center space-y-1 p-3 rounded-lg hover:bg-amber-100 transition-colors duration-200 cursor-pointer"
                onClick={toggleBeverages}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-xl transition-transform duration-200">🥤</span>
                  {beveragesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
                <span className="text-sm font-semibold text-[#caa767] hover:text-amber-700 transition-colors duration-200">
                  Beverages
                </span>
              </div>

              {beveragesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-amber-100 rounded-lg shadow-lg z-20">
                  {beverageTypes.map((bev, index) => (
                    <div
                      key={index}
                      onClick={() => handleCategoryClick(bev.name)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-amber-50 cursor-pointer"
                    >
                      <span className="text-lg">{bev.emoji}</span>
                      <span className="text-sm font-medium text-gray-800">{bev.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(showAllCategories
                ? [...menuCategories, ...beverageTypes]
                : menuCategories.slice(0, 4)
              ).map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category.name)}
                  className="flex items-center space-x-2 p-3 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-lg shadow-sm border border-amber-100 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  <span className="text-lg">{category.emoji}</span>
                  <span className="text-xs font-medium text-[#caa767]">{category.name}</span>
                </div>
              ))}

              {/* Show All / Hide button */}
              <div
                onClick={toggleShowAll}
                className="flex items-center justify-center p-3 bg-amber-100 rounded-lg shadow-sm border border-amber-200 cursor-pointer hover:shadow-md transition-shadow duration-200 col-span-2 sm:col-span-1"
              >
                <span className="text-xs font-semibold text-gray-800">
                  {showAllCategories ? "Hide" : "Show All"}
                </span>
                {showAllCategories ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
