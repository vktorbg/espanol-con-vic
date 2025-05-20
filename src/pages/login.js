// /src/pages/login.js
import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { graphql } from 'gatsby';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // Assuming you have context for auth
import { motion } from "framer-motion"; // Added for subtle animation

// Using the Google Icon from signup.js for consistency
const GoogleIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      {/* Google G logo path */}
      <path d="M12.0001 10.0759C12.0001 9.36881 12.0616 8.67578 12.1694 8.00098H6.14844V11.7339H9.57281C9.38434 12.5819 8.91023 13.331 8.22284 13.785L8.21509 13.8579L11.3005 16.1939L11.4439 16.213C13.0012 14.8048 13.904 12.6139 13.904 10.0759V10.0759Z" fill="#4285F4"></path>
      <path d="M6.14844 18.001C7.89842 19.157 10.0227 19.794 12.0001 19.794C14.7751 19.794 17.1179 18.231 18.2399 16.213L14.9899 13.785C14.1872 14.3019 13.1577 14.647 12.0001 14.647C10.1237 14.647 8.49191 13.561 7.90884 11.901L7.8338 11.91L4.6569 14.315L4.5388 14.335C5.13217 15.5641 5.98133 16.8042 6.14844 18.001Z" fill="#34A853"></path>
      <path d="M7.90884 11.901C7.66921 11.183 7.53785 10.419 7.53785 9.634C7.53785 8.84904 7.66921 8.08504 7.90884 7.36604L7.90249 7.28404L4.71152 4.88204L4.5388 4.93404C3.85963 6.23118 3.46582 7.85718 3.46582 9.634C3.46582 11.411 3.85963 13.037 4.5388 14.334L7.90884 11.901Z" fill="#FBBC05"></path>
      <path d="M12.0001 4.47C13.4613 4.47 14.6242 4.984 15.5704 5.873L18.3103 3.281C16.4342 1.562 14.1886 0.473022 12.0001 0.473022C9.17341 0.473022 6.71882 2.011 5.53172 4.336L8.90172 7.366C9.48479 5.707 10.7407 4.47 12.0001 4.47Z" fill="#EA4335"></path>
    </svg>
  );

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuth(); // Assuming loginWithGoogle exists

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
       // If AuthProvider doesn't handle navigation, uncomment below:
       // navigate('/dashboard');
    } catch (err) {
      console.error("Login Error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
         setError("Invalid email or password. Please try again.");
      } else {
         setError("Failed to log in. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
      setError('');
      setIsLoading(true);
      try {
          await loginWithGoogle();
          // If AuthProvider doesn't handle navigation, uncomment below:
          // navigate('/dashboard');
      } catch (err) {
          console.error("Google Sign-In Error:", err);
          // Be more specific if possible (e.g., popup closed)
          setError('Failed to sign in with Google. Please ensure popups are enabled and try again.');
          setIsLoading(false);
      }
  };

  return (
    <>
      <Navbar />
      {/* Use flex-grow to push footer down */}
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl my-12 border border-gray-100" // Slightly enhanced shadow/border
        >
          <h1 className="text-3xl font-bold text-primary text-center mb-2">
            Welcome Back!
          </h1>
          <p className="text-center text-gray-500 mb-6 text-sm"> {/* Smaller subtext */}
            Log in to continue your Spanish journey.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-center text-sm" // Enhanced error styling
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200" // Slightly taller input
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="flex justify-between items-baseline mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password" // Ensure this page exists
                  className="text-xs text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded" // Smaller link
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 pr-12" // Add padding-right for button
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {/* Improved Button Positioning */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-[2.4rem] px-3 py-1 text-gray-500 hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-md text-sm" // Better position & style
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-2 font-semibold rounded-lg transition duration-300 ease-in-out flex items-center justify-center ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              }`}
            >
              {isLoading && ( // Simple spinner
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              )}
              {isLoading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {/* Divider and Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div> {/* Lighter border */}
              </div>
              <div className="relative flex justify-center text-xs"> {/* Smaller text */}
                <span className="px-2 bg-white text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login Button(s) */}
            <div className="mt-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={`w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary transition duration-200 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} // Consistent padding
              >
                <span className="sr-only">Sign in with Google</span>
                <GoogleIcon />
                <span className="ml-2">Sign in with Google</span>
              </button>
              {/* Add other social logins here if needed, perhaps side-by-side if space allows */}
            </div>
          </div>

          {/* Link to Sign Up */}
          <p className="mt-8 text-center text-xs text-gray-500"> {/* Smaller text */}
            Don't have an account?{" "}
            
            <Link to="/signup" className="font-medium text-primary hover:underline focus:outline-none focus:ring-1 focus:ring-primary rounded">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

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