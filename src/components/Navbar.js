import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  }, [currentUser]);

  // Optionally, you can add a useEffect to close the dropdown when clicking outside
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md py-4 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Español con Vic
        </Link>
        {/* Desktop Navigation Links */}
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
            About me
          </Link>
        </div>
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold"
              >
                My Account
              </button>
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link 
                    to="/dashboard"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  {currentUser.role === "admin" && (
                    <Link 
                      to="/admin"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await logout();
                      setAccountDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2">
          <Link to="/learning-hub" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            Learning Hub
          </Link>
          <Link to="/plans" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            Plans
          </Link>
          <Link to="/services" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            About me
          </Link>
          {!currentUser ? (
            <>
              <button 
                onClick={() => {
                  setIsLoginOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-primary transition font-semibold"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left border border-primary text-primary px-5 py-2 rounded-md shadow-sm hover:bg-orange-50 transition font-semibold"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard"
                className="block text-gray-700 hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              {currentUser.role === "admin" && (
                <Link 
                  to="/admin"
                  className="block text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={async () => {
                  await logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}
    </nav>
  );
};

export default Navbar;
