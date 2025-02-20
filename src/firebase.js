// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID
};

// Ensure Firebase initializes only once and only in the browser
let app;
let auth;
let db;

if (typeof window !== "undefined") {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

const googleProvider = app ? new GoogleAuthProvider() : null;

export { app, auth, db, googleProvider, signInWithEmailAndPassword, signOut, signInWithPopup, doc, getDoc, setDoc, collection, getDocs, updateDoc, addDoc };
