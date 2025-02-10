import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";

const plans = [
  {
    title: "Trial Lesson",
    price: "$10",
    description: "A single session to assess your level and learning goals.",
    features: ["25-minute session", "Personalized assessment", "No commitment"],
  },
  {
    title: "2 Lessons per Week",
    price: "$75/month",
    description: "Steady improvement with two lessons every week.",
    features: ["50-minute sessions", "Grammar and conversation", "Homework included"],
  },
  {
    title: "4 Lessons per Week",
    price: "$140/month",
    description: "Intensive learning with four lessons per week.",
    features: ["50-minute sessions", "Faster progress", "Personalized exercises"],
  },
];

const PlansPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-secondary min-h-screen py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-primary">Choose Your Plan</h1>
          <p className="mt-4 text-gray-700">Find the best plan that fits your learning style.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800">{plan.title}</h2>
                <p className="text-lg text-primary font-bold mt-2">{plan.price}</p>
                <p className="text-gray-600 mt-4">{plan.description}</p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center justify-center">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-500 transition">
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-gray-600">
            Need a custom plan? <Link to="/contact" className="text-primary font-bold">Contact me</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PlansPage;
