'use client'; // For client-side rendering

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';

const UpdateFood = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState(null); // For new image preview
    const [formData, setFormData] = useState({
        foodName: "",
        price: "",
        description: "",
        foodCategory: "",
        isDeliveryAvailable: "",
        image: "" // Contains the base64 of the previous image
    });

    // Fetch food details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/getfoodbyid/${id}`
                );
                setFormData(response.data); // Set fetched data
                setLoading(false);
            } catch (error) {
                toast.error("Failed to fetch food details", { containerId: 'ErrorMessage' });
                setLoading(false);
            }
        };

        if (id) fetchFood();
    }, [id]);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result); // Set new image preview
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const updateFood = async () => {
        const token = localStorage.getItem("admin");
        let adminId = null;

        if (token) {
            const decodedToken = jwtDecode(token);
            adminId = decodedToken._id;
        }

        const payload = { ...formData, admin_id: adminId };

        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/updatefood/${id}`,
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            toast.success("Successfully updated Food", { containerId: 'successMessage' });
            router.push("/admin/foods");
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred", { containerId: 'ErrorMessage' });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative w-full min-h-screen bg-gray-100 parent">
            <div className="absolute inset-0 flex items-center justify-center child">
                <form className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-md">
                    <h1 className="mb-6 text-2xl font-semibold text-center">Update Food</h1>

                    {/* Show previous image */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-700">Current Image:</p>
                        <img
                            src={formData.image}
                            alt="Current Food"
                            className="w-32 h-32 mb-2 rounded"
                        />
                    </div>

                    {/* Upload and preview new image */}
                    <div className="mb-4">
                        <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
                            Upload New Image
                        </label>
                        <label
                            htmlFor="file-upload"
                            className="inline-block px-4 py-2 font-bold text-black transition duration-300 bg-yellow-400 rounded cursor-pointer hover:bg-yellow-500">
                            Upload Image
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        
                    </div>

                    {/* Other input fields */}
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            value={formData.foodName}
                            onChange={changeHandler}
                            className="w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-xl"
                            placeholder="Food Name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={changeHandler}
                            className="w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-xl"
                            placeholder="Price"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={changeHandler}
                            rows="4"
                            className="w-full h-32 px-3 text-sm text-gray-800 bg-white border border-gray-300 resize-none rounded-xl"
                            placeholder="Description"></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="foodCategory"
                            value={formData.foodCategory}
                            onChange={changeHandler}
                            className="w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-xl">
                            <option value="" disabled>Select Category</option>
                        <option value="appetizers">Appetizers</option>
                        <option value="salads-soups">Salads & Soups</option>
                        <option value="add-on">Add-On</option>
                        <option value="bowls">Bowls</option>
                        <option value="pasta-spaghetti">Pasta & Spaghetti</option>
                        <option value="noodles">Noodles</option>
                        <option value="kottu">Kottu</option>
                        <option value="fried-rice">Fried Rice</option>
                        <option value="biriyani">Biriyani</option>
                        <option value="signature-meals">Signature Meals</option>
                        <option value="burgers">Burgers</option>
                        <option value="sandwiches-submarines">Sandwiches & Submarines</option>
                        <option value="desserts">Desserts</option>
                        <option value="iced-coffee-iced-tea">Iced Coffee & Iced Tea</option>
                        <option value="hot-beverages">Hot Beverages</option>
                        <option value="bubble-tea">Bubble Tea</option>
                        <option value="mojito">Mojito</option>
                        <option value="milk-shakes">Milk Shakes</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Delivery Available?</label>
                        <select
                            name="isDeliveryAvailable"
                            value={formData.isDeliveryAvailable}
                            onChange={changeHandler}
                            className="w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-xl">
                            <option value="" disabled>Is Delivery Available?</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={updateFood}
                        className="w-full h-10 font-semibold text-white transition duration-300 bg-blue-600 rounded-xl hover:bg-blue-700">
                        Update Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateFood;
