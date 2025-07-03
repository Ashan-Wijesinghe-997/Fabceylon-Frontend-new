"use client";
import React, { useState, useEffect, use } from "react";
import CafeNuwaraNavBar from "@/components/CafeNuwaraNavBar";
import { CafeNuwraOrderNavBar } from "@/components/CafeNuwaraOrderNavBar";
import Image from "next/image";
import Boder from "@/components/Assets/Boder.png";
import Boder2 from "@/components/Assets/Boder2.png";
import star_icon from "@/components/Assets/star_icon.png";
import axios from "axios";
import toast from "react-hot-toast";
import CartTop from '@/components/Assets/CartTop.png'
import Cafe_Nuwara_logo from '@/components/Assets/Cafe_Nuwara_logo.png'
import Link from "next/link";
import CafeNuwaraHero_Image from "@/components/Assets/CafeNuwaraHero_Image.png";

const getStars = (rating) => {
  const roundedRating = parseFloat(rating.toFixed(1)); 
  const fullStars = Math.floor(roundedRating); // Full stars
  const fractionalStar = (roundedRating % 1).toFixed(1); // Get fractional part

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <div key={`full-${i}`} className="w-6 h-6">
        <Image src={Rating_Star} alt="Full Star" width={24} height={24} />
      </div>
    );
  }

  // Add fractional star based on the decimal value
  if (fractionalStar > 0) {
    stars.push(
      <div key={`fractional-star`} className="relative w-6 h-6 overflow-hidden">
        {/* Full star in the background */}
        <Image src={Rating_Star} alt="Fractional Star" width={24} height={24} />
        {/* Overlay part based on fractional value */}
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

export default function CafeNuwara({ params }) {
  const { foodCategory } = use(params);
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cafe-nuwara-cart')) || [];
    setCartItems(storedCart);
  }, []);

  
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/order/orderfoods/${process.env.NEXT_PUBLIC_CAFE_NUWARA}/${foodCategory}`
        );
        setFoods(response.data);
      } catch (error) {
        toast.error('Failed to fetch foods');
      }
    };

    fetchFoods();
  }, [foodCategory]);

  const handleAddToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem('cafe-nuwara-cart')) || [];
    const existingItem = cart.find((item) => item._id === food._id);

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      cart.push({ ...food, quantity: 1 }); 
    }

    localStorage.setItem('cafe-nuwara-cart', JSON.stringify(cart));
    setCartItems(cart);
  };
  
  const handleIncreaseQuantity = (foodId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === foodId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem('cafe-nuwara-cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (foodId) => {
    const updatedCart = cartItems
      .map((item) =>
        item._id === foodId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem('cafe-nuwara-cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDeleteFromCart = (foodId) => {
    const updatedCart = cartItems.filter((item) => item._id !== foodId);
    localStorage.setItem('cafe-nuwara-cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100">
      <div className="relative z-50">
        <CafeNuwaraNavBar />
        <CafeNuwraOrderNavBar />
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
        {/* Card Grid Section */}
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
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/${food.image.replace(
                      "\\",
                      "/"
                    )}`}
                    alt={food.foodName}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="left-[20px] top-[150px] absolute text-black text-3xl font-bold font-['Reem Kufi']">
                  {food.foodName
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </div>

                {/* Star Rating and Total Ratings */}
                <div className="flex items-center mt-4 text-black">
                  <div className="flex gap-1">{getStars(food.averageRating)}</div>
                  <span className="ml-2 text-sm font-['Poppins']">
                    <span className="text-lg font-bold">
                      {food.averageRating.toFixed(1)}
                    </span>{" "}
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
        {/* Cart Section */}
        <div className="w-[370px] h-[700px] px-5 py-10 bg-[#e1d6c1] rounded-[20px] border-4 border-white flex flex-col items-start">
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
          <div className="flex items-center justify-center ">
                    <Image 
            src={Cafe_Nuwara_logo}
            alt="Placeholder Image" 
            width={360} 
            height={362} 
            className="w-[360px] h-[362px opacity-25 mt-10" 
          />
                    </div>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between w-full mb-4"
            >
              <span className="text-xl font-bold">{item.foodName}</span>
              <div className="flex items-center gap-2">
                <button
                                      onClick={() => handleDecreaseQuantity(item._id)}
                                      className="px-2 py-1 font-extrabold text-black"
                                    >
                                      -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                      onClick={() => handleIncreaseQuantity(item._id)}
                                      className="px-2 py-1 font-extrabold text-black"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span>Rs. {item.price * item.quantity}</span>
                                    <Image
                                      src={delete_icon}
                                      alt="Delete"
                                      className="w-6 h-6 cursor-pointer filter brightness-0"
                                      onClick={() => handleDeleteFromCart(item._id)}
                                    />
                                  </div>
              
            </div>
          ))}
          <div className="w-full text-black text-xl font-bold font-['Poppins'] mt-5">
            Sub Total Rs. {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </div>
          <button className="w-[320px] h-[72px] px-[21px] py-5 bg-[#caa767] rounded-[20px] justify-center items-center mt-3">
            <Link 
              href="/cafenuwara/order/checkout" 
              className="text-lg font-bold text-black">
              Checkout
            </Link>
          </button>

        </div>
      </div>
    </div>
  );
}
    
    
  