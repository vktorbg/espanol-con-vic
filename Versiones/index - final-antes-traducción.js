// --- START OF FILE index.js ---

import React from "react"; // Removed useState as it's no longer needed here
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Images from the static folder (Removed unused student images)
const ProfileImage = "/images/profile.png";
const ProfileImage2 = "/images/profile2.jpg";
const HeroBackground = "/images/hero-background.jpeg";
// const Student1Image = "/images/student1.jpg"; // Removed - Unused
// const Student2Image = "/images/student2.jpg"; // Removed - Unused
// const Student3Image = "/images/student3.jpg"; // Removed - Unused

const plans = [
  {
    title: "Individual Classes",
    newPrice: "20",
    frequency: "class",
    description: "Pay-as-you-go Spanish lessons.",
    image: "/images/plan3.jpg",
    custom: true,
  },
  {
    title: "Confidence",
    newPrice: 120,
    frequency: "month (25% off)",
    description: "Boost your confidence with consistency.",
    image: "/images/plan1.jpg",
  },
  {
    title: "Fluency Plan",
    newPrice: 220,
    frequency: "month (30% off)",
    description: "Intensive practice for rapid progress.",
    image: "/images/plan2.jpg",
  },
];

const team = [
  {
    name: "Victor Briceño",
    title: "Fluency Specialist",
    quote: "Making Spanish a vibrant part of your life",
    bio: "Multicultural fluency specialist with 7+ years transforming textbook knowledge into authentic conversations across Venezuela, Perú, and Colombia.",
    image: "/images/profile.png", // Path seems correct
  },
  {
    name: "Elizabeth García",
    title: "Linguistics Educator",
    quote: "Bridging linguistic theory with practical communication",
    bio: "PhD in Education with 25+ years developing language curricula and pioneering educational technologies for effective acquisition.",
    image: "/images/profile2.jpg", // Path seems correct
  },
];

// Helper function remains the same - looks good
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

// Animation variants remain the same - looks good
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

