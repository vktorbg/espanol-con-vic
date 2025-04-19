// /src/pages/finalLanding.js
import React from "react";
import { navigate } from "gatsby";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FinalLanding = () => {
  const handleGoToDashboard = () => {
    // El usuario ya está autenticado, por lo que puede acceder directamente al dashboard.
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-primary mb-4">YOU'RE IN!</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Your registration and payment have been successfully processed.
          Welcome to Spanish Fluency School—check your email for details about your trial class.
        </p>
        <button
          onClick={handleGoToDashboard}
          className="bg-primary text-white px-8 py-4 rounded-md font-bold shadow-md hover:bg-primary-dark transition"
        >
          Go to Dashboard
        </button>
      </div>
      <Footer />
    </>
  );
};

export default FinalLanding;
