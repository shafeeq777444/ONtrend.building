import React from "react";

const BuildingRoomTypeCardInMobile = () => {
  return (
    <div className="w-[160px] h rounded-xl overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-300">
      {/* Room Image */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Room Type"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Room Name */}
      <div className="bg-white text-center py-2 px-2">
        <h3 className="text-sm font-semibold text-gray-700">2BHK</h3>
      </div>
    </div>
  );
};

export default BuildingRoomTypeCardInMobile;
