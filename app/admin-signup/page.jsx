'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Fabceylon_PVT from '@/components/Assets/Fabceylon_PVT.png';
import user_icon from '@/components/Assets/User_Icon_login.png';
import lock from '@/components/Assets/Lock.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpAdmin = () => {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formData, setFormData] = useState({
    cafeName: '', // Changed from `name` to `cafeName`
    contactNumber: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match.', { containerId: 'ErrorMessage' });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error('Sign-up failed');

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Admin account created successfully!', { containerId: 'SuccessMessage' });
      router.push('/admin');
    } catch (error) {
      toast.error(error.message || 'An error occurred.', { containerId: 'ErrorMessage' });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#ded2b7] bg-cover bg-center"
      style={{ backgroundImage: `url('/images/LoginSignUp_back_Image.png')` }}
    >
      <div className="w-full max-w-md p-8 bg-[#FFFDF7] rounded-[30px] shadow-lg">
        <div className="mb-6 text-center">
          <Image src={Fabceylon_PVT} alt="Fab Ceylon Logo" width={150} height={75} className="mx-auto" />
        </div>
        <h1 className="mb-4 font-sans text-2xl font-bold text-center text-gray-800">Admin Sign Up</h1>
        <div className="space-y-4">
          <div className="relative flex items-center px-3 py-2 border rounded-[20px] bg-[#D9D9D9]">
            <Image src={user_icon} alt="User Icon" width={20} height={20} className="absolute left-4" />
            <input
              type="text"
              placeholder="Cafe Name"
              name="cafeName" // Changed from `name` to `cafeName`
              value={formData.cafeName}
              onChange={changeHandler}
              className="w-full pl-12 text-sm text-gray-700 bg-transparent border-none outline-none"
            />
          </div>
          <div className="relative flex items-center px-3 py-2 border rounded-[20px] bg-[#D9D9D9]">
            <Image src={user_icon} alt="Phone Icon" width={20} height={20} className="absolute left-4" />
            <input
              type="text"
              placeholder="Phone Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={changeHandler}
              className="w-full pl-12 text-sm text-gray-700 bg-transparent border-none outline-none"
            />
          </div>
          <div className="relative flex items-center px-3 py-2 border rounded-[20px] bg-[#D9D9D9]">
            <Image src={lock} alt="Lock Icon" width={20} height={20} className="absolute left-4" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full pl-12 text-sm text-gray-700 bg-transparent border-none outline-none"
            />
          </div>
          <div className="relative flex items-center px-3 py-2 border rounded-[20px] bg-[#D9D9D9]">
            <Image src={lock} alt="Lock Icon" width={20} height={20} className="absolute left-4" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-12 text-sm text-gray-700 bg-transparent border-none outline-none"
            />
          </div>
        </div>
        <button
          onClick={signup}
          className="w-full py-2 mt-6 text-lg font-bold text-white bg-[#E1D6C1] rounded-[20px] hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/admin" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
      <ToastContainer containerId="SuccessMessage" />
      <ToastContainer containerId="ErrorMessage" />
    </div>
  );
};

export default SignUpAdmin;
