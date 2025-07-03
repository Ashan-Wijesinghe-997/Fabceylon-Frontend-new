'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              FAB<span className="text-orange-500">CEYLON</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#home" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="#locations" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Locations
              </Link>
              <Link href="#menu" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Menu
              </Link>
              <Link href="#about" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-white hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-500 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 rounded-lg mt-2">
              <Link href="#home" className="text-white hover:text-orange-500 block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link href="#locations" className="text-white hover:text-orange-500 block px-3 py-2 text-base font-medium">
                Locations
              </Link>
              <Link href="#menu" className="text-white hover:text-orange-500 block px-3 py-2 text-base font-medium">
                Menu
              </Link>
              <Link href="#about" className="text-white hover:text-orange-500 block px-3 py-2 text-base font-medium">
                About
              </Link>
              <Link href="#contact" className="text-white hover:text-orange-500 block px-3 py-2 text-base font-medium">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
