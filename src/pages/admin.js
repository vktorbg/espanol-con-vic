import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { graphql } from 'gatsby';
import { db, doc, getDoc, collection, getDocs, updateDoc, setDoc } from "../firebase";
import { navigate } from "gatsby";
import Navbar from "../components/Navbar";

const AdminHub = () => {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState("");

  // Fields for managing student data
  const [studentPlan, setStudentPlan] = useState("");
  const [weeklySchedule, setWeeklySchedule] = useState("");
  const [nextClassDate, setNextClassDate] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [folderLink, setFolderLink] = useState("");
  const [reportsLink, setReportsLink] = useState("");

  // Fields for submitting reports
  const [reportTitle, setReportTitle] = useState("");
  const [reportText, setReportText] = useState("");
  const [vocabulary, setVocabulary] = useState("");

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
          const studentsRef = collection(db, "students");
          const studentsSnap = await getDocs(studentsRef);
          if (!studentsSnap.empty) {
            const studentsData = studentsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsData);
          }
        } else {
          navigate("/dashboard");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };
    checkAdminAndFetchStudents();
  }, [currentUser]);

  const handleUpdate = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }
    const studentRef = doc(db, "students", selectedStudent);
    try {
      let updatedFields = {};
      if (studentPlan) updatedFields.plan = studentPlan;
      if (weeklySchedule) updatedFields.weeklySchedule = weeklySchedule;
      if (nextClassDate) updatedFields.nextClass = nextClassDate;
      if (zoomLink) updatedFields.zoomLink = zoomLink;
      if (folderLink) updatedFields.folderLink = folderLink;
      if (reportsLink) updatedFields.reportsLink = reportsLink;

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(studentRef, updatedFields);
        alert("Student information updated successfully!");
      } else {
        alert("No changes made.");
      }
    } catch (error) {
      console.error("Error performing update:", error);
      alert("Error performing update. Check console for details.");
    }
  };

  const handleSubmitReport = async () => {
    if (!selectedStudent || !reportTitle || !reportText || !vocabulary) {
      alert("Please fill in all report fields.");
      return;
    }
    try {
      const reportRef = doc(collection(db, "students", selectedStudent, "reports"));
      await setDoc(reportRef, {
        title: reportTitle,
        report: reportText,
        vocabulary,
        date: new Date(),
      });
      alert("Report submitted successfully!");
      setReportTitle("");
      setReportText("");
      setVocabulary("");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report. Check console for details.");
    }
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Hub</h1>

        {/* Select Student */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Student:</label>
          <select
            className="w-full p-2 border rounded"
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
        </div>

        {/* Update Student Info */}
        <h2 className="text-lg font-semibold mt-6 mb-2">Manage Student Info</h2>
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Plan (e.g., Confidence, Fluency)" value={studentPlan} onChange={(e) => setStudentPlan(e.target.value)} />
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Weekly Schedule (e.g., Mon & Wed at 10 AM)" value={weeklySchedule} onChange={(e) => setWeeklySchedule(e.target.value)} />
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Next Class Date" value={nextClassDate} onChange={(e) => setNextClassDate(e.target.value)} />
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Zoom Link" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Folder Link" value={folderLink} onChange={(e) => setFolderLink(e.target.value)} />
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Reports Link" value={reportsLink} onChange={(e) => setReportsLink(e.target.value)} />

        <button onClick={handleUpdate} className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
          Save Update
        </button>

        {/* Submit Report */}
        <h2 className="text-lg font-semibold mt-6 mb-2">Submit Report</h2>
        <input type="text" className="w-full p-2 border rounded mb-3" placeholder="Report Title" value={reportTitle} onChange={(e) => setReportTitle(e.target.value)} />
        <textarea className="w-full p-2 border rounded mb-3" placeholder="Write report..." rows="4" value={reportText} onChange={(e) => setReportText(e.target.value)}></textarea>
        <textarea className="w-full p-2 border rounded mb-3" placeholder="Important Vocabulary..." rows="2" value={vocabulary} onChange={(e) => setVocabulary(e.target.value)}></textarea>

        <button onClick={handleSubmitReport} className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
          Submit Report
        </button>
      </div>
    </>
  );
};

export default AdminHub;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language }, ns: { eq: "translation" } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;