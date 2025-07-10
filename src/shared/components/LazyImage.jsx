// // export default LazyImage;
// import React, { useState } from "react";

// const LazyImage = ({
//     src,
//     alt = "",
//     className = "",
//     placeholder = "/extras/imageicon.png",
// }) => {
//     const [loaded, setLoaded] = useState(false);

//     return (
//         <div
//             className={`relative w-full h-full overflow-hidden 

//     ${className}`}
//         >
//             {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />}

//             {/* Actual image */}
//             <img
//                 src={src || placeholder}
//                 alt={alt}
//                 onLoad={() => setLoaded(true)}
//                 className={`absolute inset-0 w-full h-full object-cover rounded-md transition duration-500 ease-in-out
//           ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
//         `}
//             />
//         </div>
//     );
// };

// export default LazyImage;
import React, { useState } from "react";

const LazyImage = ({
  src,
  alt = "image",
  className = "",
  containerClass = "",
  placeholder = "/extras/imageicon.png",
  onClick,
  onLoad,
  onError,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClass}`}

      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md z-0" />
      )}

      <img
        src={error ? placeholder : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`absolute inset-0 w-full h-full object-cover rounded-md transition duration-500 ease-in-out
          ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          ${className}
        `}
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
