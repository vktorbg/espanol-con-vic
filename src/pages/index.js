import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <header className="bg-primary text-white text-center py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold">
            Aprende español con confianza y fluidez
          </h1>
          <p className="mt-4 text-lg">
            Clases personalizadas con un enfoque práctico y divertido.
          </p>
          <Link to="/plans">
            <button className="mt-6 bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
              Empieza Ahora
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default IndexPage;
