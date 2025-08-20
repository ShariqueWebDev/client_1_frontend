// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBAci6Vi54FmP7ig7-XpxkX3BCjN28aZtk",
  authDomain: "ev-refily.firebaseapp.com",
  projectId: "ev-refily",
  storageBucket: "ev-refily.appspot.com",
  messagingSenderId: "93304171544",
  appId: "1:93304171544:web:4a2aa564bbf613554d276d",
  measurementId: "G-HPN3SXLT1Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
