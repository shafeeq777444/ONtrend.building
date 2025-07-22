import React, { useState } from "react";

const LazyImg = ({
  src,
  alt = "image",
  className = "",
  placeholder = "/extras/imageicon.png",
  onClick,
  onLoad,
  onError,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [errorSrc, setErrorSrc] = useState(null);

  return (
    <img
      src={errorSrc || src}
      alt={alt}
      loading="lazy"
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setErrorSrc(placeholder);
        onError?.(e);
      }}
      onClick={onClick}
      className={`transition-opacity duration-300 ease-in-out
        ${loaded ? "opacity-100" : "opacity-0"}
        ${className}
      `}
    />
  );
};

export default React.memo(LazyImg);
