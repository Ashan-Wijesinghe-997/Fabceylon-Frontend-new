'use client';

import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa6';
import { SiTripadvisor } from 'react-icons/si';
import { useState } from 'react';

const Footer = () => {
  const cafes = [
    {
      name: 'Cafe Nuwara',
      address: '123 Mountain Rd, Nuwara Eliya, Sri Lanka',
      phone: '+94 71 234 5678',
      socials: {
        facebook: '#',
        instagram: '#',
        tiktok: '#',
        tripadvisor: '#',
      },
    },
    {
      name: 'Fab Ceylon Kandy',
      address: '45 Temple St, Kandy, Sri Lanka',
      phone: '+94 77 987 6543',
      socials: {
        facebook: '#',
        instagram: '#',
        tiktok: '#',
        tripadvisor: '#',
      },
    },
    {
      name: 'Fab Ceylon Grand',
      address: '88 Ocean View, Colombo, Sri Lanka',
      phone: '+94 76 345 6789',
      socials: {
        facebook: '#',
        instagram: '#',
        tiktok: '#',
        tripadvisor: '#',
      },
    },
    {
      name: 'Fab Ceylon Kurunegala',
      address: '67 Lake Rd, Kurunegala, Sri Lanka',
      phone: '+94 78 456 7890',
      socials: {
        facebook: '#',
        instagram: '#',
        tiktok: '#',
        tripadvisor: '#',
      },
    },
  ];

  const icons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    tiktok: FaTiktok,
    tripadvisor: SiTripadvisor,
  };

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {cafes.map((cafe, index) => (
          <div key={index}>
            <h4 className="text-xl font-semibold text-orange-500 mb-3">{cafe.name}</h4>
            <p className="text-sm mb-1">{cafe.address}</p>
            <p className="text-sm mb-3">Phone: {cafe.phone}</p>
            <div className="flex gap-4">
              {Object.entries(cafe.socials).map(([key, href], i) => {
                const Icon = icons[key];
                return (
                  <div className="relative group" key={i}>
                    <Link
                      href={href}
                      target="_blank"
                      className="text-gray-300 hover:text-orange-500 transition-transform duration-300 ease-in-out transform group-hover:scale-125"
                    >
                      <Icon size={18} />
                    </Link>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Fab Ceylon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
