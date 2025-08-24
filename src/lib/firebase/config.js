import {  getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {  getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const app = getApps().find(app => app.name === "[DEFAULT]") || initializeApp(firebaseConfig);

// getAnalytics(app);


// exports------------------------------
export const auth = getAuth(app);
// ── CORRECTED: embed cacheSizeBytes inside persistentLocalCache ──
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabSynchronization: true,
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

export const storage = getStorage(app);

// import { getApps, initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase (only once)
// export const app =
//   getApps().find((app) => app.name === "[DEFAULT]") ||
//   initializeApp(firebaseConfig);

// // --- Keep old export names ---
// // Lazy load Firebase Auth
// export async function auth() {
//   const { getAuth } = await import("firebase/auth");
//   return getAuth(app);
// }

// // Lazy load Firestore
// export async function db() {
//   const { initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } =
//     await import("firebase/firestore");

//   return initializeFirestore(app, {
//     localCache: persistentLocalCache({
//       tabSynchronization: true,
//       cacheSizeBytes: CACHE_SIZE_UNLIMITED,
//     }),
//   });
// }

// // Lazy load Storage
// export async function storage() {
//   const { getStorage } = await import("firebase/storage");
//   return getStorage(app);
// }
