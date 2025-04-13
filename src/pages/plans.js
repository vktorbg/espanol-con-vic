// /src/pages/plans.js
import React, { useState } from "react";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Updated plans data
const allPlans = [
  {
    title: "Individual Classes",
    newPrice: "20",
    frequency: "class",
    description: "Pay-as-you-go Spanish lessons with complete flexibility.",
    features: [
      "1-hour personalized sessions",
      "Flexible scheduling",
      "No long-term commitment",
      "Tailored to your immediate needs",
    ],
  },
  {
    title: "Confidence Plan",
    newPrice: "120",
    frequency: "month",
    description: "Boost your confidence with weekly sessions.",
    features: [
      "2 classes per week (8/month)",
      "Focus on speaking and listening",
      "$15 per class (25% savings)",
      "Personalized feedback and corrections",
    ],
  },
  {
    title: "Fluency Plan",
    newPrice: "220",
    frequency: "month",
    description: "Intensive learning for rapid progress.",
    features: [
      "4 classes per week (16/month)",
      "Comprehensive curriculum",
      "$13.75 per class (45% savings)",
      "Weekly progress reports",
      "Additional practice materials",
    ],
  },
];

const PlansPage = () => {
  const location = useLocation();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1); // Default to Confidence Plan (index 1)

  // Set initial plan based on query parameter "plan"
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planQuery = params.get("plan");
    if (planQuery) {
      const idx = allPlans.findIndex(
        (plan) => plan.title.toLowerCase() === planQuery.toLowerCase()
      );
      if (idx !== -1) {
        setSelectedPlanIndex(idx);
      }
    }
  }, [location.search]);

  const handleSelectPlan = () => {
    const selectedPlan = allPlans[selectedPlanIndex];
    navigate(`/signupTrial?plan=${encodeURIComponent(selectedPlan.title)}&trial=true`);
  };

  const faqs = [
    {
      question: "What platform do you use for classes?",
      answer: "All lessons are online via Zoom.",
    },
    {
      question: "Can I meet you in person?",
      answer: "If you're in Medellín, sure! Otherwise, all classes are online.",
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

  const reviews = [
    {
      text: "Vic is an amazing teacher! In just a few weeks, I started speaking with more confidence.",
      author: "Sarah, USA",
    },
    {
      text: "The lessons are super practical and personalized. Highly recommended!",
      author: "Lucas, Germany",
    },
    {
      text: "I've tried many Spanish teachers but Vic's approach really helped me think in Spanish.",
      author: "Maria, Canada",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section
              className="relative bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-about.jpeg')" }}
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
                  Learn Spanish online from anywhere — or meet me in Medellín! All plans include customized learning strategies, conversation practice, and flexible scheduling to fit your needs.
                </motion.p>
              </div>
            </section>

      

      {/* Plans Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {allPlans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                selectedPlanIndex === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedPlanIndex(index)}
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
                      <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section Below Plans */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Ready to Start Your Spanish Journey?
          </h3>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectPlan}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition"
          >
            Book Your $5 Trial Class Now
          </motion.button>
          <p className="text-sm text-gray-500 mt-4">
            After your trial, choose any plan that fits your learning needs.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-8 px-4 text-center text-sm text-gray-500">
        <p>Payments are securely processed via PayPal. Cancellations and rescheduling require 24 hours' notice.</p>
      </section>

      {/* Keep existing How It Works, FAQ, Reviews, and Payment sections */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Book a $5 trial class.",
              "Meet your teacher and discuss your goals.",
              "Get a personalized learning plan.",
              "Choose your best-fit subscription and start practicing!",
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

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary/10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">What Students Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 italic mb-4">"{review.text}"</p>
                <p className="text-gray-600 font-semibold">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
};

export default PlansPage;