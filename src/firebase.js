// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu-ooy3ENH-bAtQg8y1H76StkEQnomoEg",
  authDomain: "chatapp-ef2fb.firebaseapp.com",
  projectId: "chatapp-ef2fb",
  storageBucket: "chatapp-ef2fb.appspot.com",
  messagingSenderId: "341150068578",
  appId: "1:341150068578:web:f0748b0c93eb37cb7d863b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const storage = getStorage();
export const db = getFirestore()
