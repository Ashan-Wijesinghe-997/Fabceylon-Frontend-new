'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

import Fabceylon_PVT from '@/components/Assets/Fabceylon_PVT.png';
import user_icon from '@/components/Assets/User_Icon_login.png';
import lock from '@/components/Assets/Lock.png';
import background_image from '@/components/Assets/LoginSignUp_back_Image.png';

const LoginCustomer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contactNumber: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/login`,
        JSON.stringify({
          contactNumber: formData.contactNumber,
          password: formData.password,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success('Successfully logged in', { containerId: 'successMessage' });
      router.push('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred', { containerId: 'ErrorMessage' });
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${background_image.src})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[90%] max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl px-8 py-10"
      >
        <div className="flex justify-center mb-6">
          <Image src={Fabceylon_PVT} alt="Fab Ceylon Logo" width={120} height={80} className="rounded-md" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 -mt-5"
        >
          Welcome Back
        </motion.h1>

        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Image
              src={user_icon}
              alt="User"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              onChange={changeHandler}
              value={formData.contactNumber}
              required
              className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/70 border border-gray-300 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Image
              src={lock}
              alt="Lock"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              onChange={changeHandler}
              value={formData.password}
              required
              className="w-full pl-10 pr-10 py-4 rounded-xl bg-white/70 border border-gray-300 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>

          {/* Forgot Password Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-right"
          >
            <button
              onClick={() => router.push('/profileSetting')}
              className="text-sm text-blue-200 hover:text-blue-400 hover:underline transition"
            >
              Forgot Password?
            </button>
          </motion.div>
        </div>

        <motion.button
          onClick={login}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-8 py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-yellow-600 transition-all"
        >
          Login
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-white text-center"
        >
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-bold text-blue-300 hover:underline">
            Sign Up
          </a>
        </motion.p>
      </motion.div>

      <ToastContainer containerId="successMessage" position="top-center" />
      <ToastContainer containerId="ErrorMessage" position="top-center" />
    </div>
  );
};

export default LoginCustomer;
