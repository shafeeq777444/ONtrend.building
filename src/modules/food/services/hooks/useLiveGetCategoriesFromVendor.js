import { useState, useEffect } from "react";
import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const useLiveGetCategoriesFromVendor = (vendorId) => {
  const [categories, setCategories] = useState({ tags: [], localTags: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorId) return;

    const q = query(
      collectionGroup(db, "details"),
      where("addedBy", "==", vendorId)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tagsSet = new Set();
        const localTagsSet = new Set();

        snapshot.forEach((doc) => {
          const data = doc.data();
          const tag = data?.tag;           // English
          const localTag = data?.localTag; // Arabic / local

          if (tag) tagsSet.add(tag);
          if (localTag) localTagsSet.add(localTag);
        });

        setCategories({
          tags: ["All", ...Array.from(tagsSet)],
          localTags: ["الكل", ...Array.from(localTagsSet)], // "الكل" means "All" in Arabic
        });

        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [vendorId]);

  return { categories, loading, error };
};
