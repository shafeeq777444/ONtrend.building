import React, { useState } from "react";

const BuildingRoomTypeCard = ({ roomType, selected }) => {
  const fallback = {
    icon: "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    type: "Room Type",
    count: 0,
    price: 50,
  };
  const [imgSrc, setImgSrc] = useState(roomType?.icon || fallback.icon);

  return (
    <div
      className={`w-[340px] rounded-2xl overflow-hidden relative transition-transform duration-300 mx-4
        ${selected ? "scale-105 shadow-2xl" : "scale-100 shadow-md  hover:scale-[1.02]"}
       
      `}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imgSrc}
          alt={roomType?.type || fallback.type}
          className="w-full h-full object-cover"
          onError={() => setImgSrc(fallback.icon)}
        />
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white">
        <h3 className="text-xl font-bold">{roomType?.type || fallback.type}</h3>
        <div className="flex justify-between items-center mt-1 text-sm">
          <p>
            Start Price{" "}
            <span className="font-medium">
              {roomType?.price
                ? `OMR ${roomType.price.toFixed(3)}`
                : fallback.price.toFixed(3)}
            </span>
          </p>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
            {roomType?.count || fallback.count} Rooms
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuildingRoomTypeCard;
