import React from "react";
import { Link } from "gatsby";

const Navbar = () => {
  return (
    <nav className="bg-secondary p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-primary text-2xl font-bold">
          Español con Vic
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link to="/services" className="text-gray-700 hover:text-primary">
            Services
          </Link>
          <Link to="/plans" className="text-gray-700 hover:text-primary">
            Plans
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-primary">
            Blog
          </Link>
          <Link to="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
            Student Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
