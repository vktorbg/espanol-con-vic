// /src/pages/PlanCarousel.js
import React, { useState } from "react";
import { navigate } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import allPlans from "../data/plansData";

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

const PlanCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = allPlans.length - 1;
      if (newIndex >= allPlans.length) newIndex = 0;
      return newIndex;
    });
  };

  const handleSelectPlan = () => {
    const selectedPlan = allPlans[currentIndex];
    // Animate button click (Framer Motion handles the hover/tap effects)
    // Then navigate to booking page with plan title as a query parameter.
    navigate(`/booking?plan=${encodeURIComponent(selectedPlan.title)}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-primary mb-6">Explore Our Plans</h1>
        <div className="relative w-full max-w-2xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              {allPlans[currentIndex].icon && (
                <img
                  src={allPlans[currentIndex].icon}
                  alt={allPlans[currentIndex].title + " icon"}
                  className="mx-auto mb-4 h-20 w-20"
                />
              )}
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
              <p className="text-gray-700 mb-4">
                {allPlans[currentIndex].description}
              </p>
              {allPlans[currentIndex].features && (
                <ul className="text-gray-600 mb-6 space-y-2">
                  {allPlans[currentIndex].features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      ✅ {feature}
                    </li>
                  ))}
                </ul>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSelectPlan}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary-dark transition"
              >
                Select Plan &amp; Book Now
              </motion.button>
            </motion.div>
          </AnimatePresence>
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button
              onClick={() => paginate(-1)}
              className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition"
            >
              Prev
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button
              onClick={() => paginate(1)}
              className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlanCarousel;
