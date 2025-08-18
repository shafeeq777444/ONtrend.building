import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase/config";

// subscribeAllBanners -- all banners
export function subscribeAllBanners(onSuccess, onError) {
    try {
        const colRef = collection(db, "banners");

        const unsubscribe = onSnapshot(
            colRef,
            (snapshot) => {
                const docs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                onSuccess(docs);
            },
            (err) => {
                console.error("Firestore banners error:", err);
                if (onError) onError(err);
            }
        );

        return unsubscribe;
    } catch (error) {
        console.error("Error subscribing banners:", error);
        return () => {};
    }
}

// subscribeAllOffers -- only active offers
export function subscribeAllOffers(onSuccess, onError) {
    try {
        const colRef = collection(db, "offers");

        const q = query(colRef, where("isActive", "==", true));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const docs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                onSuccess(docs);
            },
            (err) => {
                console.error("Firestore offers error:", err);
                if (onError) onError(err);
            }
        );

        return unsubscribe;
    } catch (error) {
        console.error("Error subscribing offers:", error);
        return () => {};
    }
}
