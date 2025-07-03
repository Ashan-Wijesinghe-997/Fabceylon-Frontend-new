'use client';

import Link from 'next/link';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import LocationsGrid from '@/components/LocationsGrid';
import FeaturedSection from '@/components/FeaturedSection';
import RestaurantDetails from '@/components/RestaurantDetails';
import TestimonialsSection from '@/components/TestimonialsSection';


const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-x-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZjIwMjQiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />

      <NavBar />
      <HeroSection />
      <LocationsGrid />
      <FeaturedSection />
      <RestaurantDetails />
      <TestimonialsSection />

      {/* Quick Access to Cafe Nuwara - Fixed Navigation */}
      
    </div>
  );
};

export default Index;
