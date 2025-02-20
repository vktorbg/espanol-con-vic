import React, { useState } from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Images from the static folder
const ProfileImage = "/images/profile.png";
const HeroBackground = "/images/hero-background.jpeg";
const Service1Image = "/images/service1.jpg";
const Service2Image = "/images/service2.jpg";
const Service3Image = "/images/service3.jpg";

// Aura for profile image (as before)
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

          {/* Centered Button */}
          <div className="w-full flex justify-center">
            <Link to="/plans">
              <motion.button
                className="bg-primary text-white text-xl px-8 py-4 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
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
            style={{ border: "4px solid #D97706" }}  // Force orange border
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
      
      {/* FEATURED SECTIONS */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Explore Our Platform
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Report Section */}
            <motion.div 
              className="bg-white p-6 shadow-md border rounded-md hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img src={Service1Image} alt="Reports" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Your Progress</h3>
              <p className="text-gray-600">Track your monthly progress, see detailed reports, and celebrate your achievements.</p>
              <Link to="/dashboard" className="mt-4 inline-block text-primary font-bold hover:underline">
                View Dashboard &rarr;
              </Link>
            </motion.div>
            {/* Learning Hub Section */}
            <motion.div 
              className="bg-white p-6 shadow-md border rounded-md hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img src={Service2Image} alt="Learning Hub" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learning Hub</h3>
              <p className="text-gray-600">Access a wide range of resources, interactive lessons, and quizzes to boost your Spanish skills.</p>
              <Link to="/learning-hub" className="mt-4 inline-block text-primary font-bold hover:underline">
                Explore Hub &rarr;
              </Link>
            </motion.div>
            {/* Blog Section */}
            <motion.div 
              className="bg-white p-6 shadow-md border rounded-md hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <img src={Service3Image} alt="Blog" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">Language Tips & Culture</h3>
              <p className="text-gray-600">Stay updated with the latest language tips, cultural insights, and learning techniques.</p>
              <Link to="/blog" className="mt-4 inline-block text-primary font-bold hover:underline">
                Read Our Blog &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION with Hero Background */}
      <section
        className="py-16 text-white text-center relative"
        style={{
          backgroundImage: `url('${HeroBackground}')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            Start Your Spanish Journey Today!
          </motion.h2>
          <p className="mt-4 text-lg">Book your first lesson and take the first step towards fluency.</p>
          <Link to="/plans">
            <motion.button 
              className="mt-6 bg-white text-primary px-6 py-3 rounded-md font-semibold shadow-md hover:bg-gray-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Trial Lesson
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default IndexPage;