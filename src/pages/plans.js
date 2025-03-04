// /src/pages/plans.js
import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import allPlans from "../data/plansData";

// Helper: Compute discounted price per class based on plan title
const getDiscountedPricePerClass = (plan) => {
  const classesPerWeekMapping = {
    "Confidence": 2,
    "Fluency Plan": 4,
  };
  if (plan.newPrice && classesPerWeekMapping[plan.title]) {
    const classesPerMonth = classesPerWeekMapping[plan.title] * 4;
    return (plan.newPrice / classesPerMonth).toFixed(2);
  }
  return "";
};

// Carousel animation variants
const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const PlansPage = () => {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Set initial slide based on query parameter "plan"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planQuery = params.get("plan");
    if (planQuery) {
      const idx = allPlans.findIndex(
        (plan) => plan.title.toLowerCase() === planQuery.toLowerCase()
      );
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [location.search]);

  // Change active plan via preview row
  const setPlanByIndex = (idx) => {
    setDirection(idx - currentIndex);
    setCurrentIndex(idx);
  };

  // Pagination for Prev/Next buttons
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = allPlans.length - 1;
      if (newIndex >= allPlans.length) newIndex = 0;
      return newIndex;
    });
  };

  // Updated handler to navigate to the dedicated booking page per plan
  const handleSelectPlan = () => {
    const selectedPlan = allPlans[currentIndex];
    if (selectedPlan.title.toLowerCase() === "confidence") {
      navigate("/confidenceBooking");
    } else if (selectedPlan.title.toLowerCase() === "fluency plan") {
      navigate("/fluencyBooking");
    } else if (selectedPlan.custom) {
      navigate("/trialBooking");
    } else {
      navigate(`/booking?plan=${encodeURIComponent(selectedPlan.title)}`);
    }
  };

  // Helper to extract preview info (e.g., "2 hours per week") from features array
  const getPreviewInfo = (plan) => {
    if (plan.features) {
      const hourFeature = plan.features.find((f) =>
        f.toLowerCase().includes("hour")
      );
      if (hourFeature) return hourFeature;
    }
    return plan.custom ? "Flexible scheduling" : "";
  };

  return (
    <>
      <Navbar />
      <div className="h-screen overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300 p-4 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-primary mt-4 mb-4">
          Our Exclusive Plans
        </h1>
        {/* Central Carousel Card */}
        <div className="relative w-full max-w-4xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 35 },
                opacity: { duration: 0.25 },
              }}
              className="bg-gradient-to-br from-white to-blue-50 p-6 md:p-8 rounded-xl shadow-2xl text-center relative transform hover:scale-105 transition"
              style={{ height: "60vh", maxHeight: "60vh" }}
            >
              <div className="md:flex md:space-x-8 h-full">
                {/* Left Column: Basic Plan Info & CTA */}
                <div className="md:w-1/2 flex flex-col justify-between">
                  {allPlans[currentIndex].icon && (
                    <img
                      src={allPlans[currentIndex].icon}
                      alt={`${allPlans[currentIndex].title} icon`}
                      className="mx-auto mb-4 h-20 w-20"
                    />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                      {allPlans[currentIndex].title}
                    </h2>
                    {allPlans[currentIndex].newPrice && (
                      <p className="text-2xl font-extrabold text-primary mb-2">
                        ${allPlans[currentIndex].newPrice}{" "}
                        <span className="text-lg font-light">
                          / {allPlans[currentIndex].frequency}
                        </span>
                      </p>
                    )}
                    {!allPlans[currentIndex].custom &&
                      allPlans[currentIndex].newPrice && (
                        <p className="text-sm text-gray-500 mb-2">
                          <span className="line-through">$20</span> → Only $
                          {getDiscountedPricePerClass(allPlans[currentIndex])} per
                          class
                        </p>
                      )}
                    <p className="text-gray-700 mb-4 max-w-md mx-auto">
                      {allPlans[currentIndex].description}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSelectPlan}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-xl hover:bg-primary-dark transition mt-4"
                  >
                    {allPlans[currentIndex].custom
                      ? "Book a trial class – just for $1"
                      : "Select Plan & Book Now"}
                  </motion.button>
                </div>
                {/* Right Column: Extended Marketing Details */}
                <div className="md:w-1/2 mt-6 md:mt-0 text-left">
                  {allPlans[currentIndex].custom ? (
                    <>
                      <h3 className="text-2xl font-bold text-primary mb-1">
                        Try It Out!
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Book a trial class for just $1 to experience personalized
                        instruction. (Regular class price: $20 per session)
                      </p>
                      <ul className="list-disc text-gray-700 ml-6 mb-2">
                        <li>Personalized lesson planning</li>
                        <li>Flexible scheduling</li>
                        <li>Ongoing support</li>
                      </ul>
                      <p className="text-gray-700">
                        Take the first step toward a plan that’s uniquely yours!
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-primary mb-1">
                        What’s Included
                      </h3>
                      <p className="text-gray-700 mb-2">
                        Receive personalized sessions, detailed progress reports,
                        and flexible scheduling.
                      </p>
                      <ul className="list-disc text-gray-700 ml-6 mb-2">
                        {allPlans[currentIndex].features &&
                          allPlans[currentIndex].features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        <li>Exclusive discounts on supplementary classes</li>
                      </ul>
                      <p className="text-gray-700">
                        Unlock your full potential with a plan that fits your needs.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Floating Navigation Icons */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={() => paginate(-1)}
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark transition focus:outline-none shadow-md"
            >
              &#x276E;
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={() => paginate(1)}
              className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark transition focus:outline-none shadow-md"
            >
              &#x276F;
            </button>
          </div>
        </div>
        {/* Fixed Preview Row at the Bottom */}
        <div className="bg-white/90 backdrop-blur-sm p-4 mt-4 rounded-lg shadow">
          <div className="flex justify-center space-x-4">
            {allPlans.map((plan, idx) => (
              <div
                key={idx}
                onClick={() => setPlanByIndex(idx)}
                className={`cursor-pointer p-2 rounded-md shadow-md transition transform ${
                  idx === currentIndex
                    ? "bg-primary text-white scale-105"
                    : "bg-white text-primary hover:scale-105"
                }`}
                style={{ minWidth: "120px" }}
              >
                <h3 className="text-base font-bold">{plan.title}</h3>
                <p className="text-xs">
                  {getPreviewInfo(plan) || (plan.custom ? "Flexible scheduling" : "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlansPage;

// Helper function defined outside the component
const getPreviewInfo = (plan) => {
  if (plan.features) {
    const hourFeature = plan.features.find((f) =>
      f.toLowerCase().includes("hour")
    );
    if (hourFeature) return hourFeature;
  }
  return plan.custom ? "Flexible scheduling" : "";
};
