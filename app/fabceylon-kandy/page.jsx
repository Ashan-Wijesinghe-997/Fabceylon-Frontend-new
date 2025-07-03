'use client';
import React from 'react';
import MenuBack_image from '@/components/Assets/MenuBack_image.jpg';
import Bugger from '@/components/Assets/Bugger.png';
import Image from 'next/image';

import delete_icon from '@/components/Assets/delete.png';
import { KandyMenuNavBar } from '@/components/Fab-Kandy-MenuNavBar';
import KandyMainMenuNavBar from '@/components/Fab-Kandy-MainMenuNavBar';


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

        

      

        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 lg:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 w-full lg:flex-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
              <div
                key={index}
                className="w-full bg-[#110c0c] rounded-[30px] flex flex-col items-center p-4 sm:p-6 lg:p-8 min-h-[600px] sm:min-h-[700px] lg:min-h-[780px]"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-[200px] lg:h-[200px] rounded-full border-4 border-white overflow-hidden mb-4 sm:mb-6">
                  <Image
                    src={Bugger}
                    alt="Chicken Burger"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold font-['Poppins'] text-center mb-4 sm:mb-6">
                  Chicken Burger
                </div>
                <div className="text-[#eb650f] text-xl sm:text-2xl font-bold font-['Poppins'] mb-6 sm:mb-8">
                  LKR 750
                </div>
                <div
                  onClick={() =>
                    handleAddToCart({
                      id: index,
                      name: 'Chicken Burger',
                      price: 750,
                    })
                  }
                  className="w-full sm:w-auto px-4 sm:px-6 lg:px-[23px] py-2 sm:py-3 lg:py-[9px] bg-[#eb650f] rounded-[20px] flex justify-center items-center cursor-pointer hover:bg-[#d45500] transition-colors"
                >
                  <div className="text-black text-lg sm:text-xl lg:text-[20px] font-bold font-['Poppins']">
                    ADD
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[397px] bg-[#110d0d] rounded-[20px] border-4 border-white flex flex-col p-4 sm:p-6 lg:px-5 lg:py-10 min-h-[400px] sm:min-h-[500px] lg:min-h-[780px]">
            <div className="w-full text-[#eb650f] text-3xl sm:text-4xl lg:text-5xl font-bold font-['Poppins'] mb-4 sm:mb-5">
              Your Cart
            </div>
            <div className="w-full flex flex-col gap-3 sm:gap-4 overflow-y-auto flex-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex justify-between items-center text-white text-base sm:text-lg lg:text-xl font-bold font-['Poppins'] py-2"
                >
                  <span className="flex-1 min-w-0 truncate mr-2">{item.name}</span>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 text-white font-bold"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700 text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="text-sm sm:text-base">Rs. {item.price * item.quantity}</span>
                    <Image
                      src={delete_icon}
                      alt="Delete"
                      className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-80"
                      onClick={() => handleDeleteFromCart(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full text-white text-lg sm:text-xl font-bold font-['Poppins'] mt-4 sm:mt-5 pt-3 border-t border-gray-700">
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
  );
}
