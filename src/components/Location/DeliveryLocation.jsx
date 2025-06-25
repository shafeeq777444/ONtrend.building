import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { X } from "lucide-react";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { setLocation, setLocationName } from "../../features/user/userSlice";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const libraries = ["places"];

const DeliveryLocation = ({
  closeModal,
  addressExpiry,
  location,
  locationName,
  setAddressExpiry,
}) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const defaultCenter = { lat: 23.588, lng: 58.3829 };
  const autocompleteRef = useRef(null);
  const [map, setMap] = useState(null);
  const hasTriggeredRef = useRef(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
    await localforage.setItem("AddressExp", Date.now());

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.panTo(newLocation);
      map.setZoom(13);
      setTimeout(() => map.setZoom(15), 400);
    }
  };

  let locationWatchID = null;

  const userCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        isArabic
          ? "الموقع غير مدعوم في المتصفح الخاص بك"
          : "Geolocation is not supported by your browser."
      );
      return;
    }

    locationWatchID = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const currentLocation = { lat, lng };

        await localforage.setItem("userLocation", currentLocation);
        await localforage.setItem("AddressExp", Date.now());
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
            localforage.setItem("AddressExp", Date.now());
          } else {
            console.error("Geocoder failed due to:", status);
          }
        });

        navigator.geolocation.clearWatch(locationWatchID);
        setAddressExpiry(false);
      },
      (error) => {
        console.error("Error watching location:", error);
        // toast.error(
        //   isArabic ? "تعذر تحديد موقعك الحالي" : "Unable to retrieve your location."
        // );
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
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
        localforage.setItem("AddressExp", Date.now());
      } else {
        console.error("Geocoder failed:", status);
      }
    });
  };

  useEffect(() => {
    if (addressExpiry && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      userCurrentLocation();
    }
  }, [addressExpiry]);

  if (loadError) return <div>{isArabic ? "خطأ في تحميل الخريطة" : "Error loading maps"}</div>;
  if (!isLoaded) return <div>{isArabic ? "جارٍ التحميل..." : "Loading..."}</div>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="bg-zinc-900 rounded-2xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden relative border border-zinc-700">
        {location && locationName && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-gray-300 hover:text-red-500 border border-zinc-700 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        )}

        {locationName && (
          <div className="p-3 bg-zinc-800 text-center text-sm font-medium italic text-zinc-300 border-b border-zinc-700">
            {isArabic ? "العنوان المختار:" : "Selected Address:"}{" "}
            <span className="font-semibold text-white">{locationName}</span>
          </div>
        )}

        <h2 className="text-xl font-bold text-white px-4 pt-4 text-center pb-2 tracking-wide">
          {isArabic ? "أين تريد التوصيل؟" : "Where Should We Deliver?"}
        </h2>

        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChanged}
        >
          <div className="p-4 border-b border-zinc-700 bg-transparent">
            <input
              type="text"
              placeholder={
                isArabic ? "ابحث عن عنوان التوصيل" : "Search delivery address"
              }
              className="w-full px-4 py-2 border bg-zinc-800 text-white placeholder-gray-400 border-zinc-700 rounded-md focus:outline-none focus:ring-0 text-sm"
            />
          </div>
        </Autocomplete>

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

        <div className="p-4 flex justify-between sm:justify-end items-center gap-x-3 border-t border-zinc-700 bg-zinc-800">
          <button
            onClick={userCurrentLocation}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md"
          >
            {isArabic ? "استخدم موقعي الحالي" : "Use Current Location"}
          </button>

          {location && locationName && (
            <button
              onClick={closeModal}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 shadow-md"
            >
              {isArabic ? "تم" : "Done"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryLocation;
