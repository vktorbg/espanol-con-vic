// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// Create a context for authentication
const AuthContext = createContext({});

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Function to log in using Firebase
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // Function to log out
  const logout = () => {
    return auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Render children only after the auth state is determined */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the auth context
export const useAuth = () => useContext(AuthContext);
