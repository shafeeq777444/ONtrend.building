import { useEffect } from "react";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { setLocation, setLocationName } from "@/features/user/userSlice";

const useWatchLocation = (map) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const watchID = navigator.geolocation.watchPosition(
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
      },
      (error) => {
        console.error("Error watching location:", error);
        // alert("Unable to retrieve your location.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    // Cleanup when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchID);
    };
  }, [map, dispatch]);
};

export default useWatchLocation;
