// /src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import { Link as GatsbyLink } from "gatsby";
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
// useLocation might not be strictly needed if all navigation is via GatsbyLink/i18next Link
// import { useLocation } from "@reach/router"; 
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
// Signup component is not used in the provided Navbar, so I'll comment out the import
// import Signup from "./Signup"; 
import SimpleLanguageToggle from './SimpleLanguageToggle';

// Heroicons (or your preferred icon library)
const Bars3Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const UserCircleIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);


const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // const [isSignupOpen, setIsSignupOpen] = useState(false); // Signup not used
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  
  const accountDropdownRef = useRef(null);
  // const languageDropdownRef = useRef(null); // Not used with SimpleLanguageToggle
  
  const { currentUser, logout } = useAuth();
  const { t, originalPath, language: currentLanguage, changeLanguage } = useI18next();

  // Placeholder for primary color - replace with your theme's color
  const primaryColor = "primary"; // e.g., 'blue-600'
  const primaryColorHover = "primary_hover"; // e.g., 'blue-700'
  const primaryTextClass = "text-primary"; // e.g., 'text-blue-600'
  const primaryBgClass = "bg-primary"; // e.g., 'bg-blue-600'
  const primaryBgHoverClass = "primary_hover"; // e.g., 'hover:bg-blue-700'

  useEffect(() => {
    if (currentUser) {
      setIsLoginOpen(false);
      // setIsSignupOpen(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
      // Language dropdown ref logic removed as SimpleLanguageToggle might handle its own state
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setAccountDropdownOpen(false); // Close dropdown first
    setIsMenuOpen(false); // Close mobile menu
    await logout();
    // Navigation to home or login page can be handled by AuthContext or here if needed
  };

  const NavLink = ({ to, children, ...props }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:${primaryTextClass} transition-colors duration-150`}
      activeClassName={`!${primaryTextClass} font-semibold`} // Active link styling
      onClick={() => setIsMenuOpen(false)} // Close mobile menu on link click
      {...props}
    >
      {children}
    </Link>
  );

  const DropdownLink = ({ to, children, ...props }) => (
    <GatsbyLink
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
      onClick={() => {
        setAccountDropdownOpen(false);
        setIsMenuOpen(false);
      }}
      {...props}
    >
      {children}
    </GatsbyLink>
  );

  const DropdownButton = ({ onClick, children, ...props }) => (
     <button
      onClick={() => {
        onClick(); // Original onClick (e.g., handleLogout)
        setAccountDropdownOpen(false); // Always close desktop dropdown
        setIsMenuOpen(false); // Always close mobile menu
      }}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      {...props}
    >
      {children}
    </button>
  );


  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Link */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <img
                  src="/images/logo-libro.png" // Ensure this path is correct
                  alt={t('navbar.brandAlt', 'School Logo')}
                  className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                />
                <span className={`text-xl font-bold ${primaryTextClass} hidden sm:block`}>
                  {t('navbar.brandName', 'Spanish Fluency School')}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:ml-6 md:space-x-1 lg:space-x-4">
              <NavLink to="/plans">{t('navbar.plans', 'Plans')}</NavLink>
              <NavLink to="/services">{t('navbar.services', 'Services')}</NavLink>
              <NavLink to="/about">{t('navbar.about', 'About Us')}</NavLink>
            </div>

            {/* Desktop Auth Buttons & Language Selector */}
            <div className="hidden md:flex items-center space-x-4">
              {!currentUser ? (
                <button 
                  onClick={() => setIsLoginOpen(true)} 
                  className={`${primaryBgClass} text-white px-4 py-2 rounded-lg shadow-sm hover:${primaryBgHoverClass} transition-colors duration-150 text-sm font-medium`}
                >
                  {t('navbar.login', 'Log In')}
                </button>
              ) : (
                <div className="relative" ref={accountDropdownRef}>
                  <button 
                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} 
                    className={`flex items-center space-x-2 ${primaryBgClass} text-white px-4 py-2 rounded-lg shadow-sm hover:${primaryBgHoverClass} transition-colors duration-150 text-sm font-medium`}
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>{t('navbar.myAccount', 'My Account')}</span>
                  </button>
                  {accountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 py-1">
                      <DropdownLink to="/dashboard">{t('navbar.dashboard', 'Dashboard')}</DropdownLink>
                      <DropdownLink to="/account">{t('navbar.settings', 'Account Settings')}</DropdownLink>
                      {currentUser.role === "admin" && (
                        <DropdownLink to="/admin">{t('navbar.admin', 'Admin Hub')}</DropdownLink>
                      )}
                      <div className="border-t border-gray-200 my-1"></div>
                      <DropdownButton onClick={handleLogout}>{t('navbar.logout', 'Log Out')}</DropdownButton>
                    </div>
                  )}
                </div>
              )}
              <SimpleLanguageToggle />
            </div>

            {/* Mobile Menu Button and Language Selector */}
            <div className="flex items-center md:hidden space-x-3">
              <SimpleLanguageToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${primaryTextClass} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${primaryColor}`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">{t('navbar.openMenu', 'Open main menu')}</span>
                {isMenuOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute w-full bg-white shadow-lg top-16 left-0 z-30 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          id="mobile-menu"
        >
          <div className="flex flex-col px-4 pt-4 pb-6 space-y-3">
            <NavLink to="/plans">{t('navbar.plans', 'Plans')}</NavLink>
            <NavLink to="/services">{t('navbar.services', 'Services')}</NavLink>
            <NavLink to="/about">{t('navbar.about', 'About Us')}</NavLink>

            <div className="border-t border-gray-200 my-2"></div>

            {!currentUser ? (
              <button 
                onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} 
                className={`block w-full text-left ${primaryBgClass} text-white px-4 py-2 rounded-md shadow-sm hover:${primaryBgHoverClass} transition-colors duration-150 font-medium`}
              >
                {t('navbar.login', 'Log In')}
              </button>
            ) : (
              <>
                <NavLink to="/dashboard">{t('navbar.dashboard', 'Dashboard')}</NavLink>
                <NavLink to="/account">{t('navbar.settings', 'Account Settings')}</NavLink>
                {currentUser.role === "admin" && (
                  <NavLink to="/admin">{t('navbar.admin', 'Admin Hub')}</NavLink>
                )}
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                >
                  {t('navbar.logout', 'Log Out')}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

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