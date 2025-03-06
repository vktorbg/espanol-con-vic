// /src/pages/triallanding.js
import React from "react";
import { useLocation } from "@reach/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TrialLanding = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderID = params.get("orderID");
  const plan = params.get("plan");
  const slots = params.get("slots");
  const name = params.get("name");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            ¡Gracias{ name ? `, ${name}` : ""}!
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Tu clase trial de {plan} se ha reservado con éxito.
          </p>
          {orderID && (
            <p className="text-lg text-gray-600 mb-4">
              Order ID: <strong>{orderID}</strong>
            </p>
          )}
          {slots && (
            <p className="text-lg text-gray-600 mb-4">
              Horario seleccionado: <strong>{slots}</strong>
            </p>
          )}
          <p className="text-gray-700">
            Revisa tu correo para más instrucciones. ¡Esperamos verte en clase!
          </p>
          <a
            href="/"
            className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrialLanding;
