// // Import the functions you need from the SDKs you need
// import { getApps, initializeApp } from "firebase/app";
// import { CACHE_SIZE_UNLIMITED, initializeFirestore, persistentLocalCache } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfigDemo = {
//   apiKey: "AIzaSyDSX0FqSQ2xLknIdDDepw_ejqQ3O6US4_g",
//   authDomain: "testlearn-7744.firebaseapp.com",
//   projectId: "testlearn-7744",
//   storageBucket: "testlearn-7744.firebasestorage.app",
//   messagingSenderId: "830920965475",
//   appId: "1:830920965475:web:71c173f8f3ddd8547be756",
//   measurementId: "G-4NB642ZLXY"
// };

// // Initialize Firebase
// export const appDemo = getApps().find(app => app.name === "demo") || initializeApp(firebaseConfigDemo, "demo");

// export const auth = getAuth(appDemo);
// // ── CORRECTED: embed cacheSizeBytes inside persistentLocalCache ──
// export const dbDemo = initializeFirestore(appDemo, {
//   localCache: persistentLocalCache({
//     tabSynchronization: true,
//     cacheSizeBytes: CACHE_SIZE_UNLIMITED,
//   }),
// });

// export const storage = getStorage(appDemo);