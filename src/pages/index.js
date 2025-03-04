import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Images from the static folder
const ProfileImage = "/images/profile.png";
const HeroBackground = "/images/hero-background.jpeg";
const Service1Image = "/images/service1.jpg"; // For classes with Vic invitation
const Service2Image = "/images/service2.jpg";
const Service3Image = "/images/service3.jpg";

const plans = [
  {
    title: "Confidence",
    newPrice: 120,
    frequency: "Every month",
    description: "Boost your confidence with weekly sessions.",
    image: "/images/plan1.jpg",
  },
  {
    title: "Fluency Plan",
    newPrice: 220,
    frequency: "Every month (30% off)",
    description: "Achieve fluency with intensive sessions.",
    image: "/images/plan2.jpg",
  },
  {
    title: "Customizable Plan",
    description:
      "Experience a personalized trial class for just $1 – discover a tailored plan made just for you!",
    image: "/images/plan3.jpg",
    custom: true,
  },
];

const getDiscountedPricePerClass = (plan) => {
  const sessionsMapping = {
    Confidence: 2,
    "Fluency Plan": 4,
  };
  if (plan.newPrice && sessionsMapping[plan.title]) {
    const sessionsPerMonth = sessionsMapping[plan.title] * 4;
    return (plan.newPrice / sessionsPerMonth).toFixed(2);
  }
  return "";
};

const getSessionsPerWeek = (plan) => {
  const sessionsMapping = {
    Confidence: 2,
    "Fluency Plan": 4,
  };
  return sessionsMapping[plan.title]
    ? `${sessionsMapping[plan.title]} sessions per week`
    : plan.custom
    ? "Flexible scheduling"
    : "";
};

const auraVariants = {
  idle: {
    boxShadow: [
      "0 0 0 0 rgba(217,119,6,0.6)",
      "0 0 40px 10px rgba(217,119,6,0)",
      "0 0 0 0 rgba(217,119,6,0.6)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

const HeroSplitScreen = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HeroBackground}
          alt="Medellín Street Scene"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-24">
        {/* Left Side: Text Content */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start mb-8 md:mb-0 md:mr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-left">
            Learn Spanish with Confidence
          </h1>
          <p className="text-lg font-light mb-8 text-left">
            Personalized one-on-one lessons designed to help you reach fluency naturally.
          </p>

          {/* Buttons */}
          <div className="w-full flex justify-center space-x-4">
            <Link to="/#plans">
              <motion.button
                className="bg-primary text-white text-xl px-8 py-4 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/trialBooking">
              <motion.button
                className="bg-white text-primary border border-primary text-xl px-8 py-4 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a trial class – just for $1
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Profile Image with Aura */}
        <motion.div
          className="md:w-1/2 flex justify-center mb-8 md:mb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={ProfileImage}
            alt="Profile of Vic"
            className="w-80 h-80 object-cover rounded-full shadow-2xl"
            style={{ border: "4px solid #D97706" }} // Force orange border
            variants={auraVariants}
            animate="idle"
            whileHover="hover"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </motion.div>
      </div>
    </header>
  );
};

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <HeroSplitScreen />

      {/* Explore Our Platform Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore Our Platform</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="bg-white p-6 shadow-md border rounded-md hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={Service1Image}
                alt="Classes with Vic"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Classes with Vic</h3>
              <p className="text-gray-600">
                Join personalized one-on-one Spanish lessons with Vic to boost your confidence and achieve fluency.
              </p>
              <button
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent("Confidence")}`)
                }
                className="mt-4 bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-primary-dark transition"
              >
                View Details
              </button>
            </motion.div>
            <motion.div
              className="bg-white p-6 shadow-md border rounded-md hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={Service2Image}
                alt="Learning Hub"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Learning Hub</h3>
              <p className="text-gray-600">
                Access a wide range of resources, interactive lessons, and quizzes to boost your Spanish skills.
              </p>
              <button
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent("Fluency Plan")}`)
                }
                className="mt-4 bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-primary-dark transition"
              >
                View Details
              </button>
            </motion.div>
            <motion.div
              className="bg-white p-6 shadow-md border rounded-md hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={Service3Image}
                alt="Support Our Project"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Support Our Project</h3>
              <p className="text-gray-600">
                Be part of our journey! Your support helps us continue offering personalized Spanish lessons. Join our community by donating or becoming a supporter.
              </p>
              <button
                onClick={() => navigate("/support")}
                className="mt-4 bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-primary-dark transition"
              >
                Learn How to Help
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section as a Grid (Clickable Cards) */}
      <section id="plans" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Plans Made for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent(plan.title)}`)
                }
                className="bg-secondary border rounded-md p-4 shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <h3 className="text-xl font-semibold mb-1">{plan.title}</h3>
                {plan.newPrice ? (
                  <p className="text-primary font-bold mb-2">
                    ${plan.newPrice}/month <br />
                    <span className="text-sm">{getSessionsPerWeek(plan)}</span>
                  </p>
                ) : (
                  <p className="text-primary font-bold mb-2">Custom Pricing</p>
                )}
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <button
                  onClick={() =>
                    navigate(`/plans?plan=${encodeURIComponent(plan.title)}`)
                  }
                  className="bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-primary-dark transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default IndexPage;
