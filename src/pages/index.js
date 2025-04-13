import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Images from the static folder
const ProfileImage1 = "/images/profile.png";
const ProfileImage2 = "/images/profile2.jpg";
const HeroBackground = "/images/hero-background.jpeg";
const Student1Image = "/images/student1.jpg";
const Student2Image = "/images/student2.jpg";
const Student3Image = "/images/student3.jpg";

const plans = [
  {
    title: "Confidence",
    newPrice: 120,
    frequency: "Every month",
    description: "Boost your confidence with weekly sessions.",
    image: "/images/plan1.jpg",
  },
  {
    title: "Fluency Plan",
    newPrice: 220,
    frequency: "Every month (30% off)",
    description: "Achieve fluency with intensive sessions.",
    image: "/images/plan2.jpg",
  },
  {
    title: "Customizable Plan",
    description:
      "Experience a personalized trial class for just $5 – discover a tailored plan made just for you!",
    image: "/images/plan3.jpg",
    custom: true,
  },
];

const getDiscountedPricePerClass = (plan) => {
  const sessionsMapping = {
    Confidence: 2,
    "Fluency Plan": 4,
  };
  if (plan.newPrice && sessionsMapping[plan.title]) {
    const sessionsPerMonth = sessionsMapping[plan.title] * 4;
    return (plan.newPrice / sessionsPerMonth).toFixed(2);
  }
  return "";
};

const getSessionsPerWeek = (plan) => {
  const sessionsMapping = {
    Confidence: 2,
    "Fluency Plan": 4,
  };
  return sessionsMapping[plan.title]
    ? `${sessionsMapping[plan.title]} sessions per week`
    : plan.custom
    ? "Flexible scheduling"
    : "";
};

