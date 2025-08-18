import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// --- Live function (subscribe) ---
export function subscribeVendorFoodCategories(vendorId, onData, onError) {
  try {
    const q = query(
      collectionGroup(db, "details"),
      where("isApproved", "==", true),
      where("addedBy", "==", vendorId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tagSet = new Set();
        const localTagSet = new Set();

        snapshot.forEach((doc) => {
          const data = doc.data();

          // English tags
          if (data?.tag) tagSet.add(data.tag);
          if (data?.localTag) {
            const trimmed = data.localTag.trim();
            if (trimmed) localTagSet.add(trimmed);
          }
          
        });

        const tags = ["All", ...Array.from(tagSet)];
        const localTags = ["الكل", ...Array.from(localTagSet)];

        // Return both
        onData({ tags, localTags });
      },
      (error) => {
        console.error("Error fetching categories:", error);
        onError?.(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up category subscription:", error);
    return () => {};
  }
}
