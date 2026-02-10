import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Replace with your actual Firebase project configuration
// You can find this in the Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: "AIzaSyD-YOUR-API-KEY-HERE",
  authDomain: "voltride-app.firebaseapp.com",
  projectId: "voltride-app",
  storageBucket: "voltride-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Mock function to simulate "connecting" to Firebase since we don't have real creds in mockup
export const isFirebaseReady = () => {
  return !!app;
};
