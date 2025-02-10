import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password);
      onClose(); // Close modal after successful signup
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
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
