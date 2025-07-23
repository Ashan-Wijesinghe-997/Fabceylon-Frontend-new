"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from 'jwt-decode';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const router = useRouter();
  
  const{ admin_id}=useParams();


  const getUserIdFromToken = () => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("No token found. Please log in.");
      return null;
    }

    try {
      const parsedUserData = JSON.parse(userData); // Parse the user data
      const token = parsedUserData.createdToken; // Extract the createdToken

      console.log("Token:", token);

      if (!token) {
        toast.error("Token is missing in user data.");
        return null;
      }

      const decodedToken = jwtDecode(token); // Decode the token
      console.log("Decoded Token:", decodedToken); // Log the decoded token

      return decodedToken._id || decodedToken.userId || null; // Return the userId or _id based on the token structure
    } catch (error) {
      console.error("Error decoding token:", error); // Log error to debug further
      toast.error("Invalid token. Please log in again.");
      return null;
    }
  };

  const userId = getUserIdFromToken();


  useEffect(() => {
    console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS);

    const fetchOrders = async () => {
      console.log("userId:", userId, "admin_id:", admin_id);
      if (!userId || !admin_id) {
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/rating/getorders/${userId}/${admin_id}`
        );
        console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS);

        const fetchedOrders = response.data;
        setOrders(fetchedOrders);

        const initialRatings = {};
        fetchedOrders.forEach((order) => {
          order.items.forEach((item) => {
            initialRatings[item.foodId] = item.averageRating || 0;
          });
        });
        setRatings(initialRatings);
      } catch (error) {
        toast.error("Failed to fetch orders. Please try again later.");
      }
    };

    fetchOrders();
  }, [userId, admin_id]);

  const handleRatingChange = (foodId, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [foodId]: newRating,
    }));
  };

  const handleSubmitRating = async () => {
    if (!currentOrder) return;

    const token = localStorage.getItem("customer");

    const ratingPayload = {
      _id: currentOrder._id,
      userId,
      admin_id,
      items: currentOrder.items.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
        price: item.price,
        ratings: [
          {
            userId,
            rating: ratings[item.foodId] || 0,
          },
        ],
      })),
      orderType: currentOrder.orderType,
      paymentMethod: currentOrder.paymentMethod,
      orderDescription: currentOrder.orderDescription,
    };

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/rating/submitFoodRating`,
        ratingPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Ratings submitted successfully!");
      closeReviewPopup();
    } catch (error) {
      toast.error("Failed to submit ratings. Please try again.");
    }
  };

  const openReviewPopup = (order) => {
    setCurrentOrder(order);
    setShowReviewPopup(true);
    console.log("fdgfd",order);
  };

  const closeReviewPopup = () => {
    setShowReviewPopup(false);
    setCurrentOrder(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-[#f8f6f6] p-6">
      <h1 className="mb-8 text-2xl font-bold text-center">Your Orders</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="relative bg-transparent border border-[rgb(60,57,56)] rounded-2xl p-4 w-64 h-80 shadow-md transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-lg"
            >
              {/* Apply backdrop blur to the background */}
              <div className="absolute inset-0 border shadow-lg bg-gray-800/30 backdrop-blur-md rounded-2xl border-white/20"></div>


              {/* Add custom spacing */}
              <div className="relative z-10 flex justify-center mb-4">
                <h2 className="font-serif text-xl">Order #{order._id.slice(-6)}</h2>
              </div>
              <div className="relative z-10 flex justify-center mb-4">
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="relative z-10 flex justify-center mb-4">
                <p>Total Amount: Rs.{order.totalAmount}</p>
              </div>
              <div className="relative z-10 flex justify-center mb-4">
                <p>Status: {order.status}</p>
              </div>
              <div className="relative z-10 flex justify-center">
                <button
                  className={`mt-4 px-4 py-2 rounded-md transition ${
                    order.status === "Delivered"
                      ? "bg-[#e77f43] text-white hover:bg-[#3e5fd5]"
                      : "bg-gray-800 text-white cursor-not-allowed"
                  }`}
                  onClick={() => openReviewPopup(order)}
                  disabled={order.status !== "Delivered"} // Disabled when status is not "Delivered"
                >
                  Review
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>

      {showReviewPopup && currentOrder && (
        <ReviewPopup
          order={currentOrder}
          ratings={ratings}
          handleRatingChange={handleRatingChange}
          handleSubmitRating={handleSubmitRating}
          closeReviewPopup={closeReviewPopup}
        />
      )}
    </div>
  );
};

const ReviewPopup = ({
  order,
  ratings,
  handleRatingChange,
  handleSubmitRating,
  closeReviewPopup,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative w-full max-w-3xl p-6 border rounded-lg shadow-md bg-gray-900/50 backdrop-blur-lg border-white/10">
      <div className="relative z-10 flex justify-center">
        <h2 className="mb-4 text-xl font-bold text-white">
          Review Order #{order._id.slice(-6)}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {order.items.map((item) => (
          <div
            key={item.foodId}
            className="flex items-center text-white gap-4 bg-gray-800/50 backdrop-blur-lg p-4 rounded-lg shadow-md  transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-lg"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/${item.image.replace(
                "\\",
                "/"
              )}`}
              alt={item.foodName}
  className="object-cover w-40 h-40 transition-transform duration-300 ease-in-out border-4 border-white rounded-full shadow-md hover:scale-110"
/>



            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{item.foodName || "No Name"}</h3>
              <p>Price: Rs.{item.price}</p>
              <RatingReview
                rating={ratings[item.foodId] || 0}
                setRating={(newRating) => handleRatingChange(item.foodId, newRating)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          className="bg-[#e76f2f] text-white px-4 py-2 rounded-md hover:bg-[#3a5fbd] transition"
          onClick={handleSubmitRating}
        >
          Submit
        </button>
        <button
          className="bg-[#e76f2f] text-white px-4 py-2 rounded-md hover:bg-[#ce4141] transition"
          onClick={closeReviewPopup}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const RatingReview = ({ rating, setRating }) => (
  <div className="flex gap-2 text-xl">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`cursor-pointer ${
          rating >= star ? "text-yellow-400" : "text-gray-300 "
        }`}
        onClick={() => setRating(star)}
      >
        ★
      </span>
    ))}
  </div>
);

export default Orders;
