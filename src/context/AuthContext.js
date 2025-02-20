import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "students", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentUser({ ...user, role: userData.role || "student" });
        } else {
          console.warn("User document not found in Firestore.");
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user); // Ensure state updates
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "students", user.uid), {
        firstName: firstName || "Unknown",
        lastName: lastName || "Student",
        email: user.email,
        membership: "Basic",
        createdAt: new Date(),
      });

      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "students", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "students", user.uid), {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1],
        email: user.email,
        createdAt: new Date(),
      });
    }

    setCurrentUser(user);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const upgradeToVIP = async (userId) => {
    try {
      const userRef = doc(db, "students", userId);
      await updateDoc(userRef, {
        membership: "VIP",
      });
      console.log("User upgraded to VIP");
    } catch (error) {
      console.error("Error upgrading user:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, upgradeToVIP, loginWithGoogle }}>
      {!loading ? children : <p>Loading authentication...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
