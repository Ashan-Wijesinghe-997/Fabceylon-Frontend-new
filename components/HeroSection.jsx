'use client';

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[70vh]">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              CHOOSE THE{" "}
              <span className="text-orange-500 animate-pulse">BEST</span>
              <br />
              AMONG BEST{" "}
              <span className="text-orange-500">FOODS</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl">
              Experience authentic Sri Lankan cuisine across our premium restaurant locations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 transform hover:scale-105">
                Explore Menu
              </button>
              <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Find Location
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-orange-500/20 to-orange-700/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-orange-500/30">
                <img
                  src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=500&fit=crop"
                  alt="Delicious Burger"
                  className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl animate-bounce"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500/30 rounded-full animate-pulse" />
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-orange-400/20 rounded-full animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
