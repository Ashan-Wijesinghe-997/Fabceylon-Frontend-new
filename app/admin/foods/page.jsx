"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const ViewFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const token = localStorage.getItem("admin");

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/getfoods`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFoods(response.data);
      } catch (error) {
        toast.error("Failed to fetch foods");
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    const tokenObj = JSON.parse(localStorage.getItem("admin")); // Parse the token object
    const token = tokenObj ? tokenObj.createdToken : null; // Extract the JWT

    if (!token) {
      toast.error("Unauthorized: No token found.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/deletefood/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
      toast.success("Food item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete food item.");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-5 py-6 font-sans bg-white">
      <h1 className="mb-6 text-2xl font-bold text-center">Foods</h1>
      <div className="flex flex-wrap gap-5">
        {foods.map((food) => (
          <div
            className="bg-gray-100 border border-gray-300 rounded-lg shadow-md w-[20%] flex flex-col items-center p-4 transition-transform hover:translate-y-[-5px] hover:shadow-lg"
            key={food._id}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/${food.image.replace(
                "\\",
                "/"
              )}`}
              alt={food.foodName}
              className="object-cover w-full h-auto rounded-lg"
            />

            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {food.foodName}
              </h2>
              <p className="mt-1 text-gray-600">Price: Rs.{food.price}.00</p>
              <p className="mt-1 text-gray-500">
                {food.foodCategory.replace(/-&-/g, " & ")}
              </p>
              <p className="mt-1 text-gray-600">
                Delivery Available: {food.isDeliveryAvailable ? "Yes" : "No"}
              </p>
              <p className="mt-2 text-gray-500">{food.description}</p>
            </div>

            <div className="flex gap-4 mt-4">
              <Link href={`/admin/updatefood/${food._id}`}>
                <button className="px-5 py-2 text-white bg-green-500 rounded-lg shadow-md transition-transform hover:translate-y-[-3px] hover:bg-green-600 hover:shadow-lg active:translate-y-[1px] active:shadow">
                  Update
                </button>
              </Link>

              <button
                onClick={() => handleDelete(food._id)}
                className="px-5 py-2 text-white bg-red-500 rounded-lg shadow-md transition-transform hover:translate-y-[-3px] hover:bg-red-600 hover:shadow-lg active:translate-y-[1px] active:shadow"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewFoods;
