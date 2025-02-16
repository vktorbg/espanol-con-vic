import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchStudentData = async () => {
      try {
        const studentRef = doc(db, "students", currentUser.uid);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          setStudentData(studentSnap.data());
        } else {
          console.error("Student document not found.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [currentUser]);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-4">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">
            Welcome to Your Dashboard
          </h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading user data...</p>
          ) : (
            <>
              {studentData ? (
                <div className="bg-gray-50 p-5 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {studentData.firstName} {studentData.lastName}
                  </h2>
                  <p className="text-gray-600">{studentData.email}</p>
                  <p className="text-gray-600">Membership: {studentData.membership}</p>
                </div>
              ) : (
                <p className="text-center text-gray-600">No student data found.</p>
              )}

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={logout} 
                  className="w-full md:w-auto bg-orange-500 text-black px-5 py-2 rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition"
                >
                  Logout
                </button>
                <button 
                  className="w-full md:w-auto bg-gray-900 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
                >
                  View Progress
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
