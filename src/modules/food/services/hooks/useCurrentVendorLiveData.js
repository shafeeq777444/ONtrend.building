import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const useCurrentVendorLiveData = (vendorId) => {
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
          setVendorData({ id: vendorId, ...docSnap.data() });
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
  }, [vendorId]);

  return { data: vendorData, isLoading };
};
