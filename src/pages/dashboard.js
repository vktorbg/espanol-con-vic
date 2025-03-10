// /src/pages/dashboard.js
import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchStudentData = async () => {
        try {
          const studentRef = doc(db, "students", currentUser.uid);
          const docSnap = await getDoc(studentRef);
          if (docSnap.exists()) {
            setStudentData(docSnap.data());
          } else {
            console.log("No student data found.");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching student data:", error);
          setLoading(false);
        }
      };
      fetchStudentData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchReports = async () => {
      try {
        const reportsRef = collection(db, "students", currentUser.uid, "reports");
        const q = query(reportsRef, orderBy("date", "desc"));
        const reportsSnap = await getDocs(q);
        const loadedReports = reportsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(loadedReports);
        if (loadedReports.length > 0) {
          setExpandedReport(loadedReports[0].id);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [currentUser]);

  const toggleReport = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div
        className="w-full h-80 mb-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(217,121,6,0.8), rgba(234,88,12,0.8)), url('/images/dashboard-image.png')",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white p-5 rounded-md shadow-md mb-8 text-center">
            {loading ? (
              <p className="text-gray-600">Loading user data...</p>
            ) : studentData ? (
              <>
                <h1 className="text-3xl font-extrabold text-gray-800">My Dashboard</h1>
                <p className="text-xl text-gray-700 mt-2">Hi, {studentData.firstName}!</p>
                <div className="flex flex-wrap justify-center mt-4 gap-4">
                  {studentData.folderLink && (
                    <a
                      href={studentData.folderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition"
                    >
                      📂 Go to Your Folder
                    </a>
                  )}
                  {studentData.reportsLink && (
                    <a
                      href={studentData.reportsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition"
                    >
                      📑 View Reports
                    </a>
                  )}
                  {studentData.zoomLink && (
                    <a
                      href={studentData.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition"
                    >
                      🎥 Join Zoom Class
                    </a>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-600">No student data found.</p>
            )}
          </div>

          {/* Class Details Section */}
          {studentData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-5 rounded-md shadow-md text-center">
                <span className="text-primary text-2xl">📜</span>
                <h2 className="text-lg font-semibold text-gray-800">Plan</h2>
                <p className="text-xl font-bold">{studentData.plan || "Not Set"}</p>
              </div>
              <div className="bg-white p-5 rounded-md shadow-md text-center">
                <span className="text-primary text-2xl">📅</span>
                <h2 className="text-lg font-semibold text-gray-800">Weekly Schedule</h2>
                <p className="text-xl font-bold">{studentData.schedule ? studentData.schedule.join(", ") : "Not Set"}</p>
              </div>
              <div className="bg-white p-5 rounded-md shadow-md text-center">
                <span className="text-primary text-2xl">🕒</span>
                <h2 className="text-lg font-semibold text-gray-800">Next Class</h2>
                <p className="text-xl font-bold">{studentData.nextClass || "Not Scheduled"}</p>
              </div>
            </div>
          )}

          {/* Reports Section */}
          <div className="bg-white rounded-md shadow-md p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Monthly Reports</h2>
            {reports.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {reports.map((report) => (
                  <li key={report.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-gray-700 font-medium">
                        {report.title}
                      </span>
                      <button
                        className="text-base text-primary hover:underline"
                        onClick={() => toggleReport(report.id)}
                      >
                        {expandedReport === report.id ? "Hide" : "Show"}
                      </button>
                    </div>
                    {expandedReport === report.id && (
                      <div className="mt-2 text-base text-gray-700">
                        <p>
                          <strong>Report:</strong> {report.report}
                        </p>
                        <p>
                          <strong>Vocabulary:</strong> {report.vocabulary}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base text-gray-600">No reports available.</p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
