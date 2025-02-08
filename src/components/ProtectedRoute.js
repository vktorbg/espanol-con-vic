// src/components/ProtectedRoute.js
import React from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    if (typeof window !== 'undefined') {
      navigate('/login');
    }
    return null;
  }

  return children;
};

export default ProtectedRoute;
