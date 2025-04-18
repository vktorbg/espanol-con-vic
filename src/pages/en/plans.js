// --- START OF FILE plans.js ---

// /src/pages/plans.js
import React, { useState, useEffect } from "react"; // Added useEffect
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar"; // Corrected path
import Footer from "../../components/Footer"; // Corrected path

// Updated plans data (matches structure/content of Spanish version)
const allPlans = [
  {
    title: "Individual Classes",
    newPrice: "20",
    frequency: "class",
    description: "Pay-as-you-go Spanish lessons with full adaptability.", // Updated description
    features: [
      "Personalized 1-hour sessions",
      "Flexible scheduling",
      "No long-term commitment",
      "Tailored to your immediate needs",
    ],
  },
  {
    title: "Confidence Plan",
    newPrice: "120",
    frequency: "month",
    description: "Boost your confidence with consistency.",
    features: [
      "2 classes per week (8/month)",
      "Conversational focus", // Updated feature text
      "$15 per class (25% savings)",
      "Personalized feedback and corrections",
    ],
  },
  {
    title: "Fluency Plan",
    newPrice: "220",
    frequency: "month",
    description: "Intensive practice for rapid progress.",
    features: [
      "4 classes per week (16/month)",
      "Immersive approach", // Updated feature text
      "$13.75 per class (30% savings)",
      "Monthly progress reports",
      "Personalized feedback and corrections",
    ],
  },
];

const PlansPage = () => {
  const location = useLocation();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1); // Default to Confidence Plan (index 1)

  // Set initial plan based on query parameter "plan"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planQuery = params.get("plan");
    if (planQuery) {
      const idx = allPlans.findIndex(
        (plan) => plan.title.toLowerCase() === planQuery.toLowerCase()
      );
      if (idx !== -1) {
        setSelectedPlanIndex(idx);
      }
      // Removed fallback check for original titles as this is the primary English version
    }
  }, [location.search, setSelectedPlanIndex]); // Added dependency

  const handleSelectPlan = () => {
    const selectedPlan = allPlans[selectedPlanIndex];
    navigate(`/signupTrial?plan=${encodeURIComponent(selectedPlan.title)}&trial=true`);
  };

  // Updated FAQs (removed one item)
  const faqs = [
    {
      question: "What platform do you use for classes?",
      answer: "All lessons are online via Zoom.",
    },
    {
      question: "What happens after I book a trial class?",
      answer: "You'll receive a personalized plan and can choose the best subscription to continue.",
    },
    {
      question: "Can I reschedule or cancel a class?",
      answer: "Yes! Just give 24 hours' notice.",
    },
    {
      question: "Can I get a custom plan?",
      answer: "Absolutely. We can create a learning path that matches your goals and availability.",
    },
  ];

  // Removed reviews array as the section is removed

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />

      {/* Hero Section - Updated text */}
      <section
              className="relative bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-about.jpeg')" }} // Assuming same hero image
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
                <motion.h1
                  className="text-5xl font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Our Plans
                </motion.h1>
                <motion.p
                  className="mt-4 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                   {/* Updated paragraph */}
                  Improve your Spanish from anywhere. All plans include learning strategies focused on conversational practice and flexible schedules to fit your needs.
                </motion.p>
              </div>
            </section>

      {/* Plans Grid - Added card onClick */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {allPlans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer ${ // Added cursor-pointer
                selectedPlanIndex === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedPlanIndex(index)} // Select plan on card click
            >
              <div className={`p-6 ${selectedPlanIndex === index ? "bg-primary text-white" : "bg-gray-100"}`}>
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                {plan.newPrice && (
                  <p className="text-xl font-semibold mt-2">
                    ${plan.newPrice} <span className="text-sm font-light">/{plan.frequency}</span>
                  </p>
                )}
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{plan.description}</p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Added flex-shrink-0 */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span> {/* Wrapped text in span */}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section Below Plans - Updated text and button style */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Ready to Start Speaking Fearlessly? {/* Updated Heading */}
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectPlan}
            className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition" // Adjusted hover color
          >
            Book Your $5 Trial Class Now {/* Updated Button Text */}
          </motion.button>
          <p className="text-sm text-gray-500 mt-4">
            After your trial, choose the plan that best suits your learning needs. {/* Updated Paragraph */}
          </p>
        </div>
      </section>

      {/* Payment Info Section - Updated text */}
      <section className="max-w-4xl mx-auto py-8 px-4 text-center text-sm text-gray-500">
        <p>Payments are securely processed via PayPal. Cancellations and rescheduling require 24 hours' notice.</p>
      </section>

      {/* How It Works Section - Updated steps */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[ // Updated steps
              "Book a $5 trial class.",
              "Meet your teacher and discuss your goals.",
              "Get a personalized learning plan.",
              "Choose your ideal subscription and start practicing!",
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {index + 1}
                </div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated FAQs */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => ( // Uses updated faqs array
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section Removed */}

      <Footer />
    </div>
  );
};

export default PlansPage;
// --- END OF FILE plans.js ---