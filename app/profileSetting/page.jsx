'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import Fabceylon_PVT from '@/components/Assets/Fabceylon_PVT.png';
import background_image from '@/components/Assets/LoginSignUp_back_Image.png';

import user_icon from '@/components/Assets/user_icon.png';
import lock_icon from '@/components/Assets/Lock.png';

const ProfileSettingsCustomer = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newContactNumber: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.createdToken) {
        toast.error("Unauthorized access. Please log in.", { containerId: 'ErrorMessage' });
        router.push("/login");
        return;
      }

      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        toast.error('Passwords do not match', { containerId: 'ErrorMessage' });
        return;
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/update-profile`,
        {
          newContactNumber: formData.newContactNumber || undefined,
          newPassword: formData.newPassword || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${user.createdToken}`
          }
        }
      );

      toast.success('Profile updated successfully', { containerId: 'successMessage' });
    } catch (error) {
      console.error("Update Profile Error:", error);
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
          Profile Settings
        </motion.h1>

        <div className="space-y-4">
          {/* New Contact Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <Image
              src={user_icon}
              alt="Phone"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              name="newContactNumber"
              placeholder="New Contact Number"
              value={formData.newContactNumber}
              onChange={changeHandler}
              className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/70 border border-gray-300 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </motion.div>

          {/* Current Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Image
              src={lock_icon}
              alt="User"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="password"
              name="password"
              placeholder="Current Password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/70 border border-gray-300 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </motion.div>

          {/* New Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Image
              src={lock_icon}
              alt="Lock"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={changeHandler}
              className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/70 border border-gray-300 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <Image
              src={lock_icon}
              alt="Lock"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={changeHandler}
              className="w-full pl-10 pr-4 py-4 rounded-xl bg-white/70 border border-gray-300 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </motion.div>
        </div>

        <motion.button
          onClick={updateProfile}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full mt-8 py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-yellow-600 transition-all"
        >
          Save Changes
        </motion.button>
      </motion.div>

      <ToastContainer containerId="successMessage" position="top-center" />
      <ToastContainer containerId="ErrorMessage" position="top-center" />
    </div>
  );
};

export default ProfileSettingsCustomer;
