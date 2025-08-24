import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";



const useBannersGallery = (vendorID) => {
    console.log(vendorID,"vendorID")
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorID) {
      setBanners([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "banners"),
      where("addedBy", "==", vendorID)
    //   where("addedBy", "==", null)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // ⚡ only extract `url`
        const urls = snapshot.docs
          .map(doc => doc.data().url)
          .filter(Boolean); // removes null/undefined
        setBanners(urls);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [vendorID]);

  return { banners, loading, error };
};

export default useBannersGallery;
