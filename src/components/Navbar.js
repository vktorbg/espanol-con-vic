// /src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link, navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  const labels = isEnglish
    ? {
        brand: "Español con Vic",
        plans: "Plans",
        services: "Services",
        about: "About Us",
        login: "Login",
        logout: "Logout",
        dashboard: "Dashboard",
        settings: "Account Settings",
        admin: "Admin",
        myAccount: "My Account",
        switchLang: "Español",
      }
    : {
        brand: "Español con Vic",
        plans: "Planes",
        services: "Servicios",
        about: "Sobre mí",
        login: "Iniciar sesión",
        logout: "Cerrar sesión",
        dashboard: "Panel",
        settings: "Mi cuenta",
        admin: "Admin",
        myAccount: "Mi cuenta",
        switchLang: "English",
      };

  const switchUrl =
    isEnglish && location.pathname === "/en"
      ? "/"
      : isEnglish
      ? location.pathname.replace(/^\/en/, "") || "/"
      : `/en${location.pathname}`;

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setAccountDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4 relative">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <Link to={isEnglish ? "/en" : "/"} className="text-2xl font-bold text-primary">
          {labels.brand}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to={isEnglish ? "/en/plans" : "/plans"} className="text-gray-700 hover:text-orange-500 transition">{labels.plans}</Link>
          <Link to={isEnglish ? "/en/services" : "/services"} className="text-gray-700 hover:text-orange-500 transition">{labels.services}</Link>
          <Link to={isEnglish ? "/en/about" : "/about"} className="text-gray-700 hover:text-orange-500 transition">{labels.about}</Link>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          {!currentUser ? (
            <button onClick={() => setIsLoginOpen(true)} className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
              {labels.login}
            </button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
                {labels.myAccount}
              </button>
              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link to="/dashboard" onClick={() => setAccountDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{labels.dashboard}</Link>
                  <Link to="/account" onClick={() => setAccountDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{labels.settings}</Link>
                  {currentUser.role === "admin" && (
                    <Link to="/admin" onClick={() => setAccountDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{labels.admin}</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{labels.logout}</button>
                </div>
              )}
            </div>
          )}

          {/* Language Switcher Button */}
          <Link to={switchUrl} className="flex items-center space-x-2 border border-gray-300 px-3 py-1.5 rounded-md shadow-sm hover:bg-gray-100 transition">
            {isEnglish ? (
              <img src="https://img.icons8.com/color/48/spain.png" alt="Switch to Spanish" className="w-5 h-5" />
            ) : (
              <img src="https://img.icons8.com/color/48/great-britain.png" alt="Switch to English" className="w-5 h-5" />
            )}
            <span className="text-xs font-medium text-gray-600">{isEnglish ? "Español" : "English"}</span>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to={switchUrl} className="flex items-center border border-gray-300 p-1.5 rounded-md shadow-sm hover:bg-gray-100 transition">
            {isEnglish ? (
              <img src="https://img.icons8.com/color/48/spain.png" alt="Switch to Spanish" className="w-5 h-5" />
            ) : (
              <img src="https://img.icons8.com/color/48/great-britain.png" alt="Switch to English" className="w-5 h-5" />
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none p-1">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 absolute top-full left-0 right-0 bg-white shadow-lg z-10">
          <Link to={isEnglish ? "/en/plans" : "/plans"} className="block text-gray-700 hover:text-orange-500 py-1" onClick={() => setIsMenuOpen(false)}>{labels.plans}</Link>
          <Link to={isEnglish ? "/en/services" : "/services"} className="block text-gray-700 hover:text-orange-500 py-1" onClick={() => setIsMenuOpen(false)}>{labels.services}</Link>
          <Link to={isEnglish ? "/en/about" : "/about"} className="block text-gray-700 hover:text-orange-500 py-1" onClick={() => setIsMenuOpen(false)}>{labels.about}</Link>
          <hr className="my-2" />
          {!currentUser ? (
            <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} className="block w-full text-left bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
              {labels.login}
            </button>
          ) : (
            <>
              <Link to="/dashboard" className="block text-gray-700 hover:text-orange-500 py-1" onClick={() => setIsMenuOpen(false)}>{labels.dashboard}</Link>
              <Link to="/account" className="block text-gray-700 hover:text-orange-500 py-1" onClick={() => setIsMenuOpen(false)}>{labels.settings}</Link>
              {currentUser.role === "admin" && (
                <Link to="/admin" className="block text-gray-700 hover:text-orange-500 py-1" onClick={() => setIsMenuOpen(false)}>{labels.admin}</Link>
              )}
              <hr className="my-2" />
              <button onClick={handleLogout} className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition font-semibold">
                {labels.logout}
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
