import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { navigate } from "gatsby";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      localStorage.setItem("loginModalOpen", "false"); // Prevent modal from opening again
      onClose(); // Close the modal after login
    } catch (err) {
      console.error("Login Error:", err.message); // Debug error in console
      setError(err.message); // Display full Firebase error message
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      console.error("Google Sign-in Error:", err.message); // Debug error in console
      setError("Google Sign-in failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <button 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" 
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Google Sign-in Button */}
        <button 
          className="mt-4 w-full flex items-center justify-center bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
          onClick={handleGoogleLogin}
        >
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Icon" className="mr-2" />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
