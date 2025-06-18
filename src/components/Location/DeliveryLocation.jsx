import React, { useCallback, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { X } from "lucide-react";
import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setLocationName } from "../../features/user/userSlice";

const DeliveryLocation = ({ closeModal }) => {
  const dispatch = useDispatch();
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { location, locationName } = useSelector((state) => state.user);

  const defaultCenter = { lat: 23.588, lng: 58.3829 };
  const autocompleteRef = useRef(null);
  const [map, setMap] = useState(null);

  const handleMapLoad = useCallback((mapInstance) => {
    mapInstance.panTo(defaultCenter);
    setMap(mapInstance);
  }, []);

  const handlePlaceChanged = async () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const newLocation = { lat, lng };

    await localforage.setItem("userLocation", newLocation);
    dispatch(setLocation(newLocation));

    const address = place.formatted_address || place.name || "";
    dispatch(setLocationName(address));
    await localforage.setItem("userAddress", address);

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.panTo(newLocation);
      map.setZoom(13);
      setTimeout(() => map.setZoom(15), 400);
    }
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const currentLocation = { lat, lng };

        await localforage.setItem("userLocation", currentLocation);
        dispatch(setLocation(currentLocation));

        if (map) {
          map.panTo(currentLocation);
          map.setZoom(15);
        }

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: currentLocation }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            dispatch(setLocationName(address));
            localforage.setItem("userAddress", address);
          } else {
            console.error("Geocoder failed due to:", status);
          }
        });
      },
      (error) => {
        console.error("Error getting current location:", error);
        alert("Unable to retrieve your location.");
      }
    );
  };

  const handleMarkerDragEnd = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const draggedLocation = { lat, lng };

    await localforage.setItem("userLocation", draggedLocation);
    dispatch(setLocation(draggedLocation));
    map.panTo(draggedLocation);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: draggedLocation }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        dispatch(setLocationName(address));
        localforage.setItem("userAddress", address);
      } else {
        console.error("Geocoder failed:", status);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden relative border border-zinc-700">
        {/* Close Button */}
        {location && locationName && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-gray-300 hover:text-red-500 border border-zinc-700 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        )}

        {/* Address Info */}
        {locationName && (
          <div className="p-3 bg-zinc-800 text-center text-sm font-medium italic text-zinc-300 border-b border-zinc-700">
            📍 Selected Address:{" "}
            <span className="font-semibold text-white">{locationName}</span>
          </div>
        )}

        <LoadScript
          googleMapsApiKey={GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          {/* Heading */}
          <h2 className="text-xl font-bold text-white px-4 pt-4 text-center pb-2 tracking-wide">
            Where Should We Deliver?
          </h2>

          {/* Autocomplete Input */}
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceChanged}
          >
            <div className="p-4 border-b border-zinc-700 bg-transparent">
              <input
                type="text"
                placeholder="Search delivery address"
                className="w-full px-4 py-2 border bg-zinc-800 text-white placeholder-gray-400 border-zinc-700 rounded-md focus:outline-none focus:ring-0 text-sm"
              />
            </div>
          </Autocomplete>

          {/* Google Map */}
          <div className="w-full h-[60vh] bg-zinc-800 border-t border-zinc-700">
            <GoogleMap
              onLoad={handleMapLoad}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={15}
              center={location}
            >
              <Marker
                position={location}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              />
            </GoogleMap>
          </div>

          {/* Bottom Buttons */}
          <div className="p-4 flex justify-end items-center border-t border-zinc-700 bg-zinc-800">
            <button
              onClick={useCurrentLocation}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md"
            >
              Use Current Location
            </button>
          </div>
        </LoadScript>
      </div>
    </div>
  );
};

export default DeliveryLocation;
