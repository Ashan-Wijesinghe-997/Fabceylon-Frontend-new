'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/components/Assets/Fabceylon_PVT.png';
import background_image from '@/components/Assets/LoginSignUp_back_Image.png';
import {
  CalendarDays,
  Clock,
  Users,
  Store,
  CheckCircle,
} from 'lucide-react';

const Home = () => {
  const [formData, setFormData] = useState({
    cafe: 'Cafe Nuwara',
    date: '',
    time: '',
    people: '',
    agreeToTerms: false,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    setMessage('🎉 Reservation confirmed! We look forward to seeing you.');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-centerr bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${background_image.src})` }}
    >
      <div className="relative w-full max-w-lg p-8 bg-white/30 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl">
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="Logo" width={250} height={100} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm text-gray-800">
          <div>
            <label className="block mb-1 font-semibold">Select Cafe</label>
            <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
              <Store className="mr-2 text-gray-500" size={18} />
              <select
                name="cafe"
                value={formData.cafe}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              >
                <option value="Cafe Nuwara">Cafe Nuwara</option>
                <option value="Cafe Colombo">FabCeylon Kandy</option>
                <option value="Cafe Kurunegala">FabCeylon Kurunegala</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Select Date</label>
            <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
              <CalendarDays className="mr-2 text-gray-500" size={18} />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Select Time</label>
            <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
              <Clock className="mr-2 text-gray-500" size={18} />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Number of People</label>
            <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
              <Users className="mr-2 text-gray-500" size={18} />
              <input
                type="number"
                name="people"
                min="1"
                value={formData.people}
                onChange={handleChange}
                placeholder="Enter number of guests"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="accent-yellow-500"
            />
            <label className="text-sm">
              I agree to the <span className="underline cursor-pointer">terms & conditions</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg transition"
          >
            Reserve a Table
          </button>
        </form>

        {message && (
          <div className="mt-4 flex items-center justify-center text-green-700 font-medium">
            <CheckCircle className="mr-2" size={20} />
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