const HeroSplitScreen = () => {
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

  // Enhanced aura variants with smoother transitions
  const auraVariants = {
    idle: {
      boxShadow: [
        "0 0 0 0 rgba(217, 119, 6, 0.4)",
        "0 0 30px 8px rgba(217, 119, 6, 0.2)",
        "0 0 0 0 rgba(217, 119, 6, 0.4)"
      ],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut",
        repeatType: "mirror"
      }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 0 40px 15px rgba(217, 119, 6, 0.3)",
      transition: { duration: 0.5 }
    }
  };

  // Card styling for consistent appearance
  const cardStyle = "w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl border-2 border-orange-500";

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

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left Side: Text Content */}
          <motion.div
            className="lg:w-1/2 flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-left">
              Online Spanish Fluency School
            </h1>
            <p className="text-lg md:text-xl font-light mb-8 text-left max-w-lg">
              Build real speaking skills and the boldness to use them anywhere.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link to="#whylearnwithus">
                <motion.button
                  className="bg-primary text-white px-6 py-3 md:px-9 md:py-5 rounded-lg font-bold shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Fluency Journey
                </motion.button>
              </Link>
              <Link to="/signupTrial">
                <motion.button
                  className="bg-white text-primary border border-primary px-6 py-3 md:px-9 md:py-5 rounded-lg font-bold shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Your Trial Class
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Dual Image Cards */}
          <motion.div 
            className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* First Image Card */}
            <motion.div
              className="relative"
              variants={auraVariants}
              animate="idle"
              whileHover="hover"
              onMouseEnter={() => setHoveredLeft(true)}
              onMouseLeave={() => setHoveredLeft(false)}
            >
              <img
                src={ProfileImage1}  // Your first image
                alt="Spanish teacher"
                className={`${cardStyle} ${hoveredLeft ? 'brightness-110' : 'brightness-100'} transition-all`}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
                <h3 className="font-bold text-lg">Personalized Lessons</h3>
              </div>
            </motion.div>

            {/* Second Image Card */}
            <motion.div
              className="relative"
              variants={auraVariants}
              animate="idle"
              whileHover="hover"
              onMouseEnter={() => setHoveredRight(true)}
              onMouseLeave={() => setHoveredRight(false)}
            >
              <img
                src={ProfileImage2}  // Your second image
                alt="Student speaking"
                className={`${cardStyle} ${hoveredRight ? 'brightness-110' : 'brightness-100'} transition-all`}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
                <h3 className="font-bold text-lg">Real Conversations</h3>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <HeroSplitScreen />

      {/* Why Learn With Us Section */}
      <section id="whylearnwithus" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Why Learn Spanish With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Approach</h3>
              <p className="text-gray-600">Lessons tailored to your goals, interests, and learning style.</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Book classes when it works for you - mornings, evenings, or weekends.</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cultural Immersion</h3>
              <p className="text-gray-600">Learn authentic Spanish with cultural insights from South America.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex-1 flex flex-col items-center text-center p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Your Trial</h3>
              <p className="text-gray-600">Start with a $5 trial class - a sample lesson to experience our teaching style.</p>
            </motion.div>
            <div className="hidden md:block">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <motion.div 
              className="flex-1 flex flex-col items-center text-center p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Plan</h3>
              <p className="text-gray-600">Set your goals, build a personalized plan and schedule.</p>
            </motion.div>
            <div className="hidden md:block">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <motion.div 
              className="flex-1 flex flex-col items-center text-center p-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-600">Begin your journey to fluency.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section - Fluency School */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-primary mb-4">Our Fluency Philosophy</h2>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto">
        Where academic excellence meets real-world communication in a vibrant, inclusive learning environment
      </p>
    </div>

    {/* Teaching Approach */}
    <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 border-l-4 border-primary pl-4">
          How We Transform Language Learning
        </h3>
        <p className="text-lg text-gray-600">
          At our core, we believe fluency isn't about perfect grammar—it's about <span className="font-semibold text-primary">confident communication</span>. 
          Our unique methodology blends:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Academic rigor from Elizabeth's 25+ years in linguistics education</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Vic's multicultural immersion techniques from living across Latin America</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">✓</span>
            <span>Human-centered pedagogy that values mistakes as progress</span>
          </li>
        </ul>
      </div>
      <div className="relative group">
        <img 
          src="/images/class-discussion.jpeg" 
          alt="Interactive Spanish class"
          className="rounded-xl shadow-xl w-full h-auto group-hover:opacity-90 transition-all"
        />
        <div className="absolute -inset-4 border-2 border-primary/30 rounded-xl pointer-events-none group-hover:border-primary/50 transition-all"></div>
      </div>
    </div>

    {/* Founders Section */}
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12">
      <h3 className="text-2xl font-bold text-center mb-12 text-gray-800">Meet Your Guides to Fluency</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Vic's Profile */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6"
          whileHover={{ y: -5 }}
        >
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative">
              <img 
                src="/images/profile.png" 
                alt="Victor Briceño" 
                className="w-32 h-32 object-cover rounded-full border-4 border-primary/20"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/30 transition-all"></div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Victor Briceño</h4>
            <p className="text-gray-600 mb-3 italic">
              "Making Spanish a vibrant part of your life"
            </p>
            <p className="text-gray-600">
              Multicultural fluency specialist with 7+ years transforming textbook knowledge into authentic conversations across Venezuela, Perú, and Colombia.
            </p>
          </div>
        </motion.div>

        {/* Elizabeth's Profile */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6"
          whileHover={{ y: -5 }}
        >
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative">
              <img 
                src="/images/profile2.jpg" 
                alt="Elizabeth García" 
                className="w-32 h-32 object-cover rounded-full border-4 border-primary/20"
              />
              <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/30 transition-all"></div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-gray-800">Elizabeth García</h4>
            <p className="text-gray-600 mb-3 italic">
              "Bridging linguistic theory with practical communication"
            </p>
            <p className="text-gray-600">
              PhD in Education with 25+ years developing language curricula and pioneering educational technologies for effective acquisition.
            </p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Shared Values */}
    <div className="mt-20 text-center">
      <h3 className="text-2xl font-bold mb-8 text-gray-800">Our Shared Commitment</h3>
      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          {
            icon: "💬",
            title: "Authentic Communication",
            desc: "Prioritizing real interactions over perfect grammar"
          },
          {
            icon: "🌈",
            title: "Inclusive Spaces",
            desc: "LGBTQ+ affirming & culturally responsive teaching"
          },
          {
            icon: "🔗",
            title: "Community Connection",
            desc: "Linking language learning to human rights advocacy"
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Student Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Student Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={Student1Image} 
                  alt="Student" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className="text-sm text-gray-500">3 months of classes</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"Vic made me feel confident speaking Spanish for the first time. I can now have basic conversations with my Colombian coworkers!"</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={Student2Image} 
                  alt="Student" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-500">6 months of classes</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"The personalized approach helped me progress much faster than traditional classes. I'm now comfortable traveling in Spanish-speaking countries."</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={Student3Image} 
                  alt="Student" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold">Emma L.</h4>
                  <p className="text-sm text-gray-500">1 year of classes</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"Vic's cultural insights made learning so much more interesting. I not only learned Spanish but also gained appreciation for Colombian culture."</p>
            </motion.div>
          </div>
        </div>
      </section>

    {/* Full-Width Support Section */}
<section className="py-16 bg-gradient-to-r from-primary to-secondary">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div 
      className="relative overflow-hidden rounded-xl"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative elements */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary rounded-full opacity-20"></div>
      <div className="absolute -left-5 -bottom-5 w-40 h-40 bg-accent-800 rounded-full opacity-10"></div>
      
      {/* Content container */}
      <div className="relative bg-white bg-opacity-90 backdrop-blur-sm p-8 md:p-10 border border-white border-opacity-80 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text portion */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Enjoying Your Spanish Journey?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl">
              Support our school and help us continue providing quality language education
            </p>
          </div>
          
          {/* CTA button */}
          <Link
            to="/supportUs"
            className="whitespace-nowrap bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Support Our Work
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Common Questions Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="font-semibold text-lg">What's included in the trial class?</h3>
              <p className="text-gray-600 mt-2">The trial includes a level assessment, goal setting, and a sample lesson to experience my teaching style. It's a great way to see if we're a good fit before committing to a plan.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="font-semibold text-lg">What materials do I need?</h3>
              <p className="text-gray-600 mt-2">Just a computer with Zoom and a notebook. I provide all learning materials digitally, including exercises, vocabulary lists, and cultural resources.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="font-semibold text-lg">Can I change my plan later?</h3>
              <p className="text-gray-600 mt-2">Yes! Plans can be adjusted monthly based on your progress and changing goals.</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="font-semibold text-lg">How do I schedule classes?</h3>
              <p className="text-gray-600 mt-2">After signing up, you'll get access to my online calendar where you can book classes at times that work for you, with the flexibility to reschedule when needed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Spanish Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step towards fluency with a personalized trial class for just $5.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Trial Class
              </motion.button>
            </Link>
            <Link to="/plans">
              <motion.button
                className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-white hover:text-primary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Plans
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default IndexPage;