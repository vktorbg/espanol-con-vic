import React from "react";
import { Link } from "gatsby";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion"; // Importamos Framer Motion para animaciones
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faBook, faClock } from '@fortawesome/free-solid-svg-icons';

const HeroImage = "/images/hero-class.PNG"; // ✅ Use a direct path
const ServiceImage1 = "/images/Services/service1.jpg";
const ServiceImage2 = "/images/Services/service2.jpg";
const ServiceImage3 = "/images/Services/service3.jpg";

const plans = [
  {
    title: "Trial Lesson",
    price: "$10",
    description: "A single session to assess your level and learning goals.",
    image: ServiceImage1,
  },
  {
    title: "2 Lessons per Week",
    price: "$75/month",
    description: "Steady improvement with two lessons every week.",
    image: ServiceImage2,
  },
  {
    title: "4 Lessons per Week",
    price: "$140/month",
    description: "Intensive learning with four lessons per week.",
    image: ServiceImage3,
  },
];

const IndexPage = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <header className="relative text-white bg-gradient-to-r from-gray-900 via-primary to-orange-500" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${HeroImage})` }}></div>
        
        <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center text-center md:text-left py-24">
          
          {/* Contenedor de texto con fondo semitransparente */}
          <motion.div 
            className="md:w-1/2 p-6 bg-black/50 rounded-lg backdrop-blur-md"
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-extrabold text-white leading-tight">
              Learn Spanish <br /> with Confidence
            </h1>
            <p className="mt-4 text-lg font-light text-gray-200">
              Personalized one-on-one lessons that help you achieve fluency naturally.
            </p>
            <Link to="/plans">
              <motion.button 
                className="mt-6 bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>

          {/* Imagen con animación */}
          <motion.div 
            className="md:w-1/2 p-6"
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <img 
              src={HeroImage} 
              alt="Online Spanish Class" 
              className="rounded-lg shadow-lg"
            />
          </motion.div>

        </div>
      </header>

      {/* BENEFITS SECTION */}
      <section className="py-16 bg-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose Español con Vic?</h2>
          <motion.div 
            className="mt-10 grid gap-6 md:grid-cols-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
              <FontAwesomeIcon icon={faComments} size="2x" className="text-primary" />
              <h3 className="text-xl font-semibold mt-4">Immersive Conversations</h3>
              <p className="text-gray-600 mt-2">Practice real-life Spanish with engaging lessons.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
              <FontAwesomeIcon icon={faBook} size="2x" className="text-primary" />
              <h3 className="text-xl font-semibold mt-4">Grammar & Structure</h3>
              <p className="text-gray-600 mt-2">Learn Spanish grammar in a clear and structured way.</p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition">
              <FontAwesomeIcon icon={faClock} size="2x" className="text-primary" />
              <h3 className="text-xl font-semibold mt-4">Flexible Scheduling</h3>
              <p className="text-gray-600 mt-2">Book lessons at a time that fits your lifestyle.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLANS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Choose Your Plan</h2>
          <p className="mt-4 text-gray-700">Find the best plan that fits your learning style.</p>
          
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={plan.image} alt={plan.title} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800">{plan.title}</h3>
                  <p className="text-lg text-primary font-bold mt-2">{plan.price}</p>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                  <Link to="/plans">
                    <motion.button 
                      className="mt-4 bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-orange-500 transition"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Select Plan
                    </motion.button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">What My Students Say</h2>
          <div className="mt-10 flex overflow-x-scroll space-x-6 p-4">
            <div className="min-w-[300px] p-6 bg-white shadow-lg rounded-lg">
              <p className="text-gray-600">"Vic is an amazing teacher! My Spanish improved so much thanks to his lessons."</p>
              <h4 className="text-primary font-bold mt-2">- John, USA</h4>
            </div>
            <div className="min-w-[300px] p-6 bg-white shadow-lg rounded-lg">
              <p className="text-gray-600">"I love how interactive and fun the lessons are!"</p>
              <h4 className="text-primary font-bold mt-2">- Sarah, UK</h4>
            </div>
            <div className="min-w-[300px] p-6 bg-white shadow-lg rounded-lg">
              <p className="text-gray-600">"Learning Spanish has never been this easy. Highly recommend!"</p>
              <h4 className="text-primary font-bold mt-2">- Emma, Canada</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-primary text-white text-center">
        <motion.h2 
          className="text-3xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          Start Your Spanish Journey Today!
        </motion.h2>
        <p className="mt-4 text-lg">Book your first lesson and begin your journey to fluency.</p>
        <Link to="/plans">
          <motion.button 
            className="mt-6 bg-white text-primary px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Trial Lesson
          </motion.button>
        </Link>
      </section>
    </>
  );
};

export default IndexPage;
