// import { useState, useEffect } from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";

// export const useCurrentVendorLiveData = (vendorId) => {
//   const [vendorData, setVendorData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     if (!vendorId) {
//       setVendorData(null);
//       setIsLoading(false);
//       return;
//     }

//     const docRef = doc(db, "users", vendorId);
//     const unsubscribe = onSnapshot(
//       docRef,
//       (docSnap) => {
//         if (docSnap.exists()) {
//           setVendorData({ id: vendorId, ...docSnap.data() });
//         } else {
//           setVendorData(null);
//         }
//         setIsLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching vendor data:", error);
//         setVendorData(null);
//         setIsLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [vendorId]);

//   return { data: vendorData, isLoading };
// };
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getDistanceInKm } from "@/shared/utils/distance";


const AVERAGE_SPEED_KMPH = 35; // city driving speed
const COOKING_TIME_MIN = 15;   // default cooking time

export const useCurrentVendorLiveData = (vendorId, userLocation) => {
  const [vendorData, setVendorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) {
      setVendorData(null);
      setIsLoading(false);
      return;
    }

    const docRef = doc(db, "users", vendorId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = { id: vendorId, ...docSnap.data() };

          // Calculate distance and delivery time if userLocation exists
          if (userLocation && data.location?.lat && data.location?.lng) {
            const distance = getDistanceInKm(
              userLocation.lat,
              userLocation.lng,
              data.location.lat,
              data.location.lng
            );

            if (distance > 15) {
              data.distance = "too far";
              data.estimatedTime = "no delivery";
            } else {
              const travelTime = (distance / AVERAGE_SPEED_KMPH) * 60; // in minutes
              const estimatedTime = Math.round(travelTime + COOKING_TIME_MIN);

              data.distance = distance?.toFixed(1); // km
              data.estimatedTime = estimatedTime >= 25 ? 25 : estimatedTime; // max 25 min
            }
          } else {
            data.distance = null;
            data.estimatedTime = null;
          }

          setVendorData(data);
        } else {
          setVendorData(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching vendor data:", error);
        setVendorData(null);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [vendorId, userLocation]);

  return { data: vendorData, isLoading };
};
