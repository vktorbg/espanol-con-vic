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
      console.log(firebaseUser ? '🔥 Usuario autenticado' : '❌ No autenticado');
    });

    return () => unsubscribe();
  }, []);

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
    <AuthContext.Provider value={{ user, saveProgress }}>
      {!loading ? children : <p>Loading authentication...</p>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('❌ useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
