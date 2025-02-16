import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

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
      await signup(email, password, `${firstName} ${lastName}`);
      alert("Account created successfully!");
      onClose(); // Close modal after successful signup
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
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
          <img src="/google-icon.png" alt="Google Icon" className="h-5 w-5 mr-2" />
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
