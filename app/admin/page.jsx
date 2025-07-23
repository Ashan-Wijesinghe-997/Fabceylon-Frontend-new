"use client"; // Mark this as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Updated for Next.js 13+
import Image from 'next/image';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fabceylon_PVT from '@/components/Assets/Fabceylon_PVT.png'; 
import user_icon from '@/components/Assets/User_Icon_login.png';
import lock from '@/components/Assets/Lock.png';
import background_image from '@/components/Assets/LoginSignUp_back_Image.png';


const LoginAdmin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cafeName: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/login`,
        { cafeName: formData.cafeName, password: formData.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("admin", JSON.stringify(response.data));
      toast.success("Successfully logged in", { containerId: "successMessage" });
      router.push("/"); // Redirect to the homepage
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed", {
        containerId: "ErrorMessage",
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[#ded2b7] pt-24 bg-cover bg-center" style={{ backgroundImage: `url(${background_image.src})` }}>
      <div className="w-11/12 max-w-md mx-auto bg-[#FFFDF7] p-8 rounded-3xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
        <Image
          src={Fabceylon_PVT}
          alt="Fab Ceylon Logo"
          width={200}
          height={100}
        />
                </div>
        <h1 className="mt-4 font-serif text-2xl text-center text-black">Admin Login</h1>

        {/* Input Fields */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="relative">
            <Image
              src={user_icon}
              alt="User Icon"
              width={20}
              height={20}
              className="absolute transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="text"
              placeholder="Cafe Name"
              name="cafeName"
              onChange={changeHandler}
              value={formData.cafeName}
              className="w-full h-10 pl-12 bg-[#D9D9D9] border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-500"
              required
            />
          </div>
          <div className="relative">
            <Image
              src={lock}
              alt="Lock Icon"
              width={20}
              height={20}
              className="absolute transform -translate-y-1/2 left-4 top-1/2"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              className="w-full h-10 pl-12 bg-[#D9D9D9] border border-gray-300 rounded-full text-sm focus:outline-none focus:border-gray-500"
              required
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full h-10 bg-[#E1D6C1] text-gray-800 font-bold text-lg mt-6 rounded-full hover:bg-[#d1c3ab] transition"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm font-medium text-center">
          Don't have an Account?&nbsp;
          <a href="/admin-signup" className="font-bold text-gray-800">
            Sign Up
          </a>
        </p>
      </div>

      {/* Toast Containers */}
      <ToastContainer containerId="successMessage" />
      <ToastContainer containerId="ErrorMessage" />
    </div>
  );
};

export default LoginAdmin;
