// /src/components/Login.js  <- Renamed folder to components if it's reusable
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "gatsby"; // Import Link for Forgot Password/Sign Up
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider, signInWithPopup } from "../firebase"; // Ensure these are correctly exported from firebase config

// --- Reusable Google Icon Component ---
const GoogleIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {/* Google G logo path */}
      <path d="M12.0001 10.0759C12.0001 9.36881 12.0616 8.67578 12.1694 8.00098H6.14844V11.7339H9.57281C9.38434 12.5819 8.91023 13.331 8.22284 13.785L8.21509 13.8579L11.3005 16.1939L11.4439 16.213C13.0012 14.8048 13.904 12.6139 13.904 10.0759V10.0759Z" fill="#4285F4"></path>
      <path d="M6.14844 18.001C7.89842 19.157 10.0227 19.794 12.0001 19.794C14.7751 19.794 17.1179 18.231 18.2399 16.213L14.9899 13.785C14.1872 14.3019 13.1577 14.647 12.0001 14.647C10.1237 14.647 8.49191 13.561 7.90884 11.901L7.8338 11.91L4.6569 14.315L4.5388 14.335C5.13217 15.5641 5.98133 16.8042 6.14844 18.001Z" fill="#34A853"></path>
      <path d="M7.90884 11.901C7.66921 11.183 7.53785 10.419 7.53785 9.634C7.53785 8.84904 7.66921 8.08504 7.90884 7.36604L7.90249 7.28404L4.71152 4.88204L4.5388 4.93404C3.85963 6.23118 3.46582 7.85718 3.46582 9.634C3.46582 11.411 3.85963 13.037 4.5388 14.334L7.90884 11.901Z" fill="#FBBC05"></path>
      <path d="M12.0001 4.47C13.4613 4.47 14.6242 4.984 15.5704 5.873L18.3103 3.281C16.4342 1.562 14.1886 0.473022 12.0001 0.473022C9.17341 0.473022 6.71882 2.011 5.53172 4.336L8.90172 7.366C9.48479 5.707 10.7407 4.47 12.0001 4.47Z" fill="#EA4335"></path>
    </svg>
);

// --- Close Icon Component ---
const CloseIcon = () => (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth(); // Use loginWithGoogle from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      // Optional: localStorage.setItem("loginModalOpen", "false");
      onClose(); // Close the modal after successful login
    } catch (err) {
      console.error("Login Error:", err);
      // Provide more user-friendly errors based on Firebase error codes
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
         setError("Invalid email or password.");
      } else if (err.code === 'auth/too-many-requests') {
          setError("Access temporarily disabled due to too many attempts. Please reset your password or try again later.");
      } else {
         setError("Login failed. Please try again."); // Generic error
      }
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true); // Indicate loading for Google sign-in too
    try {
      // Use the loginWithGoogle function from your context
      await loginWithGoogle();
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Google Sign-in Error:", err);
      // Handle specific Google errors if needed (e.g., popup blocked, network error)
      setError("Google Sign-in failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    // --- Modal Overlay ---
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {/* --- Modal Box --- */}
      <motion.div
        className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md relative" // Added relative positioning context
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* --- Close Button (Positioned relative to the modal box) --- */}
        <button
          type="button" // Good practice for non-submit buttons
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
          onClick={onClose}
          aria-label="Close login panel"
        >
          <CloseIcon />
        </button>

        {/* --- Modal Content --- */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
          Welcome Back!
        </h2>

        {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded text-center text-sm">
              {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="login-email" // Unique ID for label association
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-150"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
             <div className="flex justify-between items-baseline mb-1">
                 <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link // TODO: Implement password reset flow if needed
                    to="/forgot-password" // Create this page/flow later
                    onClick={onClose} // Close modal when navigating away
                    className="text-sm text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
                  >
                    Forgot Password?
                  </Link>
              </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-150"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {/* Show/Hide Button */}
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[2.4rem] text-gray-500 hover:text-gray-700 focus:outline-none text-sm p-1"
                aria-label="Toggle password visibility"
            >
                {showPassword ?
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> :
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .987-3.149 3.796-5.68 7.44-6.656M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A9.954 9.954 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 014.82-5.18m1.97-1.118A10.007 10.007 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.955 9.955 0 01-1.895 3.875M16.5 10.5L21 6" /></svg>
                }
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 font-semibold rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-orange-600"
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 mb-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-sm text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <GoogleIcon />
          <span className="ml-2">Sign in with Google</span>
        </button>

        {/* Link to Sign Up */}
         <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
                to="/signupTrial" // Or '/signup' if that's preferred
                onClick={onClose} // Close modal when navigating away
                className="font-medium text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded"
            >
              Sign Up Here
            </Link>
          </p>

      </motion.div>
    </div>
  );
};

export default Login;