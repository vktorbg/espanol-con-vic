// /src/pages/services.js
import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Service data focusing on benefits
const services = [
  {
    title: "Speak Spanish Confidently",
    description: "Go beyond textbook Spanish. We focus on real-life conversation practice, tailored to your needs, so you can chat naturally about travel, work, or anything you love.",
    // Placeholder for a relevant SVG icon (e.g., conversation bubbles)
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: "Understand Grammar Intuitively",
    description: "Forget confusing rules. We break down Spanish grammar into simple, practical steps directly linked to how you'll actually use it in conversations.",
    // Placeholder for a relevant SVG icon (e.g., book or lightbulb)
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Personalized Feedback & Path",
    description: "Receive specific, actionable feedback with  monthly reports. We track your progress and adjust your personalized learning plan to ensure you're always moving forward effectively.",
     // Placeholder for a relevant SVG icon (e.g., checkmark or graph)
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
  },
  {
    title: "Flexible Learning That Fits You",
    description: "Your life is busy. Learn at your own pace with flexible scheduling for online lessons. We adapt to your availability and learning style.",
    // Placeholder for a relevant SVG icon (e.g., calendar or clock)
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// Using the same reviews from plans.js for consistency, can be updated later
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

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
        // Consider using a different relevant image, e.g., people talking, learning setting
        style={{ backgroundImage: "url('/images/hero-background.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock Confident Spanish Conversations
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our personalized approach focuses on real-world speaking skills and the cultural insights you need to connect authentically. Learn online, anytime.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/plans">
              <motion.button
                className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Plans
              </motion.button>
            </Link>
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary border border-primary px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your $5 Trial Class
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section - "Your Path to Fluency" */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Your Path to Fluency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Consistent Styling */}
      <section className="bg-primary/10 py-16 lg:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">What Our Students Achieve</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col justify-between"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <p className="text-gray-700 italic mb-4">"{review.text}"</p>
                <p className="text-gray-600 font-semibold">— {review.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action - Consistent Styling */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Speaking Spanish?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Take the first step with a personalized $5 trial class. Discover your potential and see how our approach works for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-gray-100 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Claim Your $5 Trial
              </motion.button>
            </Link>
            <Link to="/plans">
              <motion.button
                className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-white hover:text-primary transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See All Learning Plans
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;