// src/components/ProtectedRoute.js
import React from "react";
import { navigate } from "gatsby";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    console.log("🔒 User not authenticated, redirecting to /login");
    if (typeof window !== 'undefined') {
      navigate("/login");
    }
    return null; // Prevents the page from rendering while redirecting
  }

  return children;
};

export default ProtectedRoute;
