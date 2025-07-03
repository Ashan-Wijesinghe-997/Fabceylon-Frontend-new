"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import deleteIcon from "@/components/Assets/delete.png";
import KurunagalMainNavBar from '@/components/Fab-Kurunegala-Main-Navbar';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState("Delivery");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    senderName: "",
    senderContact: "",
    receiverName: "",
    receiverContact: "",
    receiverAddress: "",
    orderDescription: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [sameAsSender, setSameAsSender] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("fab-kurunegala-delivery-cart")) || [];
    setCartItems(storedCart);
    const address = localStorage.getItem('approvedAddress'); 
  }, []);

  
  useEffect(() => {
    if (sameAsSender) {
      setFormData((prevData) => ({
        ...prevData,
        receiverName: prevData.senderName,
        receiverContact: prevData.senderContact,
      }));
    }
  }, [formData.senderName, formData.senderContact, sameAsSender]);

  const handleIncreaseQuantity = (foodId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === foodId ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("fab-kurunegala-delivery-cart", JSON.stringify(updatedCart));
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

    localStorage.setItem("fab-kurunegala-delivery-cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleDeleteFromCart = (foodId) => {
    const updatedCart = cartItems.filter((item) => item._id !== foodId);
    localStorage.setItem("fab-kurunegala-delivery-cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSameAsSenderChange = (e) => {
    setSameAsSender(e.target.checked);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addOrder = async () => {
    if (!agreedToTerms) {
      toast.error("You must agree to the Terms and Conditions to proceed.", {
        containerId: "ErrorMessage",
      });
      return;
    }

    const token = localStorage.getItem("user");
    let userId = null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken._id;
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid user session. Please log in again.", {
          containerId: "ErrorMessage",
        });
        return;
      }
    }

    if (
      !orderType ||
      !paymentMethod ||
      !formData.senderName ||
      !formData.senderContact
    ) {
      toast.error("Please fill in all required fields.", {
        containerId: "ErrorMessage",
      });
      return;
    }

    const orderData = {
      admin_id: process.env.NEXT_PUBLIC_FAB_CEYLON_KURUNEGALA,
      userId: userId,
      items: cartItems.map((item) => ({
        foodId: item._id,
        foodName: item.foodName,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      orderType,
      paymentMethod,
      totalAmount,
      senderDetails: {
        name: formData.senderName,
        contactNumber: formData.senderContact,
      },
      receiverDetails: {
        name: formData.receiverName,
        contactNumber: formData.receiverContact,
        address: formData.receiverAddress,
      },
      orderDescription: formData.orderDescription || "",
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/customers/order/orderfoods/${process.env.NEXT_PUBLIC_FAB_CEYLON_KURUNEGALA}/put-order`,
        orderData
      );

      toast.success("Successfully created Order!", {
        containerId: "successMessage",
      });
      localStorage.removeItem("fab-kurunegala-delivery-cart");
      router.push("/fabceylon-kurunegala");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.message || "An error occurred.", {
        containerId: "ErrorMessage",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <KurunagalMainNavBar />
      <div className="flex flex-col items-center min-h-screen px-4 py-10 text-white bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="mb-6 text-3xl font-bold text-orange-400">Your Cart</h1>
          <div className="space-y-4 overflow-y-auto max-h-96">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div className="text-lg font-bold">{item.foodName}</div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDecreaseQuantity(item._id)}
                    className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-gray-600 rounded-full"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item._id)}
                    className="flex items-center justify-center w-8 h-8 text-lg font-bold text-white bg-gray-600 rounded-full"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold">
                    Rs. {item.price * item.quantity}
                  </span>
                  <Image
                    src={deleteIcon}
                    alt="Delete"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleDeleteFromCart(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 mt-6 border-t border-gray-700">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>Rs. {totalAmount}.00</span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-bold text-orange-400">Sender Details:</h2>
            <input
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 mb-3 text-gray-900 bg-gray-200 rounded-lg placeholder-italic"
            />
            <input
              type="text"
              name="senderContact"
              value={formData.senderContact}
              onChange={handleInputChange}
              placeholder="Enter your contact number"
              className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-lg placeholder-italic"
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-2 space-x-2">
              <input
                type="checkbox"
                id="sameAsSender"
                checked={sameAsSender}
                onChange={handleSameAsSenderChange}
                className="w-5 h-5"
              />
              <label htmlFor="sameAsSender" className="text-sm text-gray-400">
                Same as Sender Details
              </label>
            </div>
            <h2 className="mb-2 text-xl font-bold text-orange-400">Receiver Details:</h2>
            <input
              type="text"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleInputChange}
              placeholder="Enter Receiver name"
              className="w-full px-4 py-3 mb-3 text-gray-900 bg-gray-200 rounded-lg placeholder-italic"
              disabled={sameAsSender}
            />
            <input
              type="text"
              name="receiverContact"
              value={formData.receiverContact}
              onChange={handleInputChange}
              placeholder="Enter Receiver contact number"
              className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-lg placeholder-italic"
              disabled={sameAsSender}
            />
          </div>

          <div className="mt-6">
          
            <h2 className="mb-2 text-xl font-bold text-orange-400">Address Details:</h2>
            <h2 className="mb-2 text-gray-200 font text-l">
                Order Delivering to : {localStorage.getItem('approvedAddress')}
            </h2>
            <input
              type="text"
              name="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleInputChange}
              placeholder="Enter Receiver Address"
              className="w-full px-4 py-3 mb-3 text-gray-900 bg-gray-200 rounded-lg placeholder-italic"
            />
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-bold text-orange-400">Order Type:</h2>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="orderType"
                  value="Delivery"
                  checked={orderType === "Delivery"}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-5 h-5"
                />
                <span>Delivery</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-bold text-orange-400">Payment Method:</h2>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <span>Cash Payment</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={paymentMethod === "Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5"
                />
                <span>Online Payment</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-xl font-bold text-orange-400">Order Description:</h2>
            <input
              type="text"
              name="orderDescription"
              value={formData.orderDescription}
              onChange={handleInputChange}
              placeholder="Enter order description (Ex: Don't add onions...)"
              className="w-full px-4 py-3 text-gray-900 bg-gray-200 rounded-lg placeholder-italic"
            />
          </div>

          <div className="flex items-center mt-6 space-x-2">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="w-5 h-5"
            />
            <label htmlFor="termsCheckbox" className="text-sm text-gray-400">
              I have read and agreed to the{" "}
              <a
                href="/order-terms-conditions"
                target="_blank"
                className="text-orange-400 underline"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
              .
            </label>
          </div>

          <button
            onClick={addOrder}
            disabled={!agreedToTerms}
            className={`w-full py-3 mt-6 text-lg font-bold text-white rounded-lg transition ${
              agreedToTerms
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;