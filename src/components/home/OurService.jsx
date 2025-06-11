const services = [
  { title: "Food", img: "/service/food_home_bg.png" },
  { title: "Groceries", img: "/service/groceries_home_bg.png" },
  { title: "E-Store", img: "/service/electronic_home_bg 2.png" },
  { title: "Health & Beauty", img: "/service/medicin_home.png" },
  { title: "Rent a Car", img: "/service/cars.png" },
  { title: "Hotels & Apartments", img: "/service/flats.png" },
];

const OurServices = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          Discover Our Services
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-10">
          From everyday needs to travel comfort, we connect you to trusted services in your community.
        </p>

        {/* Service Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center hover:scale-[1.05] transition-transform duration-300"
            >
              <div className="bg-gray-50 p-4 rounded-xl shadow-md hover:shadow-xl w-24 h-24 flex items-center justify-center">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-gray-700 mt-3 text-center">
                {service.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
