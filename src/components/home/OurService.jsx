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
    <section className="py-12 px-4 text-center bg-white ">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800  mb-10">
        Our Services
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center transition-transform duration-200 hover:scale-105"
          >
            <div className="bg-gray-100  p-4 rounded-2xl shadow hover:shadow-lg">
              <img
                src={service.img}
                alt={service.title}
                className="w-20 h-20 object-contain rounded-xl"
              />
            </div>
            <p className="text-sm md:text-base font-medium text-gray-700  mt-3">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
