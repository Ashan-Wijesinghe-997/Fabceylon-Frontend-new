"use client";
import React from 'react';
import CafeNuwaraNavBar from '@/components/CafeNuwaraNavBar';
import { CafeNuwaraMenuNavBar } from '@/components/CafeNuwaraMenuNavBar';
import Image from 'next/image';
import Boder from '@/components/Assets/Boder.png';       // make sure path is correct
import Boder2 from '@/components/Assets/Boder2.png';
import Bugger2 from '@/components/Assets/Bugger2.jpg';
import star_icon from '@/components/Assets/star_icon.png';
import CartTop from '@/components/Assets/CartTop.png';
import Cafe_Nuwara_logo from '@/components/Assets/Cafe_Nuwara_logo.png';

const CafeNuwara = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100">
      <div className="relative">
        <CafeNuwaraNavBar />
        <CafeNuwaraMenuNavBar />
      </div>

      {/* Hero Section */}
      <div className="flex justify-center items-center py-12 px-4">
        <div className="text-center max-w-4xl">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
            <div className="hidden lg:block">
              <div className="w-32 h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <span className="text-5xl xl:text-6xl">🐘</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                <span className="text-7xl sm:text-8xl lg:text-9xl filter drop-shadow-lg">☕</span>
              </div>
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-400 rounded-full animate-pulse delay-75"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-yellow-300 rounded-full animate-bounce delay-150"></div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-orange-300 to-amber-400 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-75">
                <span className="text-5xl xl:text-6xl">🐘</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-serif uppercase tracking-wide bg-gradient-to-r from-amber-800 via-orange-700 to-amber-700 bg-clip-text text-transparent leading-tight">
              Choose <br />& <br />Enjoy...
            </h1>
            <p className="text-lg sm:text-xl text-amber-700 font-medium max-w-2xl mx-auto">
              Discover the authentic flavors of Sri Lankan cuisine in our classic cafe atmosphere
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
            <div className="text-center p-3 bg-white/80 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-amber-700">50+</div>
              <div className="text-sm text-gray-600">Menu Items</div>
            </div>
            <div className="text-center p-3 bg-white/80 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-amber-700">4.8★</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center p-3 bg-white/80 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-amber-700">15min</div>
              <div className="text-sm text-gray-600">Prep Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards and Cart Section */}
      <div className="flex flex-row justify-center items-start gap-10 mt-32 px-4 flex-wrap xl:flex-nowrap">
        {/* Card Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <div
              key={index}
              className="w-[320px] h-[700px] relative bg-[#e1d6c1] rounded-[20px] flex-col justify-start items-start inline-flex"
            >
              <Image
                className="w-[179px] h-[152px] mt-1"
                src={Boder}
                alt="Border Image"
                width={179}
                height={152}
              />
              <div className="w-[339px] h-[802px] relative">
                <Image
                  className="w-[200px] h-[200px] left-14 top-[-80px] absolute rounded-full border-4 border-[#caa767]"
                  src={Bugger2}
                  alt="Product Image"
                  width={200}
                  height={200}
                />
                <div className="left-[20px] top-[150px] absolute text-black text-3xl font-bold font-['Reem Kufi']">
                  Veg Burger
                </div>
                <div className="w-[339px] h-[87px] left-[15px] top-[200px] absolute text-black text-[15px] font-bold font-['Reem Kufi'] pr-9">
                  Juicy, seasoned chicken patties, perfect for delicious, flavorful burgers.
                </div>
                <div className="left-[15px] top-[280px] absolute justify-start items-center inline-flex">
                  {Array(4)
                    .fill(0)
                    .map((_, starIndex) => (
                      <Image
                        key={starIndex}
                        className="w-[29px] h-[29px]"
                        src={star_icon}
                        alt="Rating Star"
                        width={29}
                        height={29}
                      />
                    ))}
                </div>
              </div>
              <div className="left-[15px] top-[500px] absolute text-[#caa767] text-3xl font-bold font-['Poppins']">
                LKR 750
              </div>
              <div className="w-[150px] px-[1px] top-[540px] absolute bg-[#caa767] rounded-[20px] justify-center items-center inline-flex ml-[15px] mt-10">
                <div className="text-black text-2xl font-bold font-['Poppins']">
                  ADD
                </div>
              </div>
              <Image
                className="w-[179px] h-[152px] ml-[140px]"
                src={Boder2}
                alt="Rotated Border Image"
                width={179}
                height={152}
              />
            </div>
          ))}
        </div>

        {/* Cart Section */}
        
        <div className="w-full xl:w-auto xl:sticky xl:top-8 w-[370px] h-[700px] px-5 py-10 bg-[#e1d6c1] rounded-[20px] border-4 border-white flex flex-col items-start mt-10 xl:mt-0">
          <Image
            src={CartTop}
            alt="Cart Top"
            width={284}
            height={160}
            className="w-[250px] h-40 -mt-20 ml-10"
          />
          <div className="w-full text-black text-4xl font-bold font-['Poppins'] mb-5 ml-24 -mt-10">
            Your Cart
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={Cafe_Nuwara_logo}
              alt="Cafe Logo"
              width={360}
              height={362}
              className="w-[360px] h-[362px] opacity-25 mt-10"
            />
          </div>
          <div className="w-full text-black text-xl font-bold font-['Poppins'] mt-5">
            Sub Total Rs. 0.00
          </div>
          <div className="w-[300px] h-[72px] px-[21px] py-5 bg-[#caa767] rounded-[20px] justify-center items-center gap-2.5 inline-flex mt-10">
            <div className="text-black text-xl font-bold font-['Poppins']">
              Check OUt Rs. 0.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeNuwara;
