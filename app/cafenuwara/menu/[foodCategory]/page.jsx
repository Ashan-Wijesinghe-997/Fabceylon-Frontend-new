"use client";
import React, { useState, useEffect, use } from "react";
import CafeNuwaraNavBar from "@/components/CafeNuwaraNavBar";
import { CafeNuwaraMenuNavBar } from "@/components/CafeNuwaraMenuNavBar";
import Image from "next/image";
import Boder from "@/components/Assets/Boder.png";
import Boder2 from "@/components/Assets/Boder2.png";
import star_icon from "@/components/Assets/star_icon.png";
import axios from "axios";
import toast from "react-hot-toast";
import CafeNuwaraHero_Image from "@/components/Assets/CafeNuwaraHero_Image.png";

const getStars = (rating) => {
  const roundedRating = parseFloat(rating.toFixed(1));
  const fullStars = Math.floor(roundedRating);
  const fractionalStar = (roundedRating % 1).toFixed(1);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <div key={`full-${i}`} className="w-6 h-6">
        <Image src={star_icon} alt="Full Star" width={24} height={24} />
      </div>
    );
  }

  if (fractionalStar > 0) {
    stars.push(
      <div key={`fractional-star`} className="relative w-6 h-6 overflow-hidden">
        <Image src={star_icon} alt="Fractional Star" width={24} height={24} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `calc(${fractionalStar} * 100%)`,
            width: `${(1 - fractionalStar) * 100}%`,
            height: "100%",
            backgroundColor: "black",
            zIndex: 1,
          }}
        ></div>
      </div>
    );
  }

  return stars;
};

export default function CafeNuwara({ params }) {
  const { foodCategory } = use(params);
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cafe-nuwara-cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/getfoods/${process.env.NEXT_PUBLIC_CAFE_NUWARA}/${foodCategory}`
        );
        setFoods(response.data);
      } catch (error) {
        toast.error("Failed to fetch foods");
      }
    };

    fetchFoods();
  }, [foodCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100">
      <div className="relative z-50">
        <CafeNuwaraNavBar />
        <CafeNuwaraMenuNavBar />
      </div>

      {/* Fullscreen Hero Section */}
      <div className="relative w-full h-screen overflow-hidden mt-10">
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

      {/* Food Category Title Section with Decorative Images */}
      <div className="relative mt-24">
        {/* Decorative Images */}
        <div className="absolute top-[-80px] left-10 hidden lg:block animate-spin-slow-reverse z-30">
          <div className="w-44 h-44 xl:w-52 xl:h-52 rounded-full overflow-hidden">
            <Image
              src={CafeNuwaraHero_Image}
              alt="Cafe Nuwara Hero Left"
              width={208}
              height={208}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="absolute top-[-80px] right-10 hidden lg:block animate-spin-slow z-30">
          <div className="w-44 h-44 xl:w-52 xl:h-52 rounded-full overflow-hidden">
            <Image
              src={CafeNuwaraHero_Image}
              alt="Cafe Nuwara Hero Right"
              width={208}
              height={208}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="text-[#000000] text-5xl font-bold font-['Poppins'] text-center">
          <h1>{foodCategory.replace(/-/g, " ").toUpperCase()}</h1>
          <div className="text-black text-2xl font-bold font-['Poppins'] mt-10">
            It is a good time for the great taste of {foodCategory}
          </div>
        </div>
      </div>

      {/* Cards and Cart Container */}
      <div className="flex flex-row items-start justify-center gap-10 mt-32">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={food._id}
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
                <div className="w-[200px] h-[200px] left-14 top-[-80px] absolute overflow-hidden rounded-full border-4 border-[#caa767] mx-auto">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/${food.image.replace("\\", "/")}`}
                    alt={food.foodName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="left-[20px] top-[150px] absolute text-black text-3xl font-bold font-['Reem Kufi']">
                  {food.foodName
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ")}
                </div>
                <div className="flex items-center mt-4 text-black">
                  <div className="flex gap-1">{getStars(food.averageRating)}</div>
                  <span className="ml-2 text-sm font-['Poppins']">
                    <span className="text-lg font-bold">{food.averageRating.toFixed(1)}</span>{" "}
                    <span className="text-xs">({food.totalRatings})</span>
                  </span>
                </div>
                <div className="w-[339px] h-[87px] left-[15px] top-[200px] absolute text-black text-[15px] font-bold font-['Reem Kufi'] pr-9">
                  {food.description}
                </div>
                <div className="left-[15px] top-[280px] absolute justify-start items-center inline-flex">
                  {Array(food.rating || 4)
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
              <div className="left-[15px] top-[500px] absolute text-[#bb995b] text-3xl font-bold font-['Poppins']">
                LKR {food.price}
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
      </div>
    </div>
  );
}
