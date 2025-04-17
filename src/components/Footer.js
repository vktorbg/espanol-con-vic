import React from "react";
import { Link } from "gatsby";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-4 mt-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center text-gray-600">
        <p>© {new Date().getFullYear()} Spanish Fluency School. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/about" className="hover:underline">About Me</Link>
          <Link to="/plans" className="hover:underline">Plans</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          
          </div>
      </div>
    </footer>
  );
};

export default Footer;
