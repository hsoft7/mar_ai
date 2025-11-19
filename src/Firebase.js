// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFR7PGaG5x3h21VFffDZMIyXbmE4CFzxM",
  authDomain: "marketai-a90ad.firebaseapp.com",
  projectId: "marketai-a90ad",
  storageBucket: "marketai-a90ad.firebasestorage.app",
  messagingSenderId: "817210812574",
  appId: "1:817210812574:web:205057e38172e38f4a738f",
  measurementId: "G-QYKHZXDBK9"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth (THIS IS WHAT OTP LOGIN NEEDS)
export const auth = getAuth(app);
