import { FaMapMarkerAlt, FaBed, FaUser, FaCalendarAlt } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md space-x-4 w-full max-w-6xl mx-auto">
      
      {/* Location */}
      <div className="flex flex-col w-full max-w-[180px]">
        <label className="flex items-center text-sm font-medium mb-2">
          <FaMapMarkerAlt className="mr-2" /> Location
        </label>
        <input
          type="text"
          placeholder="Type location"
          className="w-full bg-[#f2f2f2] text-gray-700 px-4 py-3 rounded-md placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Rooms & Persons */}
      <div className="flex flex-col w-full max-w-[220px]">
        <label className="text-sm font-medium mb-2">Rooms & Guests</label>
        <div className="flex items-center space-x-3">
          {/* Rooms */}
          <div className="flex items-center bg-[#f2f2f2] px-3 py-3 rounded-md w-1/2">
            <FaBed className="text-gray-600 mr-2" />
            <input
              type="number"
              min="1"
              placeholder="Rooms"
              className="bg-transparent w-full outline-none placeholder-gray-500"
            />
          </div>
          {/* Persons */}
          <div className="flex items-center bg-[#f2f2f2] px-3 py-3 rounded-md w-1/2">
            <FaUser className="text-gray-600 mr-2" />
            <input
              type="number"
              min="1"
              placeholder="Persons"
              className="bg-transparent w-full outline-none placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Check-in */}
      <div className="flex flex-col w-full max-w-[160px]">
        <label className="flex items-center text-sm font-medium mb-2">
          <FaCalendarAlt className="mr-2" /> Check-in
        </label>
        <input
          type="date"
          className="w-full bg-[#f2f2f2] text-gray-700 px-4 py-3 rounded-md placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Check-out */}
      <div className="flex flex-col w-full max-w-[160px]">
        <label className="flex items-center text-sm font-medium mb-2">
          <FaCalendarAlt className="mr-2" /> Check-out
        </label>
        <input
placeholder="Date"
          className="w-full bg-[#f2f2f2] text-gray-700 px-4 py-3 rounded-md placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <button className="bg-black text-white px-6 py-3 rounded-md font-semibold h-[48px] mt-5">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
