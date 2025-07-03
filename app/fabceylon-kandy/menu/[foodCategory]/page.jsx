'use client';

import React, { useState, useEffect } from 'react';

import MenuBack_image from '@/components/Assets/MenuBack_image.jpg';
import Bugger from '@/components/Assets/Bugger.png';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import delete_icon from '@/components/Assets/delete.png';
import { KandyMenuNavBar } from '@/components/Fab-Kandy-MenuNavBar';
import KandyMainMenuNavBar from '@/components/Fab-Kandy-MainMenuNavBar';

const getStars = (rating) => {
  const roundedRating = parseFloat(rating.toFixed(1)); 
  const fullStars = Math.floor(roundedRating);
  const fractionalStar = (roundedRating % 1).toFixed(1);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <div key={`full-${i}`} className="w-6 h-6">
        <Image src={Rating_Star} alt="Full Star" width={24} height={24} />
      </div>
    );
  }

  if (fractionalStar > 0) {
    stars.push(
      <div key={`fractional-star`} className="relative w-6 h-6 overflow-hidden">
        <Image src={Rating_Star} alt="Fractional Star" width={24} height={24} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `calc(${fractionalStar} * 100%)`,
            width: `${(1 - fractionalStar) * 100}%`,
            height: '100%',
            backgroundColor: 'black',
            zIndex: 1,
          }}
        ></div>
      </div>
    );
  }

  return stars;
};

export default function KandyMenu({ params }) {
  const { foodCategory } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/getfoods/${process.env.NEXT_PUBLIC_FAB_CEYLON_KANDY}/${foodCategory}`
        );
        setFoods(response.data);
      } catch (error) {
        toast.error('Failed to fetch foods');
      }
    };

    fetchFoods();
  }, [foodCategory]);

  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="relative z-50">
          <KandyMainMenuNavBar />
          <KandyMenuNavBar />
        </div>

        {/* Fullscreen Hero Section */}
        <div className="relative w-full h-1/2 overflow-hidden mt-10">
          <video
            src="/videos/heroVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50 z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-serif uppercase tracking-wide bg-gradient-to-r from-amber-800 via-orange-700 to-amber-700 bg-clip-text text-transparent leading-tight mb-6">
              Choose <br />& <br />Enjoy...
            </h1>
            <p className="text-lg sm:text-xl text-white font-medium max-w-2xl">
              Discover the authentic flavors of Sri Lankan cuisine in our classic cafe atmosphere
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md w-full">
              <div className="text-center p-3 bg-white/80 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-700">50+</div>
                <div className="text-sm text-gray-700">Menu Items</div>
              </div>
              <div className="text-center p-3 bg-white/80 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-700">4.8★</div>
                <div className="text-sm text-gray-700">Rating</div>
              </div>
              <div className="text-center p-3 bg-white/80 rounded-lg backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-700">15min</div>
                <div className="text-sm text-gray-700">Prep Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-black px-4 py-10 text-center">
          <h1 className="text-[#eb650f] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-['Poppins']">
            {foodCategory.replace(/-/g, ' ').toUpperCase()}
          </h1>

          <div className="text-white text-lg sm:text-xl md:text-2xl font-bold font-['Poppins'] mt-4">
            It is a good time for the great taste of {foodCategory.replace(/-/g, ' ')}
          </div>
        </div>

        {/* Food Cards */}
        <div className="bg-black px-4 sm:px-10 md:px-20 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {foods.map((food) => (
              <div
                key={food._id}
                className="w-full max-w-xs mx-auto px-6 pt-6 pb-10 bg-[#110c0c] rounded-[30px] flex flex-col items-center gap-4"
              >
                <div className="w-[180px] h-[180px] overflow-hidden rounded-full border-4 border-white">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/${food.image.replace(
                      "\\",
                      "/"
                    )}`}
                    alt={food.foodName}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Star Rating */}
                <div className="flex items-center text-white">
                  <div className="flex gap-1">{getStars(food.averageRating)}</div>
                  <span className="ml-2 text-sm font-['Poppins']">
                    <span className="text-lg font-bold">{food.averageRating.toFixed(1)}</span>
                    <span className="text-xs"> ({food.totalRatings})</span>
                  </span>
                </div>

                {/* Food Name */}
                <div className="text-white text-2xl font-bold font-['Poppins'] text-center">
                  {food.foodName
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')}
                </div>

                {/* Description */}
                <div className="text-white text-base text-center font-['Poppins']">
                  {food.description}
                </div>

                {/* Price */}
                <div className="text-[#eb650f] text-xl font-bold font-['Poppins']">
                  LKR {food.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
