import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section with local hero-about image */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-about.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-24 text-center text-white">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h1>
          <motion.p
            className="mt-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover who I am and why Spanish is more than a language—it's a way of life.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Portrait Image */}
          <div>
            <motion.img
              src="/images/about-profile.png"
              alt="Vic"
              className="w-full rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
          {/* Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg text-gray-800 mb-4">
                I'm Vic, and I teach Spanish—but more than that, I guide people in making Spanish their own. Learning a language isn’t just about rules and exercises; it’s about finding your voice in a new language, thinking without translating, and feeling confident in real conversations.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                My classes are a space for authentic practice, without pressure or fear of making mistakes. I focus on fluency, understanding the nuances of Spanish, and helping you feel at ease when speaking. If you enjoy learning through interesting conversations, with clear and structured explanations when you need them, you’re in the right place.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                Beyond teaching, I’m passionate about diversity, philosophy, writing, and technology. I also crochet—yes, with yarn and a hook—and I love exploring new ways of understanding the world.
              </p>
              <p className="text-lg text-gray-800">
                If you want Spanish to be more than just a subject and become a real part of your life, I’m here to help you make that happen.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutMe;
