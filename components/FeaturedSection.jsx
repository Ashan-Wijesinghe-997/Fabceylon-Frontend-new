'use client';

const FeaturedSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop"
                alt="Restaurant Interior"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

              {/* Floating stats */}
              <div className="absolute top-6 right-6 bg-orange-500 text-white p-4 rounded-xl">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>

              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-900 p-4 rounded-xl">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Authentic Sri Lankan <span className="text-orange-500">Experience</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Fab Ceylon Cafe and Restaurant offers a unique culinary experience with authentic Sri Lankan cuisine. 
              Our cozy restaurants feature traditional recipes and fresh ingredients, serving flavorful curries, 
              aromatic rice dishes, and delectable desserts. Guests enjoy warm hospitality in modern settings 
              across all our locations.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-500 mb-2">Premium</div>
                <div className="text-sm text-gray-400">Quality Ingredients</div>
              </div>
              <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-500 mb-2">Fresh</div>
                <div className="text-sm text-gray-400">Daily Preparation</div>
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 transform hover:scale-105">
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
