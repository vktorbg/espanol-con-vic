import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, doc, setDoc } from "../firebase";

const Signup = ({ onClose }) => {
  const { signup, loginWithGoogle } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const userCredential = await signup(email, password, firstName, lastName);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "students", user.uid), {
        firstName: firstName || "Unknown",
        lastName: lastName || "Student",
        email: user.email,
        membership: "Basic",
        folderLink: "https://zoomdocs.com/your-default-folder", // or leave it empty to be updated later
        createdAt: new Date(),
      });

      alert("Account created successfully!");
      onClose(); // Close modal after successful signup
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal">
      <div className="modal-content max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
        <button onClick={onClose}>Close</button>
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <button
          onClick={loginWithGoogle}
          className="w-full mt-4 flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          <img 
            src="https://img.icons8.com/color/48/000000/google-logo.png" 
            alt="Google Icon" 
            className="mr-2 h-6 w-6"
          />
          Sign up with Google
        </button>

        <button onClick={onClose} className="block w-full text-center text-gray-500 mt-4">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Signup;
