/* eslint-disable no-unused-vars */
import React, { useRef, useCallback, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { silverMapStyle } from "@/shared/utils/constants";


const BuildingLocationMap = ({
  latitude = 17.0193,
  longitude = 54.0894,
  country = "",
  state = "",
  city = "",
}) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const toggleFullscreen = () => {
    const container = mapContainerRef.current;
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const handleOpenInGoogleMaps = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(currentZoom - 1);
    }
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const containerStyle = {
    width: isFullscreen ? "100vw" : "72vw",
    height: isFullscreen ? "100vh" : "400px",
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
    <h2 className="text-2xl pl-2 font-semibold text-gray-800 mb-2 mt-10">
        Where you'll be
      </h2>
      <p className="text-gray-600 pl-2 text-sm ">
        {city && `${city}, `}
        {state && `${state}, `}
        {country}
      </p>
    <div className="flex flex-col items-center justify-center mt-6 px-4">
      {/* Heading */}
      

      {/* Map Container */}
      <div
        style={containerStyle}
        ref={mapContainerRef}
        className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-md"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            gestureHandling: "greedy",
            scrollwheel: false,
            mapTypeControl: false,
            zoomControl: false,
            styles: silverMapStyle,
          }}
          onLoad={onLoad}
        >
          <Marker
            position={center}
            icon={{
              url: "/googleMap/homeLocation.gif", // Customize as needed
              scaledSize: new window.google.maps.Size(60, 60),
            }}
          />
        </GoogleMap>

        {/* Open in Google Maps */}
        <button
          onClick={handleOpenInGoogleMaps}
          className="absolute bottom-8 left-4 z-10 backdrop-blur-md bg-white/70 rounded-full p-2 shadow-sm hover:bg-blue-100 transition"
        >
          <img
            src="/googleMap/direction.png"
            alt="Open in Google Maps"
            className="w-6 h-6"
          />
        </button>

        {/* Custom Zoom Controls */}
        <div className="absolute top-20 left-4 z-10 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="bg-white rounded-full p-3 shadow hover:bg-blue-100 transition"
          >
            <span className="text-xl font-bold">+</span>
          </button>
          <button
            onClick={handleZoomOut}
            className="bg-white rounded-full p-3 shadow hover:bg-blue-100 transition"
          >
            <span className="text-xl font-bold">−</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BuildingLocationMap;
