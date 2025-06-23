import { collection,getDocs } from "firebase/firestore";
import { db } from "../config";

// getAllDocuments--(based:collectionName-"[alldataFetches]")
export async function fetchAllDocuments(collectionName) {
    try {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching documents:", error);
        return [];
    }
}

