// src/lib/firebase/fireStore/vendorFoods.js
import {
  collectionGroup,
  query,
  where,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

/**
 * Subscribe to vendor foods with pagination
 */
export const subscribeVendorFoodsPaginated = (
  vendorId,
  pageSize = 12,
  lastVisibleDoc = null,
  categoryFilter = "All",
  onUpdate,
  onError
) => {
  try {
    let filters = [
      where("isApproved", "==", true),
      where("addedBy", "==", vendorId),
    ];

    if (categoryFilter && categoryFilter !== "All") {
      filters.push(where("tag", "==", categoryFilter));
    }

    let q = query(
      collectionGroup(db, "details"),
      ...filters,
      limit(pageSize)
    );

    if (lastVisibleDoc) {
      q = query(q, startAfter(lastVisibleDoc));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const foods = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          category: doc.data()?.tag || "Unknown",
        }));

        onUpdate({
          foods,
          lastVisible: snapshot.docs[snapshot.docs.length - 1] || null,
          hasMore: snapshot.size === pageSize,
        });
      },
      (error) => {
        console.error("Error subscribing to foods:", error);
        onError?.(error);
      }
    );

    return unsubscribe; // cleanup
  } catch (error) {
    console.error("Error setting up subscription:", error);
    onError?.(error);
    return () => {}; // dummy unsubscribe
  }
};
