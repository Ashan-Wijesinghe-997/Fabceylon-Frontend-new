'use client';

import React from 'react';
import Image from 'next/image';
import MenuBack_image from '@/components/Assets/MenuBack_image.jpg';
import Bugger from '@/components/Assets/Bugger.png';
import star_icon from '@/components/Assets/star_icon.png';
import delete_icon from '@/components/Assets/delete.png';
import KurunagalMainNavBar from '@/components/Fab-Kurunegala-Main-Navbar';
import {KurunagalaMenuNabBar} from '@/components/Fab-Kurunegala-Dilvery-Navbar'

export default function KandyMenu() {
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleAddToCart = (food) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === food.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartItems(cart);
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDeleteFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

   return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="relative z-10">
          < KurunagalMainNavBar />
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

        <div className="relative bg-black pb-16">
          <div className="text-[#eb650f] text-8xl font-bold font-['Poppins'] bg-black text-center pt-10">
            <h1>Burger</h1>
            <div className="text-white text-4xl font-bold font-['Poppins'] mt-10">
              It is good time for the great taste of burgers
            </div>
          </div>

          <div className="flex flex-row items-start justify-center gap-10 mt-10 px-6 flex-wrap">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="w-[320px] h-[780px] px-[43px] pt-[25.50px] pb-[38.50px] bg-[#110c0c] rounded-[30px] flex flex-col items-start gap-5"
                >
                  <Image
                    className="w-[200px] h-[200px] rounded-full border-4 border-white ml-4"
                    src={Bugger}
                    alt="Chicken Burger"
                  />
                  <div className="text-white text-4xl font-bold font-['Poppins'] mt-5">
                    Chicken Burger
                  </div>
                  <div className="text-[#eb650f] text-2xl font-bold font-['Poppins'] mt-6">
                    LKR 750
                  </div>
                  <div
                    onClick={() =>
                      handleAddToCart({
                        id: index, // Replace with unique ID in real data
                        name: 'Chicken Burger',
                        price: 750,
                      })
                    }
                    className="h-[40px] px-[23px] py-[9px] bg-[#eb650f] rounded-[20px] flex justify-center items-center mt-8 cursor-pointer"
                  >
                    <div className="text-black text-[20px] font-bold font-['Poppins']">
                      ADD
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[397px] h-[780px] px-5 py-10 bg-[#110d0d] rounded-[20px] border-4 border-white flex flex-col items-start mt-5">
              <div className="w-full text-[#eb650f] text-5xl font-bold font-['Poppins'] mb-5">
                Your Cart
              </div>
              <div className="w-full flex flex-col gap-4 overflow-y-auto h-[360px]">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-full flex justify-between items-center text-white text-xl font-bold font-['Poppins']"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="px-2 py-1 font-bold text-white"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="px-2 py-1 font-bold text-white"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Rs. {item.price * item.quantity}</span>
                      <Image
                        src={delete_icon}
                        alt="Delete"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => handleDeleteFromCart(item.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full text-white text-xl font-bold font-['Poppins'] mt-5">
                Total: Rs.{' '}
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
                .00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

