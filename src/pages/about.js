// /src/pages/about.js
import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Team Data (Using info from index.js)
const team = [
  {
    name: "Victor Briceño",
    title: "Co-Founder & Fluency Specialist",
    image: "/images/profile.png",
    bio: "Multicultural fluency specialist with 7+ years transforming textbook knowledge into authentic conversations across Venezuela, Perú, and Colombia. Passionate about making Spanish a vibrant part of your life.",
    quote: "Making Spanish a vibrant part of your life",
  },
  {
    name: "Elizabeth García",
    title: "Co-Founder & Educational Advisor",
    image: "/images/profile2.jpg",
    bio: "PhD in Education with 25+ years developing language curricula and pioneering educational technologies for effective acquisition. Expert in bridging linguistic theory with practical communication.",
    quote: "Bridging linguistic theory with practical communication",
  },
];

// Values Data (Using info from index.js)
const values = [
  {
    icon: "💬",
    title: "Authentic Communication",
    desc: "Prioritizing real interactions over perfect grammar.",
  },
  {
    icon: "🌈",
    title: "Inclusive Spaces",
    desc: "LGBTQ+ affirming & culturally responsive teaching.",
  },
  {
    icon: "🔗",
    title: "Community Connection",
    desc: "Linking language learning to human rights advocacy.",
  },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section - Updated Title */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
        // Using the same background as plans.js hero for consistency
        style={{ backgroundImage: "url('/images/hero-about.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Story: The Fluency School
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Meet the passionate educators behind Español con Vic and discover our unique approach to building real Spanish fluency.
          </motion.p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 lg:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-6 text-center">
             <motion.h2
                className="text-3xl md:text-4xl font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
             >
                More Than Just Lessons, It's a Fluency Journey
             </motion.h2>
             <motion.p
                className="text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
             >
                Welcome to Español con Vic, your dedicated Fluency School. We're Victor and Elizabeth, a team united by a passion for language and a belief that true fluency comes from <span className="font-semibold text-gray-800">confident communication</span>, not just memorizing rules. We combine decades of educational expertise with real-world multicultural experience to create a learning environment where you feel empowered to speak Spanish naturally and authentically.
             </motion.p>
         </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Meet Your Guides to Fluency
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-36 h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                  />
                   <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.title}</p>
                <p className="text-gray-600 mb-4 italic">"{member.quote}"</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Our Philosophy Section - Adapted */}
       <section className="py-16 lg:py-20 bg-white">
         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
            >
                <img
                src="/images/group-talking-fluently.jpg" // Reusing image from index
                alt="Interactive Spanish learning"
                className="rounded-xl shadow-xl w-full h-auto group-hover:opacity-95 transition-opacity"
                />
                <div className="absolute -inset-3 border-2 border-primary/20 rounded-xl pointer-events-none group-hover:border-primary/40 transition-all duration-300"></div>
            </motion.div>
            <motion.div
                className="space-y-5"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Fluency Philosophy</h2>
                <p className="text-lg text-gray-700">
                    We believe fluency blossoms when you connect language to real life. Our unique methodology isn't about perfection; it's about progress and the courage to communicate.
                </p>
                <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span><span className="font-semibold">Rigorous Foundation:</span> Leveraging Elizabeth's 25+ years in linguistics and education for structured learning.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span><span className="font-semibold">Immersive Practice:</span> Incorporating Vic's real-world experience across Latin America for authentic conversation.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span><span className="font-semibold">Human-Centered Approach:</span> Creating a supportive space where mistakes are celebrated as learning opportunities.</span>
                </li>
                </ul>
            </motion.div>
         </div>
       </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Our Shared Commitment</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ scale: 1.03, shadow: 'lg' }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Vision Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-xl border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            {/* Optional decorative elements from index.js's support section */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary rounded-full opacity-10 hidden md:block"></div>
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-accent-800 rounded-full opacity-5 hidden md:block"></div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Help Our Fluency School Grow
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mb-4 md:mb-0">
                  Español con Vic is a self-funded passion project built by us, Victor and Elizabeth. Your support directly helps us enhance our resources, reach more students, and continue offering high-quality, personalized Spanish education.
                </p>
              </div>
              <Link
                to="/supportUs" // Make sure this page exists or is created
                className="whitespace-nowrap shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Support Our Vision
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage; // Renamed component for clarity