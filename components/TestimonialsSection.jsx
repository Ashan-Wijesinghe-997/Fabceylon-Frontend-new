'use client';

import { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Priya Perera",
      location: "Kandy",
      text: "Amazing authentic Sri Lankan food! The curry was perfectly spiced and the atmosphere was so welcoming. Will definitely come back!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Silva",
      location: "Colombo",
      text: "Fab Ceylon Grand exceeded all expectations. The service was impeccable and every dish was a masterpiece. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sanduni Fernando",
      location: "Nuwara Eliya",
      text: "Cafe Nuwara is my go-to place for coffee and comfort food. The ambiance is perfect for both work and relaxation.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Wilson",
      location: "Tourist",
      text: "As a visitor to Sri Lanka, this was hands down the best dining experience. Authentic flavors and excellent hospitality!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our <span className="text-orange-500">Customers</span> Say
          </h2>
          <p className="text-xl text-gray-300">
            Real experiences from our valued guests
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-8 py-12 text-center">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto mb-6 border-2 border-orange-500"
                    />
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-orange-500 text-xl">★</span>
                      ))}
                    </div>
                    
                    <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-orange-500">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-orange-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience Fab Ceylon?
            </h3>
            <p className="text-xl text-white/90 mb-6">
              Visit any of our locations and discover why we're Sri Lanka's favorite dining destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-colors duration-300">
                Book a Table
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
                View Our Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
