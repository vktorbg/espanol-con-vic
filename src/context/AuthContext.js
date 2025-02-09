import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      console.log(firebaseUser ? '🔥 User logged in' : '❌ No user logged in');
    });

    return () => unsubscribe();
  }, []);

  // ✅ Asegurar que login() está correctamente definido
  const login = async (email, password) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log('✅ Logged out successfully');
    } catch (error) {
      console.error('❌ Logout error:', error);
    }
  };

  // ✅ Función para guardar progreso
  const saveProgress = async (lesson) => {
    if (!user) return;
    
    try {
      await db.collection('students').doc(user.uid).collection('progress').add({
        date: new Date().toISOString(),
        topic: lesson.topic,
        feedback: lesson.feedback,
      });
      console.log('✅ Progreso guardado en Firebase');
    } catch (error) {
      console.error('❌ Error guardando progreso:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, saveProgress }}>
      {!loading ? children : <p>Loading authentication...</p>}
    </AuthContext.Provider>
  );
};

// ✅ Asegurar que useAuth() está bien definido
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('❌ useAuth must be used within an AuthProvider');
  }
  return context;
};
