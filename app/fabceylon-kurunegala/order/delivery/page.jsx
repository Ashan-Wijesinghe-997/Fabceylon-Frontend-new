'use client';
import React, { useState, useEffect } from 'react';
import KurunagalMainNavBar from '@/components/Fab-Kurunegala-Main-Navbar';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import LocationMark from '@/components/Assets/mark.png';
import Fabceylon_logo from "@/components/Assets/Fabceylon_logo.png";
import 'leaflet/dist/leaflet.css';
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import { useRouter } from 'next/navigation';  // Use this instead of 'next/router'

const CAFE_COORDS = { lat: 7.4893, lng: 80.3653 };
const DELIVERY_RADIUS_KM = 5;

const customUserIcon = new L.Icon({
    iconUrl: LocationMark.src,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
});

const cafeIcon = new L.Icon({
    iconUrl: Fabceylon_logo.src,
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -45],
});

export default function EnterAddress() {
    const [address, setAddress] = useState('');
    const [userCoords, setUserCoords] = useState(null);
    const [isDeliveryAccepted, setIsDeliveryAccepted] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();  // Use the router from next/navigation

    useEffect(() => {
        const storedDeliveryStatus = localStorage.getItem('deliveryAccepted');
        if (storedDeliveryStatus !== null) {
            setIsDeliveryAccepted(storedDeliveryStatus === 'true');
        }
    }, []);

    const fetchUserCoordinates = async (address) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await response.json();
            if (data.length === 0) {
                setError('Address not found. Please enter a valid address.');
                return null;
            }
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        } catch (error) {
            setError('Failed to fetch location data.');
            return null;
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const handleConfirmAddress = async (e) => {
        e.preventDefault();
        setError('');
        setIsDeliveryAccepted(null);

        const coords = await fetchUserCoordinates(address);
        if (!coords) return;

        setUserCoords(coords);
        const distance = calculateDistance(CAFE_COORDS.lat, CAFE_COORDS.lng, coords.lat, coords.lng);
        const accepted = distance <= DELIVERY_RADIUS_KM;

        localStorage.setItem('deliveryAccepted', accepted.toString());
        setIsDeliveryAccepted(accepted);

        if (accepted) {
            localStorage.setItem('approvedAddress', address); // Store the approved address
            setIsDeliveryAccepted(true);
            toast.success('Delivery is available in your area!', { containerId: 'successMessage' });

            // if delivery is accepted
            router.push('/fabceylon-kurunegala/order/delivery/appetizers');
        } else {
            toast.error('Sorry, delivery is not available in your area.', { containerId: 'ErrorMessage' });
        }
    };

    return (
        <div className='bg-gradient-to-b from-gray-900 via-black to-gray-900'>
            <KurunagalMainNavBar />
            <div className="flex flex-col items-center w-full min-h-screen ">
                
                {/* Map Section */}
                <div className="w-full max-w-4xl mt-4 overflow-hidden rounded-lg shadow-lg" style={{ borderRadius: '20px' }}>
                    <MapContainer center={[CAFE_COORDS.lat, CAFE_COORDS.lng]} zoom={13} className="w-full" style={{ height: '400px', borderRadius: '20px' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        
                        {/* Cafe Marker with FabCeylon Logo */}
                        <Marker position={[CAFE_COORDS.lat, CAFE_COORDS.lng]} icon={cafeIcon}>
                            <Popup>
                                <div className="text-center">
                                    <img src={Fabceylon_logo.src} alt="Fab Ceylon" className="mx-auto mb-2 h-7 w-7"/>
                                    <p><strong>Fab Ceylon - Kurunegala</strong></p>
                                </div>
                            </Popup>
                        </Marker>

                        {/* User Location Marker */}
                        {userCoords && (
                            <Marker position={[userCoords.lat, userCoords.lng]} icon={customUserIcon}>
                                <Popup>Your Location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>

                {/* Address Form Section */}
                <div className="w-full max-w-4xl px-4 mt-4">
                    <h2 className="mb-2 text-2xl font-semibold text-center text-gray-100">Enter Delivery Location</h2>
                    <motion.form 
                        className="flex items-center w-full p-4 bg-gray-800 rounded-lg shadow-lg bg-opacity-90"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        onSubmit={handleConfirmAddress}
                    >
                        {/* Address Input */}
                        <motion.input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="w-4/5 p-2  bg-gray-200 text-black rounded-lg outline-none focus:ring-2 focus:ring-[#eb650f] mr-4"
                            placeholder="No6/8, Dambulla Road, Kurunegala, Sri Lanka"
                        />

                        {/* Confirm Button */}
                        <motion.button 
                            type="submit"
                            className="w-1/5 p-2 font-semibold text-black bg-[#eb650f] rounded-lg hover:bg-opacity-90 transition-transform duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Confirm
                        </motion.button>
                    </motion.form>

                    {/* Error Message */}
                    {error && <div className="p-3 mt-4 text-center bg-red-500 rounded-lg">{error}</div>}
                </div>
            </div>

            {/* Toast Containers for Success and Error Messages */}
            <ToastContainer containerId="successMessage" />
            <ToastContainer containerId="ErrorMessage" />
        </div>
    );
}
