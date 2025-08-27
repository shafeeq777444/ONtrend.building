import { collection, query, where, onSnapshot } from "firebase/firestore";

import localforage from "localforage";

import { db } from "@/lib/firebase/config";
import { getDistanceInKm } from "@/shared/utils/distance";

// Constants
const AVERAGE_SPEED_KMPH = 35; // average city driving speed
const MAX_DISTANCE_KM = 15;

/**
 * Subscribe to live vendors from Firestore
 */
export function subscribeFoodVendors(lat, lng, callback, onError) {
    try {
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            where("role", "==", "Vendor"),
            where("isApproved", "==", true),
            where("vendorType", "==", "Food/Restaurant")
        );

        const unsubscribe = onSnapshot(
            q,
            async (snapshot) => {
                const vendors = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                const userLocation = (await localforage.getItem("userLocation")) || { lat, lng };

                const enrichedVendors = vendors
                    .map((vendor) => {
                        const loc = vendor.location;
                        if (!loc?.lat || !loc?.lng) return null;

                        const distance = getDistanceInKm(userLocation.lat, userLocation.lng, loc.lat, loc.lng);

                        // if (distance > MAX_DISTANCE_KM) return null;

                        const estimatedTimeMin = Math.round((distance / AVERAGE_SPEED_KMPH) * 60);
                        // const totalTimeWithCooking = estimatedTimeMin + 15;

                        // const finalTime = totalTimeWithCooking >= 25 ? 25 : Math.round(totalTimeWithCooking);

                        return {
                            ...vendor,
                            // distance: Math.max(1, Math.round(distance * 10) / 10),
                            // estimatedTime: `${finalTime}`,
                            travelTime: estimatedTimeMin
                        };
                    })
                    .filter(Boolean)
                    .sort((a, b) => (b.isOnline === true) - (a.isOnline === true));

                callback(enrichedVendors);
            },
            (error) => {
                console.error("Live vendor fetch failed:", error);
                if (onError) onError(error);
            }
        );

        return unsubscribe; // 🔑 so caller can clean up
    } catch (err) {
        console.error("Subscribe vendors error:", err);
        if (onError) onError(err);
        return () => {};
    }
}
