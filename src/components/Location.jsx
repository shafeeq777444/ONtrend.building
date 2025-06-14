import React, { useEffect, useState } from "react";
import localforage from "localforage";

const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export default function LocationComponent() {
    const [location, setLocation] = useState({
        location: { lat: null, lng: null },
        timestamp: null,
    });

    useEffect(() => {
        const loadLocation = async () => {
            try {
                const stored = await localforage.getItem("userLocation");

                const isValid = stored && stored.location && stored.timestamp && Date.now() - stored.timestamp < ONE_HOUR;

                if (isValid) {
                    // Use cached location
                    setLocation(stored);
                } else {
                    // Get new location
                    if (navigator?.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const newLocation = {
                                    location: {
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude,
                                    },
                                    timestamp: Date.now(),
                                };

                                setLocation(newLocation);
                                localforage.setItem("userLocation", newLocation);
                            },
                            (error) => {
                                console.error("Error getting location:", error);

                                if (error.code === 1) {
                                    alert("Permission denied. Please allow location access.");
                                } else if (error.code === 2) {
                                    alert("Location unavailable. Please ensure your device has location enabled.");
                                } else if (error.code === 3) {
                                    alert("Location request timed out. Try again.");
                                }

                                // Optionally fallback to cached location
                            }
                        );
                    } else {
                        console.error("Geolocation is not supported by this browser.");
                    }
                }
            } catch (err) {
                console.error("Failed to load location from storage", err);
            }
        };

        loadLocation();
    }, []);

    return (
        <div>
            <h2>Your Current Location</h2>
            <p>Latitude: {location.location.lat}</p>
            <p>Longitude: {location.location.lng}</p>
        </div>
    );
}
