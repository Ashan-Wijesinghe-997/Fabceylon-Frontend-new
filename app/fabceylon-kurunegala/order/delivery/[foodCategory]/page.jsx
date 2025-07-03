'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MenuBack_image from '@/components/Assets/MenuBack_image.jpg';
import delete_icon from '@/components/Assets/delete.png';
import Rating_Star from '@/components/Assets/rating_star.png';
import { KurunagalaMenuNabBar } from '@/components/Fab-Kurunegala-Dilvery-Navbar';
import KurunagalMainNavBar from '@/components/Fab-Kurunegala-Main-Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const foodCategory = params.foodCategory;
  const [cartItems, setCartItems] = useState([]);
  const [foods, setFoods] = useState([]);
  const isDeliveryAccepted = typeof window !== "undefined" && localStorage.getItem('deliveryAccepted') === 'true';
  const router = useRouter();

  useEffect(() => {
    if (!isDeliveryAccepted) {
      router.push('/fabceylon-kurunegala/order/delivery');
    }
  }, [isDeliveryAccepted, router]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('fab-kurunegala-delivery-cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/order/orderfoods/${process.env.NEXT_PUBLIC_FAB_CEYLON_KURUNEGALA}/${foodCategory}`
        );
        setFoods(response.data);
      } catch (error) {
        toast.error('Failed to fetch foods');
      }
    };

    fetchFoods();
  }, [foodCategory]);

  const handleAddToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem('fab-kurunegala-delivery-cart')) || [];
    const existingItem = cart.find((item) => item._id === food._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem('fab-kurunegala-delivery-cart', JSON.stringify(cart));
    setCartItems(cart);
  };

  const handleIncreaseQuantity = (foodId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === foodId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem('fab-kurunegala-delivery-cart', JSON.stringify(updatedCart));
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

    localStorage.setItem('fab-kurunegala-delivery-cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDeleteFromCart = (foodId) => {
    const updatedCart = cartItems.filter((item) => item._id !== foodId);
    localStorage.setItem('fab-kurunegala-delivery-cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="relative z-50">
          <KurunagalMainNavBar />
          <KurunagalaMenuNabBar />
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
        </div>

      {/* Category and Food List */}
      <div className="relative bg-black text-center">
        <h1 className="text-[#eb650f] text-7xl font-bold font-['Poppins']">
          {foodCategory.replace(/-/g, ' ').toUpperCase()}
        </h1>
        <div className="text-white text-3xl font-bold font-['Poppins'] mt-10">
          It is a good time for the great taste of {foodCategory.replace(/-/g, ' ')}
        </div>

        <div className="flex flex-row items-start justify-center gap-10 mt-10 px-4">
          {/* Foods */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {foods.map((food) => (
              <div
                key={food._id}
                className="w-[320px] h-[780px] px-[43px] pt-[25.50px] pb-[38.50px] bg-[#110c0c] rounded-[30px] flex flex-col items-start gap-5"
              >
                <div className="w-[200px] h-[200px] overflow-hidden rounded-full border-4 border-white mx-auto">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/${food.image.replace("\\", "/")}`}
                    alt={food.foodName}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="text-white text-4xl font-bold font-['Poppins'] mt-5">
                  {food.foodName.split(' ').map((word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  ).join(' ')}
                </div>

                <div className="flex items-center mt-4 text-white">
                  <div className="flex gap-1">{getStars(food.averageRating)}</div>
                  <span className="ml-2 text-sm font-['Poppins']">
                    <span className="text-lg font-bold">{food.averageRating.toFixed(1)}</span>
                    <span className="text-xs"> ({food.totalRatings})</span>
                  </span>
                </div>

                <div className="text-white text-xl font font-['Poppins'] mt-5">
                  {food.description}
                </div>
                <div className="text-[#eb650f] text-2xl font-bold font-['Poppins'] mt-6">
                  LKR {food.price}
                </div>
                <div
                  onClick={() => handleAddToCart(food)}
                  role="button"
                  tabIndex={0}
                  className="h-[40px] px-[23px] py-[9px] bg-[#eb650f] rounded-[20px] flex justify-center items-center mt-8 cursor-pointer"
                >
                  <div className="text-black text-[20px] font-bold font-['Poppins']">ADD</div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart */}
          <div className="w-[397px] h-[780px] px-5 py-10 bg-[#110d0d] rounded-[20px] border-4 border-white flex flex-col items-start">
            <div className="w-full text-[#eb650f] text-5xl font-bold font-['Poppins'] mb-5">
              Your Cart
            </div>
            <div className="w-full flex flex-col gap-4 overflow-y-auto h-[360px]">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="w-full flex justify-between items-center text-white text-xl font-bold font-['Poppins']"
                >
                  <span>{item.foodName}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Rs. {item.price * item.quantity}</span>
                    <Image
                      src={delete_icon}
                      alt="Delete"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleDeleteFromCart(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full text-white text-xl font-bold font-['Poppins'] mt-5">
              Total: Rs. {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}.00
            </div>
            <div className="flex justify-center w-full mt-5">
              <Link href="/fabceylon-kurunegala/order/delivery/checkout">
                <button className="w-[200px] h-[50px] bg-[#eb650f] text-white text-xl font-bold font-['Poppins'] rounded-[10px] hover:bg-[#d4550d] transition-colors">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
