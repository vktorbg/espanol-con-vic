import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup"; // Import Signup component

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      setIsSignupOpen(false); // Close modal when user logs in or signs up
    }
  }, [currentUser]);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">Español con Vic</Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-gray-700 hover:text-primary transition">About Me</Link>
          <Link to="/plans" className="text-gray-700 hover:text-primary transition">Plans</Link>
          <Link to="/services" className="text-gray-700 hover:text-primary transition">Services</Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary transition">Blog</Link>
        </div>

        {/* Login / Sign Up / Dashboard Buttons */}
        <div className="flex space-x-4">
          {!currentUser ? (
            <>
              <button 
                onClick={() => setIsLoginOpen(true)}
                style={{ backgroundColor: "#ff6600", color: "white" }} // Force visible colors
                className="px-5 py-2 rounded-lg shadow-md border border-orange-600 hover:bg-orange-700"
              >
                Login
              </button>
              <button 
                onClick={() => setIsSignupOpen(true)}
                className="button-signup"
              >
                Sign Up
              </button>
            </>
          ) : (
            <Link 
              to="/dashboard"
              className="px-5 py-2 text-white bg-gray-900 hover:bg-gray-700 transition-all font-semibold rounded-md shadow-lg border border-gray-800"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}
    </nav>
  );
};

export default Navbar;
