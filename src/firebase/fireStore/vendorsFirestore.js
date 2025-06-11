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
    return vendors;
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    return [];
  }
}

