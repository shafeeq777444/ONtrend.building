import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

// fetchAllTopVendors --(Top)
export async function fetchAllTopVendors() {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("role", "==", "Vendor"),
      where("isApproved", "==", true),
      where("isTop", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const vendors = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Sort vendors by isOnline: true first
    const sortedVendors = vendors.sort((a, b) => {
      return (b.isOnline === true) - (a.isOnline === true);
    });
    return sortedVendors;
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return [];
  }
}

// fetchAllFoodVendors
export async function fetchAllFoodVendors(){try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("role", "==", "Vendor"),
      where("vendorType", "==", "Food/Restaurant"),
    );
    const querySnapshot = await getDocs(q);
    const vendors = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Sort vendors by isOnline: true first
    const sortedFoodVendors = vendors.sort((a, b) => {
      return (b.isOnline === true) - (a.isOnline === true);
    });
    return sortedFoodVendors;
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return [];
  }
}