
const RestaurantCard = ({ banner }) => {
  return (
    <div className="relative min-w-[250px] max-w-[250px] bg-white rounded-xl shadow overflow-hidden">
      {/* Banner Image */}
      <img
        src={banner.url}
        alt={banner.vendorName}
        className="h-48 w-full object-cover"
      />

      {/* Vendor Info */}
      <div className="p-3">
        <p className="text-md font-semibold text-gray-800">
          {banner.vendorName}
        </p>
        <p className="text-sm text-gray-500">
          {banner.vendorArabicName}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
