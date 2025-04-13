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
        style={{ backgroundImage: "url('/images/hero-about.webp')" }}
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
                I'm Vic —your guide to making Spanish a vibrant part of your life. With over seven years of experience teaching Spanish grammar and fluency, I've helped hundreds of students find their voice in Spanish, transforming classroom rules into real-world conversations.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                My journey with Spanish goes beyond textbooks. I’ve lived in Venezuela (my homeland), Perú, and Colombia, absorbing the rich, diverse cultures that make Spanish so dynamic. This multicultural background fuels my teaching, where every conversation is infused with authentic context and genuine passion.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                In my classes, you'll find a welcoming space for true, pressure-free practice. I believe mistakes are stepping stones and every conversation is an opportunity to grow. Whether you enjoy engaging dialogues or need clear, structured explanations, I’m here to tailor our sessions to your unique learning style.
              </p>
              <p className="text-lg text-gray-800 mb-4">
                Outside the classroom, I’m an advocate for LGBTI Human Rights and have collaborated with people from every corner of the globe. My interests in philosophy, writing, technology—and yes, even crocheting with yarn and a hook—help me discover new ways to connect with others and enrich my teaching.
              </p>
              <p className="text-lg text-gray-800">
                If you’re ready to turn Spanish into a real, lived experience, I’m here to help you every step of the way.
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
