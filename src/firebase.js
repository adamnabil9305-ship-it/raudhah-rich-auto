// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSy.....",
  authDomain: "raudhah-auto-admin.firebaseapp.com",
  projectId: "raudhah-auto-admin",
  storageBucket: "raudhah-auto-admin.firebasestorage.app",
  messagingSenderId: "865030592529",
  appId: "1:865030592529:web:3b1d99d6ccc7ffcd68b9b0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);