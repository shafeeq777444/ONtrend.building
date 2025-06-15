import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import localforage from "localforage";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setLocationName } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const DeliveryLocation = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const { location, locationName } = useSelector((state) => state.user);
    console.log(locationName,"--location name");
    const defaultCenter = {
        lat: 23.588,
        lng: 58.3829,
    };
    const mapStyles = [
        {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }],
        },
        {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#000000" }],
        },
    ];
    const autocompleteRef = useRef(null);
    const [map, setMap] = useState(null);

    const googleMapOnLoad = useCallback(
        (mapInstance) => {
            mapInstance.panTo(defaultCenter);
            setMap(mapInstance);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // when input typing
    const onPlaceChanged = async () => {
        const place = autocompleteRef.current.getPlace();
            // lon,lan
        if (place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const newLocation = { lat, lng };
            await localforage.setItem("userLocation", newLocation);
            dispatch(setLocation(newLocation));
            // address
            const address = place.formatted_address || place.name;
            dispatch(setLocationName(address))
            await localforage.setItem("userAddress", address);

            if (place.geometry.viewport) {
                // Smooth zoom & center based on Google's suggested viewport
                map.fitBounds(place.geometry.viewport);
            } else {
                // Fallback if viewport not available
                map.panTo(newLocation);
                map.setZoom(13);
                setTimeout(() => {
                    map.setZoom(15);
                }, 400);
            }
        }
    };

    // when map icon dragging
    const dragging = async (e) => {
        // lon,lan
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const newLocation = { lat, lng };
        await localforage.setItem("userLocation", newLocation);
        dispatch(setLocation(newLocation));
        map.panTo({ lat, lng });

        // ✅ Get address using Geocoder
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            dispatch(setLocationName(address))
               localforage.setItem("userAddress", address);
            // You can save or display this address
        } else {
            console.error("Geocoder failed: " + status);
        }
    });

    };

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {locationName && (
          <div
            style={{
              padding: "10px",
              background: "#f9f9f9",
              fontSize: "16px",
              textAlign: "center",
              borderBottom: "1px solid #ddd",
              fontStyle: "italic",
            }}
          >
            📍 Selected Address: <strong>{locationName}</strong>
          </div>
        )}
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                <Autocomplete
                    onPlaceChanged={onPlaceChanged}
                    onLoad={(autocomplete) => {
                        autocompleteRef.current = autocomplete;
                    }}
                >
                    <div>
                        <input
                            type="text"
                            placeholder="Search delivery address"
                            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
                        />
                    </div>
                </Autocomplete>
                {console.log(location,"chek--locatio")}
                <GoogleMap onLoad={googleMapOnLoad} mapContainerStyle={{ width: "100%", height: "70vh" }} zoom={15}>
                    <Marker
                        position={location}
                        options={{ styles: mapStyles, disableDefaultUI: true, zoomControl: true }}
                        draggable={true}
                        onDragEnd={dragging}
                    />
                </GoogleMap>
                {/* Confirm Button */}
                <div style={{ padding: "12px", textAlign: "center" }}>
                    <button
                        onClick={()=>{navigate('/')}}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                        }}
                    >
                        Confirm Location
                    </button>
                </div>
            </LoadScript>
        </div>
    );
};

export default DeliveryLocation;
