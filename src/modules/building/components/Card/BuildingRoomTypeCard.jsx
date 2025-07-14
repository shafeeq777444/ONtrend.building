import React from "react";

const BuildingRoomTypeCard = () => {
  return (
    <div className="w-[280px]  rounded-2xl overflow-hidden shadow-xl relative  hover:scale-[1.02] transition-transform duration-300 mx-20 ">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Hotel"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white">
        <h3 className="text-xl font-bold">2BHK</h3>
        <div className="flex justify-between items-center mt-1 text-sm">
          <p>Start Price <span className="font-medium">OMR 20.000</span></p>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            143 Rooms
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuildingRoomTypeCard;
