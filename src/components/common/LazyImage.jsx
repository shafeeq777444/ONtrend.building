import React, { useState } from "react";

const LazyImage = ({ src, alt, className, placeholder = "/extras/imageicon.png" }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {!loaded && (
        <div

          className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 transition-opacity duration-300"
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default LazyImage;
