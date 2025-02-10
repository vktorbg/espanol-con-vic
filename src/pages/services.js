import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";

const services = [
  {
    title: "Conversational Lessons",
    description: "Improve your fluency and confidence with real-life conversations.",
    icon: "🗣️",
  },
  {
    title: "Grammar Focus",
    description: "Master Spanish grammar with structured lessons and exercises.",
    icon: "📖",
  },
  {
    title: "Personalized Feedback",
    description: "Get detailed progress reports and corrections tailored to your needs.",
    icon: "✍️",
  },
  {
    title: "Flexible Scheduling",
    description: "Choose a schedule that fits your lifestyle and learning pace.",
    icon: "📅",
  },
];

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-secondary min-h-screen py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary">What I Offer</h1>
          <p className="mt-4 text-gray-700">Personalized Spanish lessons tailored to your needs.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                <span className="text-5xl">{service.icon}</span>
                <div className="ml-4 text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">{service.title}</h2>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/plans">
            <button className="mt-10 bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-500 transition">
              View Plans
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
