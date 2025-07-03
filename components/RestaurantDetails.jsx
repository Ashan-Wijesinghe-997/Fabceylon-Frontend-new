'use client';

const RestaurantDetails = () => {
  const restaurants = [
    {
      name: "CAFE NUWARA",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=400&fit=crop",
      description:
        "Cafe Nuwara is a cozy, charming spot that offers a delightful blend of rich coffee and delicious bites in a warm, inviting atmosphere. Whether you're looking to catch up with friends or enjoy some quiet time, this cafe provides the perfect setting with its comfortable seating and friendly service.",
      reverse: false,
    },
    {
      name: "FAB CEYLON KANDY",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop",
      description:
        "Located in the cultural heart of Sri Lanka, Fab Ceylon Kandy offers an authentic dining experience that celebrates traditional Sri Lankan flavors with a modern presentation. Our warm, inviting atmosphere makes it perfect for family gatherings and cultural food enthusiasts.",
      reverse: true,
    },
    {
      name: "FAB CEYLON GRAND",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=400&fit=crop",
      description:
        "Fab Ceylon Grand is where culinary elegance meets vibrant Sri Lankan hospitality. Our upscale dining experience celebrates both the richness of traditional Sri Lankan cuisine and the allure of global flavors, all crafted with the finest ingredients.",
      reverse: false,
    },
    {
      name: "FAB CEYLON KURUNEGALA",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop",
      description:
        "Located in the heart of Kurunegala, Fab Ceylon offers a unique blend of Sri Lankan flavors with a modern twist. Known for our signature offerings, such as the Biriyani Bucket and the popular Fab Monster Boat, we deliver exceptional dining experiences.",
      reverse: true,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-wider">
            F A B C E Y L O N
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto" />
        </div>

        <div className="space-y-20">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                restaurant.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  {restaurant.name}
                </h3>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {restaurant.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                    View Menu
                  </button>
                  <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                    Book Table
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantDetails;
