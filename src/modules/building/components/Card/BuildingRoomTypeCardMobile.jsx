import React, { useState } from "react";

const fallback = {
  icon: "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
  type: "Room Type",
  count: 0,
  price: 50,
};

const BuildingRoomTypeCardMobile = ({ roomType, selected }) => {
  const [imgSrc, setImgSrc] = useState(roomType?.icon || fallback.icon);

  return (
    <div
      className={`flex flex-col items-center transition-transform duration-200 ${
        selected ? "scale-110" : "scale-100"
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full overflow-hidden border-2 border-transparent ${
          selected ? "border-blue-500" : ""
        }`}
      >
        <img
          src={imgSrc}
          alt={roomType?.type || fallback.type}
          className="w-full h-full object-cover"
          onError={() => setImgSrc(fallback.icon)}
        />
      </div>
      <span className="mt-2 text-sm text-center">
        {roomType?.type || fallback.type}
      </span>
    </div>
  );
};

export default BuildingRoomTypeCardMobile;
