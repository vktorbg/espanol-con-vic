// /src/pages/admin.js
import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { graphql } from 'gatsby';
import { db, doc, getDoc, collection, getDocs, updateDoc } from "../firebase"; // Removed setDoc
import { navigate } from "gatsby";
import Navbar from "../components/Navbar";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialScheduleDaysConfig = () => {
  const config = {};
  DAYS_OF_WEEK.forEach(day => {
    config[day] = { isActive: false, times: [""] }; // Start with one empty time slot
  });
  return config;
};

const AdminHub = () => {
  const { currentUser } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fields for managing student data
  const [studentPlan, setStudentPlan] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [folderLink, setFolderLink] = useState("");
  const [readingExercisesLink, setReadingExercisesLink] = useState(""); // New field
  const [scheduleDaysConfig, setScheduleDaysConfig] = useState(initialScheduleDaysConfig());

  // Primary color placeholder - replace with your project's primary color
  const primaryColorClass = "blue-600";
  const primaryColorHoverClass = "blue-700";

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
            const studentsData = studentsSnap.docs
              .map((sDoc) => ({ id: sDoc.id, ...sDoc.data() }))
              .sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)); // Sort students
            setStudents(studentsData);
          }
        } else {
          navigate("/dashboard"); // Redirect non-admins
        }
      } catch (error) {
        console.error("Error during admin check or fetching students:", error);
        navigate("/"); // Fallback redirect
      } finally {
        setLoading(false);
      }
    };
    checkAdminAndFetchStudents();
  }, [currentUser]);

  const resetFormFields = useCallback(() => {
    setStudentPlan("");
    setZoomLink("");
    setFolderLink("");
    setReadingExercisesLink("");
    setScheduleDaysConfig(initialScheduleDaysConfig());
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      const fetchStudentDetails = async () => {
        setLoading(true);
        try {
          const studentRef = doc(db, "students", selectedStudent);
          const studentSnap = await getDoc(studentRef);
          if (studentSnap.exists()) {
            const data = studentSnap.data();
            setStudentPlan(data.plan || "");
            setZoomLink(data.zoomLink || "");
            setFolderLink(data.folderLink || "");
            setReadingExercisesLink(data.readingExercisesLink || "");

            const newScheduleConfig = initialScheduleDaysConfig();
            if (data.schedule && Array.isArray(data.schedule)) {
              DAYS_OF_WEEK.forEach(dayKey => {
                newScheduleConfig[dayKey].times = []; // Clear initial empty string
              });

              data.schedule.forEach(scheduleString => {
                const parts = scheduleString.split(" "); // "Monday 10:00 AM COT"
                if (parts.length >= 3) { // Day Time Period COT
                  const dayName = parts[0];
                  const timeStr = parts.slice(1, parts.length - 1).join(" "); // "10:00 AM"

                  if (DAYS_OF_WEEK.includes(dayName) && newScheduleConfig[dayName]) {
                    newScheduleConfig[dayName].isActive = true;
                    newScheduleConfig[dayName].times.push(timeStr);
                  }
                }
              });
              // Ensure active days have at least one input
              DAYS_OF_WEEK.forEach(dayKey => {
                if (newScheduleConfig[dayKey].isActive && newScheduleConfig[dayKey].times.length === 0) {
                  newScheduleConfig[dayKey].times.push("");
                } else if (!newScheduleConfig[dayKey].isActive) {
                   newScheduleConfig[dayKey].times = [""]; // Reset to one empty slot if not active
                }
              });
            }
            setScheduleDaysConfig(newScheduleConfig);
          } else {
            resetFormFields();
            alert("Student data not found.");
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
          resetFormFields();
        } finally {
          setLoading(false);
        }
      };
      fetchStudentDetails();
    } else {
      resetFormFields();
    }
  }, [selectedStudent, resetFormFields]);


  const handleDayToggle = (day) => {
    setScheduleDaysConfig(prev => {
      const newConfig = { ...prev };
      newConfig[day] = { ...newConfig[day], isActive: !newConfig[day].isActive };
      if (!newConfig[day].isActive) { // If deactivating
        newConfig[day].times = [""]; // Reset to one empty slot
      } else if (newConfig[day].isActive && newConfig[day].times.length === 0) { // If activating and no times exist
        newConfig[day].times = [""]; // Add an initial empty slot
      }
      return newConfig;
    });
  };

  const handleTimeChange = (day, timeIndex, value) => {
    setScheduleDaysConfig(prev => {
      const newConfig = { ...prev };
      const newTimes = [...newConfig[day].times];
      newTimes[timeIndex] = value;
      newConfig[day] = { ...newConfig[day], times: newTimes };
      return newConfig;
    });
  };

  const handleAddTimeSlot = (day) => {
    setScheduleDaysConfig(prev => {
      const newConfig = { ...prev };
      const newTimes = [...newConfig[day].times, ""];
      newConfig[day] = { ...newConfig[day], times: newTimes };
      return newConfig;
    });
  };

  const handleRemoveTimeSlot = (day, timeIndex) => {
    setScheduleDaysConfig(prev => {
      const newConfig = { ...prev };
      let newTimes = [...newConfig[day].times];
      newTimes.splice(timeIndex, 1);
      if (newTimes.length === 0 && newConfig[day].isActive) { // If day active and all times removed
        newTimes = [""]; // Add back one empty slot
      }
      newConfig[day] = { ...newConfig[day], times: newTimes };
      return newConfig;
    });
  };

  const handleUpdateStudentInfo = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }
    setIsUpdating(true);
    const studentRef = doc(db, "students", selectedStudent);
    try {
      const updatedFields = {};
      if (studentPlan) updatedFields.plan = studentPlan; else updatedFields.plan = "";
      if (zoomLink) updatedFields.zoomLink = zoomLink; else updatedFields.zoomLink = "";
      if (folderLink) updatedFields.folderLink = folderLink; else updatedFields.folderLink = "";
      if (readingExercisesLink) updatedFields.readingExercisesLink = readingExercisesLink; else updatedFields.readingExercisesLink = "";

      const scheduleArray = [];
      DAYS_OF_WEEK.forEach(day => {
        if (scheduleDaysConfig[day].isActive) {
          scheduleDaysConfig[day].times.forEach(time => {
            if (time.trim() !== "") {
              scheduleArray.push(`${day} ${time.trim()} COT`);
            }
          });
        }
      });
      updatedFields.schedule = scheduleArray;

      if (Object.keys(updatedFields).length > 0) {
        await updateDoc(studentRef, updatedFields);
        alert("Student information updated successfully!");
      } else {
        alert("No changes made to submit."); // Should not happen due to else clauses above
      }
    } catch (error) {
      console.error("Error updating student information:", error);
      alert("Error updating student information. Check console for details.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading && !selectedStudent) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading Admin Hub...</p></div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Admin Hub</h1>

          <div className="mb-6">
            <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Student:
            </label>
            <select
              id="student-select"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={loading && selectedStudent} // Disable while loading details
            >
              <option value="">-- Choose a student --</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName} ({student.email})
                </option>
              ))}
            </select>
          </div>

          {loading && selectedStudent && <p className="text-center text-gray-600 my-4">Loading student details...</p>}
          
          {selectedStudent && !loading && (
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateStudentInfo(); }}>
              {/* General Student Info Section */}
              <fieldset className="mb-8 border border-gray-300 p-4 rounded-md">
                <legend className="text-xl font-semibold text-gray-700 px-2 mb-4">General Information</legend>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="studentPlan" className="block text-sm font-medium text-gray-700">Plan (e.g., Confidence, Fluency)</label>
                    <input type="text" id="studentPlan" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" value={studentPlan} onChange={(e) => setStudentPlan(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="zoomLink" className="block text-sm font-medium text-gray-700">Zoom Link</label>
                    <input type="url" id="zoomLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="folderLink" className="block text-sm font-medium text-gray-700">Student's Drive Folder Link</label>
                    <input type="url" id="folderLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" value={folderLink} onChange={(e) => setFolderLink(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="readingExercisesLink" className="block text-sm font-medium text-gray-700">Reading Exercises Folder Link</label>
                    <input type="url" id="readingExercisesLink" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" value={readingExercisesLink} onChange={(e) => setReadingExercisesLink(e.target.value)} />
                  </div>
                </div>
              </fieldset>

              {/* Weekly Schedule Section */}
              <fieldset className="mb-8 border border-gray-300 p-4 rounded-md">
                <legend className="text-xl font-semibold text-gray-700 px-2 mb-1">Weekly Schedule</legend>
                <p className="text-xs text-gray-500 mb-4 ml-2">All times should be entered in Colombian Time (COT), e.g., "9:00 AM" or "14:30".</p>
                <div className="space-y-4">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className="p-3 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`schedule-${day}-active`}
                          checked={scheduleDaysConfig[day].isActive}
                          onChange={() => handleDayToggle(day)}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
                        />
                        <label htmlFor={`schedule-${day}-active`} className="font-medium text-gray-800">{day}</label>
                      </div>
                      {scheduleDaysConfig[day].isActive && (
                        <div className="pl-6 space-y-2">
                          {scheduleDaysConfig[day].times.map((time, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder="e.g., 10:00 AM"
                                value={time}
                                onChange={(e) => handleTimeChange(day, index, e.target.value)}
                                className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm text-sm"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveTimeSlot(day, index)}
                                className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                                disabled={scheduleDaysConfig[day].times.length === 1 && scheduleDaysConfig[day].times[0] === "" && index === 0} // Disable remove if it's the only empty slot
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddTimeSlot(day)}
                            className={`mt-1 px-3 py-1.5 text-xs font-medium text-white bg-${primaryColorClass} rounded-md hover:bg-${primaryColorHoverClass} transition`}
                          >
                            Add Time Slot
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>
              
              <button 
                type="submit"
                disabled={isUpdating}
                className={`w-full bg-${primaryColorClass} text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-${primaryColorHoverClass} transition duration-150 ease-in-out disabled:opacity-50`}
              >
                {isUpdating ? "Updating..." : "Update Student Info"}
              </button>
            </form>
          )}
        </div>
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