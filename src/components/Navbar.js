// /src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link as GatsbyLink } from "gatsby"; // Renombrar Link original
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { useLocation } from "@reach/router"; // Aún necesario para el pathname actual si se necesita
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import { GrLanguage } from "react-icons/gr";
import SimpleLanguageToggle from './SimpleLanguageToggle'; // Importar el nuevo componente

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const accountDropdownRef = useRef();
  const languageDropdownRef = useRef();
  const { currentUser, logout } = useAuth();
  const location = useLocation(); // Puede ser útil para lógica específica

  const { languages, originalPath, language, t, changeLanguage } = useI18next();
  const currentLanguageUI = language; // Usar 'language' del hook para la UI

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      setIsSignupOpen(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setLanguageDropdownOpen(false);
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
    <>
      <nav className="bg-white shadow-md py-4 relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          {/* Brand Link */}
          <Link to="/" className="flex items-center text-2xl font-bold text-primary">
            <img
              src="/images/logo-libro.png"
              alt={t('navbar.brand')}
              className="w-8 h-8 mr-2"
            />
            {t('navbar.brand')}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/plans" className="text-gray-700 hover:text-orange-500 transition">
              {t('navbar.plans')}
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-orange-500 transition">{t('navbar.services')}</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 transition">{t('navbar.about')}</Link>
          </div>

          {/* Desktop Auth Buttons & Language Selector */}
          <div className="hidden md:flex space-x-4 items-center">
            {!currentUser ? (
              <button onClick={() => setIsLoginOpen(true)} className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
                {t('navbar.login')}
              </button>
            ) : (
              <div className="relative" ref={accountDropdownRef}>
                <button onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
                  {t('navbar.myAccount')}
                </button>
                {accountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                    <GatsbyLink to="/dashboard" onClick={() => setAccountDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.dashboard')}</GatsbyLink>
                    <GatsbyLink to="/account" onClick={() => setAccountDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.settings')}</GatsbyLink>
                    {currentUser.role === "admin" && (
                      <GatsbyLink to="/admin" onClick={() => setAccountDropdownOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.admin')}</GatsbyLink>
                    )}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">{t('navbar.logout')}</button>
                  </div>
                )}
              </div>
            )}

            {/* Language Selector Dropdown (Comentado) */}
            {/*
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className={`border border-primary transition font-semibold flex items-center space-x-2 px-3 py-2 rounded-md shadow-sm group ${
                  languageDropdownOpen
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-primary hover:text-white"
                }`}
                aria-label={t('navbar.changeLanguageLabel') || "Change language"}
              >
                <GrLanguage
                  className={`w-5 h-5 transition-colors duration-200 ${
                    languageDropdownOpen
                      ? "text-white"
                      : "text-primary group-hover:text-white"
                  }`}
                />
                <span className="text-sm font-medium">
                  {currentLanguageUI === "en" ? "EN" : "ES"}
                </span>
              </button>
            </div>
            */}

            {/* Nuevo botón de cambio de idioma */}
            <SimpleLanguageToggle />
          </div>

          {/* Mobile Menu Button and Language Selector */}
          <div className="flex items-center space-x-4 md:hidden">
            <SimpleLanguageToggle />
            <button
              className="text-primary focus:outline-none flex items-center justify-center w-8 h-8"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link to="/plans" className="text-gray-700 hover:text-orange-500 transition">
                {t('navbar.plans')}
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-orange-500 transition">{t('navbar.services')}</Link>
              <Link to="/about" className="text-gray-700 hover:text-orange-500 transition">{t('navbar.about')}</Link>

              {!currentUser ? (
                <button onClick={() => setIsLoginOpen(true)} className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
                  {t('navbar.login')}
                </button>
              ) : (
                <button onClick={handleLogout} className="bg-primary text-white px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition font-semibold">
                  {t('navbar.logout')}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Render Login Modal */}
      {isLoginOpen && (
        <Login
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;