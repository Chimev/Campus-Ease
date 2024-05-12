// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd4l-lXVoMnW7NaNhoESX_ipic8nS4k3Y",
  authDomain: "campusease-4d7fb.firebaseapp.com",
  projectId: "campusease-4d7fb",
  storageBucket: "campusease-4d7fb.appspot.com",
  messagingSenderId: "98499321065",
  appId: "1:98499321065:web:2cd248a36ebb81f4712478"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//access to the database
export const db = getFirestore();