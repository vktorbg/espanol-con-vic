// /src/templates/PlanDetail.js
import React from "react";
import { navigate } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const PlanDetail = ({ pageContext }) => {
  const { plan } = pageContext;

  const handleSelectPlan = () => {
    // For both customizable and standard plans, we'll navigate to the booking page
    navigate(`/booking?plan=${encodeURIComponent(plan.title)}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-2xl text-center"
        >
          {plan.icon && (
            <img
              src={plan.icon}
              alt={`${plan.title} icon`}
              className="mx-auto mb-4 h-20 w-20"
            />
          )}
          <h1 className="text-4xl font-bold text-primary mb-2">
            {plan.title}
          </h1>
          {plan.newPrice && (
            <p className="text-3xl font-extrabold text-primary mb-2">
              ${plan.newPrice} <span className="text-lg font-light">
                / {plan.frequency}
              </span>
            </p>
          )}
          {!plan.custom && plan.description && (
            <p className="text-gray-700 mb-4">{plan.description}</p>
          )}

          {plan.custom ? (
            <>
              {/* Customizable Plan Content */}
              <p className="text-gray-700 mb-4">
                Discover a plan tailor-made for your unique needs! We invite you to start with a free 30‑minute consultation where we'll get to know each other, set your personal goals, and discuss the best scheduling options that fit your lifestyle.
              </p>
              <div className="mb-4 text-left max-w-lg mx-auto">
                <h3 className="text-2xl font-bold text-primary mb-1">
                  Your Customized Journey Includes:
                </h3>
                <ul className="list-disc ml-6 text-gray-700 mb-2">
                  <li>Free 30-minute consultation</li>
                  <li>Personalized lesson planning</li>
                  <li>Flexible scheduling to suit your lifestyle</li>
                  <li>Ongoing support and progress tracking</li>
                </ul>
                <p className="text-gray-700">
                  Take the first step towards a learning plan that's uniquely yours—no commitments, just a friendly conversation to set you on the right path.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelectPlan}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition"
              >
                Book Your Free 30-Minute Consultation
              </motion.button>
            </>
          ) : (
            <>
              {/* Standard Plan Content */}
              <p className="text-gray-700 mb-4">
                This plan offers a complete package designed to accelerate your Spanish learning journey. Enjoy personalized sessions, regular progress reports, and flexible scheduling tailored to your needs.
              </p>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mb-1">
                  What’s Included
                </h3>
                <p className="text-gray-700 mb-2">
                  Benefit from expertly crafted lessons that boost your confidence, plus get a monthly discount compared to individual session rates.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelectPlan}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition"
              >
                Select Plan &amp; Book Now
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default PlanDetail;
