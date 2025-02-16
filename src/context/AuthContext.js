import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc, setDoc } from 'firebase/firestore';
import { app, auth as firebaseAuth, db as firebaseDb } from '../firebase';

const auth = typeof window !== "undefined" && firebaseAuth ? firebaseAuth : null;
const db = typeof window !== "undefined" && firebaseDb ? firebaseDb : null;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
        console.log(user ? `🔥 User logged in: ${user.email}` : '❌ No user logged in');
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user); // Ensure state updates
      return userCredential.user;
    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      console.log("🚀 Registering user...");
      
      // ✅ 1. Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("✅ User created in Authentication:", user.uid);

      // ✅ 2. Guardar información en Firestore
      await setDoc(doc(db, "students", user.uid), {
        firstName: firstName || "Unknown",
        lastName: lastName || "Student",
        email: user.email,
        membership: "Basic",
        createdAt: new Date(),
      });

      console.log("✅ User added to Firestore:", user.uid);
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("❌ Error signing up:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  const upgradeToVIP = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        membership: "VIP",
      });
      console.log("✅ User upgraded to VIP");
    } catch (error) {
      console.error("❌ Error upgrading user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, upgradeToVIP }}>
      {!loading ? children : <p>Loading authentication...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
