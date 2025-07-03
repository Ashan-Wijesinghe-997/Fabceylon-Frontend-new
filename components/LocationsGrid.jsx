'use client';

const LocationsGrid = () => {
  const locations = [
    {
      name: "Cafe Nuwara",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=300&fit=crop",
      description: "Cozy mountain cafe experience"
    },
    {
      name: "Fab Ceylon Kandy",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop",
      description: "Traditional flavors in the cultural capital"
    },
    {
      name: "Fab Ceylon Grand",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=300&h=300&fit=crop",
      description: "Premium dining experience"
    },
    {
      name: "Fab Ceylon Kurunegala",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop",
      description: "Authentic Sri Lankan cuisine"
    }
  ];

  return (
    <section id="locations" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="text-orange-500">Locations</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our premium restaurant locations across Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                {location.name}
              </h3>
              <p className="text-gray-400 mb-4">{location.description}</p>

              <button className="text-orange-500 hover:text-orange-400 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsGrid;
