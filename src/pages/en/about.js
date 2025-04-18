// --- START OF FILE about.js ---

// /src/pages/about.js
import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar"; // Corrected path assuming components is two levels up
import Footer from "../../components/Footer"; // Corrected path assuming components is two levels up

// Team Data (Updated based on Spanish version matching index.js)
const team = [
  {
    name: "Victor Briceño",
    title: "Grammar & Fluency Specialist", // Updated title
    image: "/images/profile.png",
    bio: "Spanish and Literature teacher with a multicultural teaching approach, boasting over 7 years of practice teaching individuals from diverse countries. Passionate about making the most challenging topics fun.", // Updated bio
    quote: "Making Spanish a vibrant part of your life",
  },
  {
    name: "Elizabeth García",
    title: "Linguist & Educational Programmer", // Updated title
    image: "/images/profile2.jpg",
    bio: "PhD in Education and Master's in Linguistics applied to Spanish and English language teaching and learning, with over 25 years of experience as an educator and curriculum developer.", // Updated bio
    quote: "Bridging linguistic theory with practical communication",
  },
];

// Values Data (Consistent with Spanish version)
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
      <Helmet>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      {/* Hero Section - Title kept as it fits the 'About' context */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
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
             About Us {/* Kept concise heading */}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Meet the educators behind Español con Vic and discover our unique approach to achieving real Spanish fluency. {/* Adjusted slightly */}
          </motion.p>
        </div>
      </section>

      {/* Our Mission Section - Updated Content */}
      <section className="py-16 lg:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-6 text-center">
             <motion.h2
                className="text-3xl md:text-4xl font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
             >
                Who We Are? {/* Updated Heading */}
             </motion.h2>
             <motion.p
                className="text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
             >
                {/* Updated Paragraph */}
                We are Victor and Elizabeth, a team united by a passion for language and the belief that true fluency comes from <span className="font-semibold text-gray-800">confident communication</span>, not just memorizing rules. We combine decades of educational expertise with real-world multicultural experiences to create a learning environment where you feel empowered to speak Spanish naturally and authentically.
             </motion.p>
         </div>
      </section>

      {/* Meet the Team Section - Updated team data and added lazy loading */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Meet Your Guides to Fluency {/* Consistent Heading */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {team.map((member, index) => ( // Uses updated team array
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
                    loading="lazy" // Added lazy loading
                  />
                   <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3">{member.title}</p> {/* Uses updated title */}
                <p className="text-gray-600 mb-4 italic">"{member.quote}"</p>
                <p className="text-gray-600 text-sm">{member.bio}</p> {/* Uses updated bio */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Our Philosophy Section - Updated list item and added lazy loading */}
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
                  loading="lazy" // Added lazy loading
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
                      {/* Updated List Item */}
                      <span><span className="font-semibold">Academic Foundation:</span> We combine proven pedagogical theories with authentic conversations adapted to real cultural contexts for comprehensive and effective learning.</span>
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

      {/* Our Values Section - Corrected hover effect */}
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
                 whileHover={{ scale: 1.03, shadow: 'lg' }} // Corrected hover effect (shadow corresponds to Tailwind's shadow-lg)
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Vision Section - Updated styles and text */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-orange-500"> {/* Updated gradient */}
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-xl border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            {/* Optional decorative elements */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white rounded-full opacity-10 hidden md:block"></div> {/* Updated color */}
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white rounded-full opacity-5 hidden md:block"></div> {/* Updated color */}

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Help Our Fluency School Grow {/* Updated Heading */}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mb-4 md:mb-0">
                   {/* Updated Paragraph */}
                  Español con Vic is a passionate, self-funded project built by us, Victor and Elizabeth. Your support directly helps us enhance our resources, reach more students, and continue offering high-quality, personalized Spanish education.
                </p>
              </div>
              <Link
                to="/supportUs"
                className="whitespace-nowrap shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Support Our Vision {/* Consistent Button Text */}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;

// --- END OF FILE about.js ---