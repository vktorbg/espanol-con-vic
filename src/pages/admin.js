import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, doc, getDoc, collection, getDocs, updateDoc, addDoc } from "../firebase";
import { increment } from "firebase/firestore"; // Import increment from firebase/firestore directly
import { navigate } from "gatsby";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const { currentUser, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [title, setTitle] = useState("");
  const [report, setReport] = useState("");
  const [vocabulary, setVocabulary] = useState("");
  const [saving, setSaving] = useState(false);
  const [folderEdits, setFolderEdits] = useState({}); // For inline folder link editing
  
  // New state for class record: only the number of hours (no date input)
  const [classHours, setClassHours] = useState(0);
  
  // New state for manually setting "Hours Per Week"
  const [weeklyHoursInput, setWeeklyHoursInput] = useState("");

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
            const studentsData = studentsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsData);
            // Initialize folderEdits for each student
            const initialFolderEdits = {};
            studentsData.forEach(student => {
              initialFolderEdits[student.id] = {
                editing: false,
                newValue: student.folderLink || ""
              };
            });
            setFolderEdits(initialFolderEdits);
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

  const downgradeToBasic = async (studentId) => {
    try {
      const studentRef = doc(db, "students", studentId);
      await updateDoc(studentRef, { membership: "Basic" });
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId ? { ...s, membership: "Basic" } : s
        )
      );
    } catch (error) {
      console.error("Error downgrading student:", error);
    }
  };

  const toggleFolderEdit = (studentId) => {
    setFolderEdits(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        editing: !prev[studentId].editing,
      }
    }));
  };

  const handleFolderLinkChange = (studentId, value) => {
    setFolderEdits(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        newValue: value,
      }
    }));
  };

  const updateFolderLink = async (studentId) => {
    try {
      const newFolderLink = folderEdits[studentId].newValue;
      const studentRef = doc(db, "students", studentId);
      await updateDoc(studentRef, { folderLink: newFolderLink });
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, folderLink: newFolderLink } : s));
      setFolderEdits(prev => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          editing: false,
        }
      }));
    } catch (error) {
      console.error("Error updating folder link:", error);
    }
  };

  const handleSaveReport = async () => {
    if (!selectedStudent || !title || !report || !vocabulary) {
      alert("Please fill in all fields.");
      return;
    }
    setSaving(true);
    const reportData = {
      title,
      report,
      vocabulary,
      date: new Date().toISOString().split("T")[0],
    };
    try {
      const studentRef = doc(db, "students", selectedStudent);
      const reportsCollectionRef = collection(studentRef, "reports");
      await addDoc(reportsCollectionRef, reportData);
      alert("✅ Report saved successfully!");
      setTitle("");
      setReport("");
      setVocabulary("");
    } catch (error) {
      console.error("❌ Error saving report:", error);
      alert("Error saving report. Check console for details.");
    }
    setSaving(false);
  };

  // New function to add a class record for a student (using current timestamp)
  const handleAddClassRecord = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }
    try {
      const studentRef = doc(db, "students", selectedStudent);
      const classRecordsRef = collection(studentRef, "classRecords");
      await addDoc(classRecordsRef, {
        hours: classHours,
        createdAt: new Date(),
      });
      // Update totalHours atomically using Firestore's increment
      await updateDoc(studentRef, { totalHours: increment(classHours) });
      alert("✅ Class record added successfully!");
      setClassHours(0);
    } catch (error) {
      console.error("Error adding class record:", error);
      alert("Error adding class record. Check console for details.");
    }
  };

  // New function to update "Hours Per Week" for a student
  const handleUpdateWeeklyHours = async () => {
    if (!selectedStudent || weeklyHoursInput === "") {
      alert("Please select a student and enter the hours per week.");
      return;
    }
    try {
      const studentRef = doc(db, "students", selectedStudent);
      await updateDoc(studentRef, { hoursPerWeek: Number(weeklyHoursInput) });
      alert("✅ Hours per week updated successfully!");
      setStudents(prev => prev.map(s => s.id === selectedStudent ? { ...s, hoursPerWeek: Number(weeklyHoursInput) } : s));
      setWeeklyHoursInput("");
    } catch (error) {
      console.error("Error updating hours per week:", error);
      alert("Error updating hours per week. Check console for details.");
    }
  };

  if (!isAdmin) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Membership</th>
                    <th className="border p-2">Folder Link</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="text-center">
                      <td className="border p-2">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="border p-2">{student.email}</td>
                      <td className="border p-2">{student.membership}</td>
                      <td className="border p-2">
                        {folderEdits[student.id]?.editing ? (
                          <input
                            type="text"
                            value={folderEdits[student.id].newValue}
                            onChange={(e) =>
                              handleFolderLinkChange(student.id, e.target.value)
                            }
                            className="p-1 border rounded w-full"
                          />
                        ) : (
                          student.folderLink || "Not set"
                        )}
                      </td>
                      <td className="border p-2 space-x-2">
                        {student.membership !== "VIP" ? (
                          <button
                            onClick={() => upgradeToVIP(student.id)}
                            className="bg-primary text-white px-2 py-1 rounded-md hover:bg-orange-600 transition"
                          >
                            Upgrade to VIP
                          </button>
                        ) : (
                          <button
                            onClick={() => downgradeToBasic(student.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                          >
                            Downgrade to Basic
                          </button>
                        )}
                        {folderEdits[student.id]?.editing ? (
                          <>
                            <button
                              onClick={() => updateFolderLink(student.id)}
                              className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                            >
                              Save Folder
                            </button>
                            <button
                              onClick={() => toggleFolderEdit(student.id)}
                              className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => toggleFolderEdit(student.id)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                          >
                            Edit Folder
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section for adding monthly reports */}
            <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add Monthly Report</h2>
              <label className="block font-medium" htmlFor="student-select">
                Select Student:
              </label>
              <select
                id="student-select"
                className="w-full p-2 border rounded mb-3"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">-- Choose a student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
              <label className="block font-medium" htmlFor="report-title">
                Report Title:
              </label>
              <input
                id="report-title"
                className="w-full p-2 border rounded mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label className="block font-medium" htmlFor="progress-report">
                Progress Report:
              </label>
              <textarea
                id="progress-report"
                className="w-full p-2 border rounded mb-3"
                value={report}
                onChange={(e) => setReport(e.target.value)}
                required
              />
              <label className="block font-medium" htmlFor="vocabulary-learned">
                Vocabulary Learned:
              </label>
              <textarea
                id="vocabulary-learned"
                className="w-full p-2 border rounded mb-3"
                value={vocabulary}
                onChange={(e) => setVocabulary(e.target.value)}
                required
              />
              <button
                className={`w-full px-4 py-2 rounded text-white ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-orange-600"
                }`}
                onClick={handleSaveReport}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Report"}
              </button>
            </div>

            {/* New Section: Add Class Record (no date field) */}
            <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow mt-6">
              <h2 className="text-xl font-semibold mb-4">Add Class Record</h2>
              <label className="block font-medium" htmlFor="student-select-class">
                Select Student:
              </label>
              <select
                id="student-select-class"
                className="w-full p-2 border rounded mb-3"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">-- Choose a student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
              <label className="block font-medium" htmlFor="hours">
                Hours (use negative for canceled class):
              </label>
              <input
                id="hours"
                type="number"
                className="w-full p-2 border rounded mb-3"
                placeholder="e.g., 1 or -1"
                value={classHours}
                onChange={(e) => setClassHours(Number(e.target.value))}
              />
              <button
                onClick={handleAddClassRecord}
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Add Class Record
              </button>
            </div>

            {/* New Section: Update Hours Per Week */}
            <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg shadow mt-6">
              <h2 className="text-xl font-semibold mb-4">Update Hours Per Week</h2>
              <label className="block font-medium" htmlFor="weekly-hours">
                Hours Per Week:
              </label>
              <input
                id="weekly-hours"
                type="number"
                className="w-full p-2 border rounded mb-3"
                placeholder="Enter hours per week"
                value={weeklyHoursInput}
                onChange={(e) => setWeeklyHoursInput(e.target.value)}
              />
              <button
                onClick={handleUpdateWeeklyHours}
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Update Hours Per Week
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
    </>
  );
};

export default AdminPage;
