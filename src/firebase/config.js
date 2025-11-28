// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD5Haiw2u2l3tUA6z9-GbGb8yINJxyF2c",
  authDomain: "client1-75e89.firebaseapp.com",
  projectId: "client1-75e89",
  storageBucket: "client1-75e89.firebasestorage.app",
  messagingSenderId: "722018817170",
  appId: "1:722018817170:web:cde63b1671d3f05281024b",
  measurementId: "G-JWSKJMYL9K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
