'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { jwtDecode } from 'jwt-decode';



const AddFood = () => {
    const router = useRouter(); // useRouter for Next.js navigation
    const [file, setFile] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null); 
    const [formData, setFormData] = useState({
        foodName: '',
        price: '',
        description: '',
        foodCategory: '',
        isDeliveryAvailable: ''
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile); 
        setImagePreview(URL.createObjectURL(imageFile)); 
    };

    const addFood = async () => {
        const token = localStorage.getItem('admin');
        
        let adminId = null;
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                adminId = decodedToken._id; // Ensure _id exists in the decoded token
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }


        const formDataObj = new FormData();
        formDataObj.append('foodName', formData.foodName);
        formDataObj.append('price', formData.price);
        formDataObj.append('description', formData.description);
        formDataObj.append('foodCategory', formData.foodCategory);
        formDataObj.append('isDeliveryAvailable', formData.isDeliveryAvailable);
        formDataObj.append('image', file); 
        formDataObj.append('admin_id', adminId);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL_ADDRESS}/api/admins/createfood`,
                formDataObj,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            toast.success('Successfully created Food', { containerId: 'successMessage' });
            router.push('/admin/foods'); 
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred', { containerId: 'ErrorMessage' });
        }
    };

    return (
        <div className="relative flex items-center justify-center w-full min-h-screen bg-gray-100">
            <div className="absolute w-[680px] bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 shadow-lg rounded-md mb-5">
                <h1 className="mb-6 text-2xl font-bold text-center">Add Food</h1>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="flex justify-center mb-4">
                        <img src={imagePreview} alt="Selected" className="w-[100px] h-[100px] rounded-full border-2 border-green-500 object-cover" />
                    </div>
                )}

                {/* Upload Image Button - changed color to blue */}
                <div className="mb-4">
                    
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        id="upload-profile-image"
                    />
                    <label htmlFor="upload-profile-image" className="block px-4 py-2 text-center text-white bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700">
                        Upload Image
                    </label>
                </div>

                

                {/* Food Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Food Name"
                        name="foodName"
                        value={formData.foodName}
                        onChange={changeHandler}
                        className="h-[40px] w-full bg-white border border-[#c9c9c9] rounded-[20px] text-[14px] pl-2 text-[#333]"
                    />
                </div>

                {/* Price Input */}
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={formData.price}
                        onChange={changeHandler}
                        className="h-[40px] w-full bg-white border border-[#c9c9c9] rounded-[20px] text-[14px] pl-2 text-[#333]"
                    />
                </div>

                {/* Description Textarea */}
                <div className="mb-4">
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={changeHandler}
                        rows={4}
                        className="h-[40px] w-full bg-white border border-[#c9c9c9] rounded-[20px] text-[14px] pl-2 text-[#333] resize-none p-2"
                    />
                </div>

                {/* Food Category Dropdown */}
                <div className="mb-4">
                    <select
                        name="foodCategory"
                        value={formData.foodCategory}
                        onChange={changeHandler}
                        className="h-[40px] w-full bg-white border border-[#c9c9c9] rounded-[20px] text-[14px] pl-2 text-[#333]"
                    >
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

                {/* Delivery Available Dropdown */}
                <div className="mb-4">
                    <select
                        name="isDeliveryAvailable"
                        value={formData.isDeliveryAvailable}
                        onChange={changeHandler}
                        className="h-[40px] w-full bg-white border border-[#c9c9c9] rounded-[20px] text-[14px] pl-2 text-[#333]"
                    >
                        <option value="" disabled>Is Delivery Available?</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                {/* Add Food Button - changed color to blue */}
                <div className="mt-6">
                    <button
                        onClick={addFood}
                        className="w-full py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Add Food
                    </button>
                </div>
            </div>

            <ToastContainer containerId="successMessage" />
            <ToastContainer containerId="ErrorMessage" />
        </div>
    )
}

export default AddFood
