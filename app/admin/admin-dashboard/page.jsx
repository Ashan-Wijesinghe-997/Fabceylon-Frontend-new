// pages/admin-dashboard.js
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 min-h-screen p-5 text-white bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-center">Food Ordering Admin</h2>
        <nav>
          <ul>
            <li><a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">Dashboard</a></li>
            <li><a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">Orders</a></li>
            <li><a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">Menu</a></li>
            <li><a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">Customers</a></li>
            <li><a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">Reports</a></li>
            <li><a href="#" className="block px-4 py-2 rounded-lg hover:bg-gray-700">Settings</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Navbar */}
        <div className="flex items-center justify-between p-4 mb-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button 
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => router.push('/login')}
          >
            Log Out
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Total Orders */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>

          {/* Card 2: Total Menu Items */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Menu Items</h3>
            <p className="text-3xl font-bold text-green-600">56</p>
          </div>

          {/* Card 3: Total Revenue */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-3xl font-bold text-yellow-600">$12,345</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Recent Orders</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="px-4 py-2 font-semibold text-gray-600">Order ID</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Customer</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Status</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Total</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">1234</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2 text-green-600">Completed</td>
                <td className="px-4 py-2">$150</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">View</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">1235</td>
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2 text-yellow-600">Pending</td>
                <td className="px-4 py-2">$85</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">View</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">1236</td>
                <td className="px-4 py-2">Sam Wilson</td>
                <td className="px-4 py-2 text-red-600">Cancelled</td>
                <td className="px-4 py-2">$230</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Menu Items Table */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Menu Items</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-200">
                <th className="px-4 py-2 font-semibold text-gray-600">Item Name</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Category</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Price</th>
                <th className="px-4 py-2 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Cheeseburger</td>
                <td className="px-4 py-2">Main Course</td>
                <td className="px-4 py-2">$9.99</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">Edit</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">French Fries</td>
                <td className="px-4 py-2">Side Dish</td>
                <td className="px-4 py-2">$3.99</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">Edit</button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">Vanilla Shake</td>
                <td className="px-4 py-2">Beverage</td>
                <td className="px-4 py-2">$4.50</td>
                <td className="px-4 py-2">
                  <button className="px-3 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
