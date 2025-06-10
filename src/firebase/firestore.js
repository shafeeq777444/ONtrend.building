import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';


// getAllDocuments
export async function fetchAllDocuments(collectionName) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  console.log("helo")
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}