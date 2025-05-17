// /src/pages/account.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { graphql } from 'gatsby';
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";

const AccountManagementPage = () => {
  const { currentUser } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para cambio de contraseña
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pwdMessage, setPwdMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // Estados para solicitudes de suscripción
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      const fetchStudentData = async () => {
        try {
          const studentRef = doc(db, "students", currentUser.uid);
          const docSnap = await getDoc(studentRef);
          if (docSnap.exists()) {
            setStudentData(docSnap.data());
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

  // Función para actualizar la contraseña
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdMessage("");
    if (newPassword !== confirmNewPassword) {
      setPwdMessage("Passwords do not match.");
      return;
    }
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setPwdMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setPwdMessage("Error updating password: " + error.message);
    }
  };

  // Funciones para manejar solicitudes de suscripción
  const handleSubscriptionAction = (action) => {
    // Aquí podrías integrar con la API de PayPal o el mecanismo de alertas
    // Por ahora, simulamos enviando una solicitud.
    setSubscriptionMessage(`Your request to ${action} your subscription has been sent (not implemented).`);
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-6">Account & Subscription Management</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading your information...</p>
        ) : studentData ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Información del estudiante */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Your Account Information</h2>
              <p>
                <strong>Name:</strong> {studentData.firstName} {studentData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {studentData.email}
              </p>
              <p>
                <strong>City:</strong> {studentData.city}
              </p>
              <p>
                <strong>Plan:</strong> {studentData.plan}
              </p>
              {studentData.schedule && (
                <p>
                  <strong>Schedule:</strong> {Array.isArray(studentData.schedule) ? studentData.schedule.join(", ") : studentData.schedule}
                </p>
              )}
              {studentData.orderID && (
                <p>
                  <strong>Subscription ID:</strong> {studentData.orderID}
                </p>
              )}
            </div>

            {/* Sección de cambio de contraseña */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full p-2 border rounded-md"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full p-2 border rounded-md"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full p-2 border rounded-md"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
                >
                  Update Password
                </button>
                {pwdMessage && <p className="text-center text-red-500">{pwdMessage}</p>}
              </form>
            </div>

            {/* Sección de gestión de suscripción */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Manage Subscription</h2>
              {studentData.orderID ? (
                <>
                  <p>
                    Your current subscription ID is: <strong>{studentData.orderID}</strong>
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleSubscriptionAction("change")}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Change Subscription
                    </button>
                    <button
                      onClick={() => handleSubscriptionAction("pause")}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Pause Subscription
                    </button>
                    <button
                      onClick={() => handleSubscriptionAction("cancel")}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Cancel Subscription
                    </button>
                  </div>
                  {subscriptionMessage && (
                    <p className="mt-4 text-center text-gray-700">{subscriptionMessage}</p>
                  )}
                </>
              ) : (
                <p>You do not have an active subscription.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No account information found.</p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AccountManagementPage;

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