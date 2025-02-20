// src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { navigate } from "gatsby";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      console.log("🔒 User not authenticated, redirecting to /login");
      if (typeof window !== 'undefined') {
        navigate("/login");
      }
      return;
    }

    const checkRole = async () => {
      const studentRef = doc(db, "students", currentUser.uid);
      const studentSnap = await getDoc(studentRef);
      if (studentSnap.exists()) {
        const role = studentSnap.data().role || "student";
        setIsAdmin(role === "admin");
        if (adminOnly && role !== "admin") {
          navigate("/dashboard");
        }
      }
    };

    checkRole();
  }, [currentUser, adminOnly]);

  if (loading) return <p>Loading...</p>;

  return adminOnly && !isAdmin ? null : <>{children}</>;
};

export default ProtectedRoute;