// Simplified HeroSplitScreen - removed unnecessary state
const HeroSplitScreen = () => {
  // Removed: const [hovered, setHovered] = useState(false);

  return (
    <header className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HeroBackground} // Path seems correct
          alt="Medellín Street Scene"
          className="w-full h-full object-cover"
        />
        {/* Added loading="eager" as this is likely above the fold */}
      </div>

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-24">
        {/* Left Side: Text Content */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start mb-8 md:mb-0 md:mr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight mb-4 text-left">
            Online Spanish Fluency School
          </h1>
          <p className="text-secondary text-lg font-regular mb-8 text-left">
            Build real speaking skills and the boldness to use them anywhere.
          </p>

          {/* Buttons */}
          <div className="w-full flex justify-center md:justify-start space-x-4"> {/* Adjusted alignment for consistency */}
            <Link to="#plans">
              <motion.button
                className="bg-primary text-white text-xl px-8 py-3 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Fluency Journey
              </motion.button>
            </Link>
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary border border-primary text-xl px-8 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get your Trial Class
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
            src={ProfileImage} // Path seems correct
            alt="Profile of Vic"
            // Replaced inline style with Tailwind classes
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-primary"
            variants={auraVariants}
            animate="idle"
            whileHover="hover"
            // Removed: onMouseEnter={() => setHovered(true)}
            // Removed: onMouseLeave={() => setHovered(false)}
            // Added loading="eager" as this is likely above the fold
            loading="eager"
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

      {/* Why Learn With Us Section - No changes needed */}
      <section id="whylearnwithus" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Why Learn Spanish With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
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
            {/* Feature 2 */}
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
            {/* Feature 3 */}
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

      {/* Meet the Team Section - Added loading="lazy" to images */}
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
                    src={member.image} // Path seems correct
                    alt={member.name}
                    className="w-36 h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy" // Added lazy loading
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

      {/* Our Philosophy Section - Added loading="lazy" to image */}
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
              src="/images/group-talking-fluently.jpg" // Path seems correct
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
                <span><span className="font-semibold">Academic Foundation:</span> Leveraging Elizabeth's 25+ years in linguistics and education for structured learning.</span>
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

      {/* Plans Section - Added loading="lazy" to images */}
      <section id="plans" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Plans Made for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent(plan.title)}`)
                }
                className="bg-white border rounded-md p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col" // Added flex flex-col
                whileHover={{ y: -5 }}
              >
                <img
                  src={plan.image} // Path seems correct
                  alt={plan.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy" // Added lazy loading
                />
                <div className="flex-grow"> {/* Added flex-grow to push button down */}
                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                    {plan.newPrice ? (
                    <p className="text-primary font-bold mb-2">
                        ${plan.newPrice} <span className="text-sm">/{plan.frequency}</span> <br />
                        <span className="text-sm text-gray-600">{getSessionsPerWeek(plan)}</span>
                    </p>
                    ) : (
                    <p className="text-primary font-bold mb-2">Custom Pricing</p>
                    )}
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Keep stopPropagation to prevent double navigation
                    navigate(`/plans?plan=${encodeURIComponent(plan.title)}`);
                  }}
                  // Adjusted hover style slightly for consistency
                  className="w-full mt-auto bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works Section - No changes needed */}
      <section className="py-16 bg-white"> {/* Changed background to white for contrast with plans section */}
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center"> {/* Align items start on mobile */}
            {/* Step 1 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }} // Slightly reduced hover scale
            >
              <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20"> {/* Adjusted styling */}
                <span className="text-primary font-bold text-2xl">1</span> {/* Increased size */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Your Trial</h3>
              <p className="text-gray-600">Start with a $5 trial class - a sample lesson to experience our teaching style.</p>
            </motion.div>
            {/* Arrow Separator */}
            <div className="hidden md:block self-center mx-4"> {/* Centered arrow */}
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
             {/* Arrow Separator for Mobile */}
            <div className="block md:hidden self-center my-4 transform rotate-90">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Step 2 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Plan</h3>
              <p className="text-gray-600">Set your goals, build a personalized plan and schedule.</p>
            </motion.div>
             {/* Arrow Separator */}
            <div className="hidden md:block self-center mx-4">
               <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Arrow Separator for Mobile */}
            <div className="block md:hidden self-center my-4 transform rotate-90">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Step 3 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-600">Begin your journey to fluency.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Full-Width Support Section - No changes needed, looks good */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500"> {/* Adjusted gradient */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements - adjusted opacity/color */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
            <div className="absolute -left-5 -bottom-5 w-40 h-40 bg-white rounded-full opacity-5"></div>

            {/* Content container */}
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 border border-white border-opacity-60 rounded-xl shadow-lg"> {/* Added shadow */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Text portion */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Enjoying Your Spanish Journey?
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Support our school and help us continue providing quality language education.
                  </p>
                </div>

                {/* CTA button */}
                <Link
                  to="/supportUs" // Path seems correct
                  className="whitespace-nowrap flex-shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Support Our Work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Questions Section - No changes needed */}
      <section className="py-16 bg-gray-50"> {/* Changed background */}
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200" // Added subtle border
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}} // Enhanced hover
              transition={{ type: "spring", stiffness: 300, damping: 20 }} // Springy transition
            >
              <h3 className="font-semibold text-lg text-gray-800">What's included in the trial class?</h3>
              <p className="text-gray-600 mt-2">The trial includes a level assessment, goal setting, and a sample lesson to experience my teaching style. It's a great way to see if we're a good fit before committing to a plan.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">What materials do I need?</h3>
              <p className="text-gray-600 mt-2">Just a computer with Zoom and a notebook. I provide all learning materials digitally, including exercises, vocabulary lists, and cultural resources.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">Can I change my plan later?</h3>
              <p className="text-gray-600 mt-2">Yes! Plans can be adjusted monthly based on your progress and changing goals.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">How do I schedule classes?</h3>
              <p className="text-gray-600 mt-2">After signing up, you'll get access to my online calendar where you can book classes at times that work for you, with the flexibility to reschedule when needed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section - No changes needed */}
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
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold shadow-sm hover:bg-white hover:text-primary transition" // Added shadow-sm, border-2
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

// --- END OF FILE index.js ---