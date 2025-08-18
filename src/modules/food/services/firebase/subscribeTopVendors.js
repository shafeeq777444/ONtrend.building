import { collection, query, where, onSnapshot } from "firebase/firestore";
import localforage from "localforage";
import { getDistanceInKm } from "@/shared/utils/distance";
import { db } from "@/lib/firebase/config";

// Constants
const AVERAGE_SPEED_KMPH = 35; // average city driving speed
const MAX_DISTANCE_KM = 15;

// fetchAllTopVendors --(Top)-----------------------------(added:distance,estimate time)(food,grocery,pharmacy)
export function subscribeTopVendors(lat, lng, onData, onError) {
  const usersRef = collection(db, "users");
  const q = query(
    usersRef,
    where("role", "==", "Vendor"),
    where("isApproved", "==", true),
    where("isTop", "==", true)
  );

  return onSnapshot(
    q,
    async (snapshot) => {
      try {
        const vendors = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userLocation =
          (await localforage.getItem("userLocation")) || { lat, lng };

        const enrichedVendors = vendors
          .map((vendor) => {
            const loc = vendor.location;
            if (!loc?.lat || !loc?.lng) return null;

            const distance = getDistanceInKm(
              userLocation.lat,
              userLocation.lng,
              loc.lat,
              loc.lng
            );

            if (distance > MAX_DISTANCE_KM) return null;

            const estimatedTimeMin = Math.round(
              (distance / AVERAGE_SPEED_KMPH) * 60
            );
            const totalTimeWithCooking = estimatedTimeMin + 15;

            const finalTime =
              totalTimeWithCooking >= 25
                ? 25
                : Math.round(totalTimeWithCooking);

            return {
              ...vendor,
              distance: Math.max(1, Math.round(distance * 10) / 10), // e.g., 6.3 km
              estimatedTime: `${finalTime}`,
            };
          })
          .filter(Boolean)
          .sort((a, b) => (b.isOnline === true) - (a.isOnline === true));

        onData(enrichedVendors);
      } catch (err) {
        onError(err);
      }
    },
    (error) => {
      console.error("Firestore realtime error:", error);
      onError(error);
    }
  );
}
