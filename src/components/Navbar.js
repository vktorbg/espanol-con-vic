import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  }, [currentUser]);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Español con Vic
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/learning-hub" className="text-gray-700 hover:text-orange-500 transition">
            Learning Hub
          </Link>
          <Link to="/plans" className="text-gray-700 hover:text-orange-500 transition">
            Plans
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-orange-500 transition">
            Services
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-500 transition">
            About Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex space-x-4">
          {!currentUser ? (
            <>
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-primary transition font-semibold"
              >
                Login
              </button>
              <button 
                onClick={() => setIsSignupOpen(true)}
                className="border border-primary text-primary px-5 py-2 rounded-md shadow-sm hover:bg-orange-50 transition font-semibold"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard"
                className="px-5 py-2 bg-primary text-white hover:bg-orange-600 transition font-semibold rounded-md shadow-md"
              >
                My Dashboard
              </Link>
              {currentUser.role === "admin" && (
                <Link 
                  to="/admin"
                  className="px-5 py-2 text-white bg-gray-900 hover:bg-gray-800 transition font-semibold rounded-md shadow-md"
                >
                  Admin
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
          <Link to="/learning-hub" className="block text-gray-700 hover:text-orange-500">Learning Hub</Link>
          <Link to="/plans" className="block text-gray-700 hover:text-orange-500">Plans</Link>
          <Link to="/services" className="block text-gray-700 hover:text-orange-500">Services</Link>
          <Link to="/about" className="block text-gray-700 hover:text-orange-500">About Us</Link>
        </div>
      )}

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}
    </nav>
  );
};

export default Navbar;
