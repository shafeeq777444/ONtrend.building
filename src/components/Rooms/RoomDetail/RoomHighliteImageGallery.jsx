import React from "react";

const images = [
  "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const RoomHighliteImageGallery = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden">
      {/* Left Big Image */}
      <div className="col-span-2 row-span-2">
        <img
          src={images[0]}
          alt="Main"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Top Right */}
      <div className="col-span-2 row-span-1">
        <img
          src={images[1]}
          alt="Top Right"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Bottom Right - Two Images */}
      <div className="grid grid-cols-2 gap-2 col-span-2 row-span-1">
        {images.slice(2).map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={img}
              alt={`Bottom Right ${index}`}
              className="w-full h-full object-cover rounded-xl"
            />
            {index === 1 && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-xl hover:bg-black/40 transition-all cursor-pointer">
                <span className="text-white text-sm font-medium px-4 py-2 bg-white/10 rounded-full backdrop-blur-md">
                  Explore the Space
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomHighliteImageGallery;
