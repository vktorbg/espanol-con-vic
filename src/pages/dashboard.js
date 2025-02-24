import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const fetchStudentData = async (userId) => {
  if (!userId) return;
  try {
    const studentRef = doc(db, "students", userId);
    const docSnapshot = await getDoc(studentRef);
    if (!docSnapshot.exists()) {
      console.log("No student data found.");
      return null;
    }
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
};

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [expandedReport, setExpandedReport] = useState(null);
  const [xp, setXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchStudentData(currentUser.uid).then((data) => {
        setStudentData(data);
        setLoading(false);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchReports = async () => {
      try {
        const reportsRef = collection(db, "students", currentUser.uid, "reports");
        const q = query(reportsRef, orderBy("date", "desc"));
        const reportsSnap = await getDocs(q);
        setReports(reportsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    fetchReports();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchXPandRecords = async () => {
      try {
        const userRef = doc(db, "students", currentUser.uid);
        const recordsSnap = await getDocs(collection(userRef, "reports"));
        const totalXP = recordsSnap.docs.length * 50;
        const unlockedBadges = [];
        const calculatedStreak = recordsSnap.docs.length;
        setXP(totalXP);
        setReports(recordsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setStreak(calculatedStreak);
        if (calculatedStreak >= 1) unlockedBadges.push("🎖️ First Report");
        if (totalXP >= 500) unlockedBadges.push("💎 500 XP");
        if (calculatedStreak >= 7) unlockedBadges.push("🔥 7-Day Streak");
        setBadges(unlockedBadges);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
    fetchXPandRecords();
  }, [currentUser]);

  // New useEffect to fetch class records and compute total hours and last update
  useEffect(() => {
    if (!currentUser) return;
    const fetchClassRecords = async () => {
      try {
        const classRecordsRef = collection(db, "students", currentUser.uid, "classRecords");
        const recordsSnap = await getDocs(classRecordsRef);
        let totalClassHours = 0;
        let latestUpdate = null;
        recordsSnap.docs.forEach((doc) => {
          const data = doc.data();
          const hours = Number(data.hours) || 0;
          totalClassHours += hours;
          const createdAt = data.createdAt.seconds ? new Date(data.createdAt.seconds * 1000) : new Date(data.createdAt);
          if (!latestUpdate || createdAt > latestUpdate) {
            latestUpdate = createdAt;
          }
        });
        setStudentData((prev) => ({ ...prev, totalHours: totalClassHours }));
        setLastUpdate(latestUpdate);
      } catch (error) {
        console.error("Error fetching class records:", error);
      }
    };
    fetchClassRecords();
  }, [currentUser]);

  const toggleReport = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  const chartData = reports.map((report, index) => ({
    name: report.title || `Report ${index + 1}`,
    xp: 50,
  }));

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
                <button className="w-full md:w-auto bg-gray-900 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 transition">
                  View Progress
                </button>
                {studentData && studentData.folderLink ? (
                  <a
                    href={studentData.folderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto bg-gray-900 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-700 transition text-center"
                  >
                    Go to Your Folder
                  </a>
                ) : (
                  <span className="w-full md:w-auto bg-gray-900 text-white px-5 py-2 rounded-lg shadow-md text-center">
                    Folder not available
                  </span>
                )}
              </div>

              {/* New Section: Class Hours, Last Update & Hours Per Week */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                  <img src="https://img.icons8.com/color/48/000000/clock.png" alt="Total Hours" />
                  <div>
                    <h2 className="text-xl font-bold text-primary">Total Class Hours</h2>
                    <p className="text-2xl font-extrabold">{studentData?.totalHours || 0} Hours</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                  <img src="https://img.icons8.com/color/48/000000/time-machine.png" alt="Last Update" />
                  <div>
                    <h2 className="text-xl font-bold text-primary">Last Update</h2>
                    <p className="text-2xl font-extrabold">
                      {lastUpdate ? new Date(lastUpdate).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                  <img src="https://img.icons8.com/color/48/000000/hourglass.png" alt="Hours Per Week" />
                  <div>
                    <h2 className="text-xl font-bold text-primary">Hours Per Week</h2>
                    <p className="text-2xl font-extrabold">
                      {studentData?.hoursPerWeek || 0} Hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Existing Monthly Reports Section */}
              <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
                <h2 className="text-xl font-semibold mb-4">Your Monthly Reports</h2>
                {reports.length > 0 ? (
                  <ul>
                    {reports.map((report) => (
                      <li key={report.id} className="p-4 border rounded mb-3">
                        <button
                          className="w-full text-left font-bold text-primary"
                          onClick={() => toggleReport(report.id)}
                        >
                          {report.title} {expandedReport === report.id ? "▼" : "▶"}
                        </button>
                        {expandedReport === report.id && (
                          <div className="mt-2">
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
                  <p>No reports available.</p>
                )}
              </div>

              {/* Existing XP and Progress Chart Section */}
              <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
                <h2 className="text-xl font-semibold">XP Progress</h2>
                <motion.div
                  className="w-full bg-gray-200 rounded-full h-6"
                  initial={{ width: 0 }}
                  animate={{ width: `${(xp % 500) / 5}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-6 bg-green-500 rounded-full flex justify-center items-center text-white">
                    {xp} XP
                  </div>
                </motion.div>
                <p className="mt-2">Streak: 🔥 {streak} days</p>
              </div>

              <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
                <h2 className="text-xl font-semibold">Badges Earned</h2>
                <div className="flex space-x-4">
                  {badges.length > 0 ? (
                    badges.map((badge, index) => (
                      <div key={index} className="p-3 bg-yellow-100 rounded-full shadow-md">
                        {badge}
                      </div>
                    ))
                  ) : (
                    <p>No badges earned yet. 🚀</p>
                  )}
                </div>
              </div>

              <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow mt-6">
                <h2 className="text-xl font-semibold">Progress Chart</h2>
                <PieChart width={400} height={300}>
                  <Pie
                    data={chartData}
                    dataKey="xp"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
