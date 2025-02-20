import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, doc, getDoc, setDoc, collection, getDocs, updateDoc } from "../firebase";
import { navigate } from "gatsby";

const AdminPage = () => {
  const { currentUser, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [title, setTitle] = useState("");
  const [report, setReport] = useState("");
  const [vocabulary, setVocabulary] = useState("");
  const [saving, setSaving] = useState(false); // Estado de carga

  useEffect(() => {
    const checkAdminAndFetchStudents = async () => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "students", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
          console.log("✅ User is admin");

          // Fetch all students
          const studentsRef = collection(db, "students");
          const studentsSnap = await getDocs(studentsRef);

          if (!studentsSnap.empty) {
            setStudents(studentsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            console.log(`✅ Loaded ${studentsSnap.docs.length} students`);
          } else {
            console.log("⚠ No students found");
          }
        } else {
          console.log("❌ User is not an admin");
          navigate("/dashboard");
        }

        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching students:", error);
        setLoading(false);
      }
    };

    checkAdminAndFetchStudents();
  }, [currentUser]);

  const upgradeToVIP = async (studentId) => {
    try {
      const studentRef = doc(db, "students", studentId);
      await updateDoc(studentRef, { membership: "VIP" });
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId ? { ...s, membership: "VIP" } : s
        )
      );
    } catch (error) {
      console.error("Error upgrading student:", error);
    }
  };

  const handleSaveReport = async () => {
    if (!selectedStudent || !title || !report || !vocabulary) {
      alert("Please fill in all fields.");
      return;
    }

    setSaving(true); // Mostrar estado de carga

    const reportData = {
      title,
      report,
      vocabulary,
      date: new Date().toISOString().split("T")[0], // Formato YYYY-MM-DD
    };

    try {
      const studentRef = doc(db, "students", selectedStudent);
      const reportRef = doc(studentRef, "reports", reportData.date.slice(0, 7)); // YYYY-MM

      await setDoc(reportRef, reportData);

      alert("✅ Report saved successfully!");
      setTitle("");
      setReport("");
      setVocabulary("");
    } catch (error) {
      console.error("❌ Error saving report:", error);
      alert("Error saving report. Check console for details.");
    }

    setSaving(false); // Ocultar estado de carga
  };

  if (!isAdmin) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading students...</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Membership</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="text-center">
                  <td className="border p-2">{student.firstName} {student.lastName}</td>
                  <td className="border p-2">{student.email}</td>
                  <td className="border p-2">{student.membership}</td>
                  <td className="border p-2">
                    {student.membership !== "VIP" ? (
                      <button
                        onClick={() => upgradeToVIP(student.id)}
                        className="bg-primary text-white px-4 py-1 rounded-md hover:bg-orange-600 transition"
                      >
                        Upgrade to VIP
                      </button>
                    ) : (
                      <span className="text-green-500 font-bold">VIP</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Monthly Report</h2>

            <label className="block font-medium" htmlFor="student-select">Select Student:</label>
            <select
              id="student-select"
              className="w-full p-2 border rounded mb-3"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">-- Choose a student --</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>

            <label className="block font-medium" htmlFor="report-title">Report Title:</label>
            <input
              id="report-title"
              className="w-full p-2 border rounded mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className="block font-medium" htmlFor="progress-report">Progress Report:</label>
            <textarea
              id="progress-report"
              className="w-full p-2 border rounded mb-3"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              required
            />

            <label className="block font-medium" htmlFor="vocabulary-learned">Vocabulary Learned:</label>
            <textarea
              id="vocabulary-learned"
              className="w-full p-2 border rounded mb-3"
              value={vocabulary}
              onChange={(e) => setVocabulary(e.target.value)}
              required
            />

            <button
              className={`w-full px-4 py-2 rounded text-white ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-orange-600"
              }`}
              onClick={handleSaveReport}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Report"}
            </button>
          </div>
        </>
      )}

      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
