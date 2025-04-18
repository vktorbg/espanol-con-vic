// --- START OF FILE services.js ---

// /src/pages/services.js
import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar"; // Corrected path
import Footer from "../../components/Footer"; // Corrected path

// Service data focusing on benefits (Updated based on Spanish version)
const services = [
  {
    title: "Speak Spanish Confidently", // Kept title, updated description
    description: "Go beyond textbook Spanish. We focus on real conversation practice, tailored to your needs, so you chat naturally about travel, work, or whatever you're passionate about.", // Updated description
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: "Understand Grammar Intuitively", // Kept title, updated description
    description: "Forget confusing rules. We break down Spanish grammar into simple, practical steps, directly linked to how you'll actually use it in conversations.", // Updated description
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Personalized Feedback & Path", // Kept title, updated description
    description: "Receive specific, useful feedback with monthly reports. We track your progress and adjust your personalized learning plan to ensure you're always advancing effectively.", // Updated description
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
  },
  {
    title: "Flexible Learning That Fits You", // Kept title, updated description
    description: "Your life is busy. Learn at your own pace with flexible scheduling for online lessons. We adapt to your availability and learning style.", // Kept description (matches Spanish)
    icon: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// Removed reviews array as the section is removed

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      {/* Hero Section - Updated Text */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
        style={{ backgroundImage: "url('/images/hero-background.jpeg')" }} // Kept background image
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unlock your fluency with everyday Spanish conversations. {/* Updated Heading */}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our personalized approach focuses on real-world speaking skills and the cultural insights you need to connect authentically. Learn online, whenever you want. {/* Updated Paragraph */}
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
                Explore Our Plans {/* Updated Button Text */}
              </motion.button>
            </Link>
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary border border-primary px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                 Book Your $5 Trial Class {/* Updated Button Text */}
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
            {services.map((service, index) => ( // Uses updated services array
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

      {/* Testimonials Section Removed */}


      {/* Final Call to Action - Updated Text & Button Style */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Speaking Spanish?</h2> {/* Consistent Heading */}
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
             Take the first step with a personalized $5 trial class. Discover your potential and see how our approach works for you. {/* Consistent Paragraph */}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-gray-100 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your $5 Trial {/* Updated Button Text */}
              </motion.button>
            </Link>
            <Link to="/plans">
              <motion.button
                 // Reverted to original English button style for clarity/safety
                className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-white hover:text-primary transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See All Learning Plans {/* Updated Button Text */}
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
// --- END OF FILE services.js ---