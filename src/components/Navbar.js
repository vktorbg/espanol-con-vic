// /src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, navigate } from "gatsby";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import { GrLanguage } from "react-icons/gr";
import { setCurrentLanguage as setLanguageInStorage, getTextFromLabel, getCurrentLanguage } from "../utils/LanguageUtils";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const languageDropdownRef = useRef();

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  }, [currentUser]);

  // Close dropdown when clicking outside
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = (lang) => {
    setCurrentLanguage(lang); // Update local state
    setLanguageInStorage(lang); // Update in localStorage
    setLanguageDropdownOpen(false);
    
    // Reload the page to apply language change
    window.location.reload();
  };

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
            {getTextFromLabel('navLearningHub')}
          </Link>
          <Link to="/plans" className="text-gray-700 hover:text-orange-500 transition">
            {getTextFromLabel('navPlans')}
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-orange-500 transition">
            {getTextFromLabel('navServices')}
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-500 transition">
            {getTextFromLabel('navAboutMe')}
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
                {getTextFromLabel('navLogin')}
              </button>
              <button 
                onClick={() => setIsSignupOpen(true)}
                className="border border-primary text-primary px-5 py-2 rounded-md shadow-sm hover:bg-orange-50 transition font-semibold"
              >
                {getTextFromLabel('navSignUp')}
              </button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold"
              >
                {getTextFromLabel('navMyAccount')}
              </button>
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link 
                    to="/dashboard"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {getTextFromLabel('navDashboard')}
                  </Link>
                  <Link 
                    to="/account"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {getTextFromLabel('navAccountSettings')}
                  </Link>
                  {currentUser.role === "admin" && (
                    <Link 
                      to="/admin"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {getTextFromLabel('navAdmin')}
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await logout();
                      setAccountDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {getTextFromLabel('navLogout')}
                  </button>
                </div>
              )}
            </div>
          )}
         {/* Language Selector */}
        <div className="relative" ref={languageDropdownRef}>
        <button
          onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
          className={`border border-primary transition font-semibold flex items-center space-x-2 px-3 py-2 rounded-md shadow-sm ${
            languageDropdownOpen 
              ? "bg-primary text-white" 
              : "text-primary hover:bg-primary hover:text-white"
          }`}
          aria-label="Change language"
        >
          {/* We'll wrap the icon in a div to better control its styling */}
          <div className="flex items-center">
            <GrLanguage 
              className={`w-5 h-5 ${
                languageDropdownOpen
                  ? "filter brightness-0 invert" 
                  : "group-hover:filter group-hover:brightness-0 group-hover:invert"
              }`}
              style={{
                filter: languageDropdownOpen || document.activeElement === languageDropdownRef.current 
                  ? 'brightness(0) invert(1)' 
                  : 'none'
              }}
            />
          </div>
          
          {/* Language indicator text */}
          <span className="text-sm font-medium">
            {currentLanguage === "en" ? "EN" : "ES"}
          </span>
        </button>
          
          {languageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-md shadow-lg z-20">
              <button
                onClick={() => toggleLanguage("en")}
                className={`block w-full text-left px-4 py-2 ${
                  currentLanguage === "en" 
                    ? "text-primary font-semibold bg-orange-50" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => toggleLanguage("es")}
                className={`block w-full text-left px-4 py-2 ${
                  currentLanguage === "es" 
                    ? "text-primary font-semibold bg-orange-50" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Español
              </button>
            </div>
          )}
        </div>
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
            {getTextFromLabel('navLearningHub')}
          </Link>
          <Link to="/plans" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            {getTextFromLabel('navPlans')}
          </Link>
          <Link to="/services" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            {getTextFromLabel('navServices')}
          </Link>
          <Link to="/about" className="block text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
            {getTextFromLabel('navAboutMe')}
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
                {getTextFromLabel('navLogin')}
              </button>
              <button 
                onClick={() => {
                  setIsSignupOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left border border-primary text-primary px-5 py-2 rounded-md shadow-sm hover:bg-orange-50 transition font-semibold"
              >
                {getTextFromLabel('navSignUp')}
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/dashboard"
                className="block text-gray-700 hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {getTextFromLabel('navDashboard')}
              </Link>
              <Link 
                to="/account"
                className="block text-gray-700 hover:text-orange-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {getTextFromLabel('navAccountSettings')}
              </Link>
              {currentUser.role === "admin" && (
                <Link 
                  to="/admin"
                  className="block text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getTextFromLabel('navAdmin')}
                </Link>
              )}
              <button
                onClick={async () => {
                  await logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-red-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-red-600 transition font-semibold"
              >
                {getTextFromLabel('navLogout')}
              </button>
            </>
          )}
          
          {/* Mobile Language Selector */}
          <div className="mt-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">{currentLanguage === "en" ? "Language" : "Idioma"}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleLanguage("en")}
                  className={`px-3 py-1 rounded-md transition ${
                    currentLanguage === "en"
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-700 hover:border-primary"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => toggleLanguage("es")}
                  className={`px-3 py-1 rounded-md transition ${
                    currentLanguage === "es"
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-700 hover:border-primary"
                  }`}
                >
                  ES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <Signup onClose={() => setIsSignupOpen(false)} />}
    </nav>
  );
};

export default Navbar;
