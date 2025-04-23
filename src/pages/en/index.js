// --- START OF FILE index.js (English Version - Responsiveness Improved) ---

import React from "react";
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar"; // Ensure path is correct
import Footer from "../../components/Footer"; // Ensure path is correct

// Images
const ProfileImage = "/images/profile.png";
const ProfileImage2 = "/images/profile2.jpg";
const HeroBackground = "/images/hero-background.jpeg";

const plans = [
  // ... (plan data remains the same - looks good)
  {
    title: "Individual Classes",
    newPrice: "20",
    frequency: "class",
    description: "Pay-as-you-go Spanish lessons with full adaptability.",
    image: "/images/plan3.jpg",
    custom: true,
    sessionsPerWeek: "Flexible scheduling",
    features: [
      "Personalized 1-hour sessions",
      "Flexible scheduling",
      "No long-term commitment",
      "Tailored to your immediate needs",
    ],
  },
  {
    title: "Confidence Plan",
    newPrice: 120,
    frequency: "month (25% off)",
    description: "Boost your confidence with consistency.",
    image: "/images/plan1.jpg",
    sessionsPerWeek: "2 sessions per week",
    features: [
      "2 classes per week (8/month)",
      "Conversational focus",
      "$15 per class (25% savings)",
      "Personalized feedback and corrections",
    ],
  },
  {
    title: "Fluency Plan",
    newPrice: 220,
    frequency: "month (30% off)",
    description: "Intensive practice for rapid progress.",
    image: "/images/plan2.jpg",
    sessionsPerWeek: "4 sessions per week",
    features: [
      "4 classes per week (16/month)",
      "Immersive approach",
      "$13.75 per class (30% savings)",
      "Monthly progress reports",
      "Personalized feedback and corrections",
    ],
  },
];

const team = [
  // ... (team data remains the same - looks good)
   {
    name: "Victor Briceño",
    title: "Grammar & Fluency Specialist",
    quote: "Making Spanish a vibrant part of your life",
    bio: "Spanish and Literature teacher with a multicultural teaching approach, with over 7 years of practice teaching individuals from many different countries. Passionate about making the most challenging topics fun.",
    image: "/images/profile.png",
  },
  {
    name: "Elizabeth García",
    title: "Linguist & Educational Programmer",
    quote: "Bridging linguistic theory with practical communication",
    bio: "PhD in Education and Master's in Linguistics applied to Spanish and English language teaching and learning, with over 25 years of experience as an educator and curriculum developer.",
    image: "/images/profile2.jpg",
  },
];

// Animation variants remain the same
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

// HeroSplitScreen Component with Responsiveness Improvements
const HeroSplitScreen = () => {
  return (
    <header className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HeroBackground}
          alt="Medellín Street Scene"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Adjusted padding: px-4 base, px-6 sm+, py-16 base, py-20 md+, py-24 lg+ */}
      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 py-16 md:py-20 lg:py-24">
        {/* Left Side: Text Content */}
        <motion.div
          // Aligned center on mobile, start on md+
          className="md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Adjusted heading size: text-4xl base, text-5xl md+ */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Online Spanish Fluency School
          </h1>
          {/* Adjusted tagline size: text-base base, text-lg sm+ */}
          <p className="text-secondary text-base sm:text-lg font-regular mb-8">
            Build real speaking skills and the boldness to use them anywhere.
          </p>

          {/* Buttons: Stack vertically on mobile, row on sm+. Adjusted text size and padding. */}
          <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <Link to="#plans" className="w-full sm:w-auto">
              <motion.button
                 // Adjusted text size and padding
                className="w-full sm:w-auto bg-primary text-white text-base md:text-lg px-6 py-3 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Plans
              </motion.button>
            </Link>
            <Link to="/signupTrial" className="w-full sm:w-auto">
              <motion.button
                 // Adjusted text size and padding
                className="w-full sm:w-auto bg-white text-primary border border-primary text-base md:text-lg px-6 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your Trial Class!
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Profile Image */}
        <motion.div
          // Added pl-0 md:pl-8 for spacing on larger screens
          className="md:w-1/2 flex justify-center mb-8 md:mb-0 md:pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={ProfileImage}
            alt="Profile of Vic"
            // Adjusted image size: w-64/h-64 base, w-72/h-72 sm+, w-80/h-80 md+
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-primary"
            variants={auraVariants}
            animate="idle"
            whileHover="hover"
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
      <Helmet>
        {/* Ensure correct path to Logo */}
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      <HeroSplitScreen />

      {/* Why Learn With Us Section */}
       {/* Adjusted padding: py-12 base, py-16 md+ */}
      <section id="whylearnwithus" className="py-12 md:py-16 bg-white">
         {/* Adjusted padding: px-4 base, px-6 sm+ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 text-center">
            Why Learn Spanish With Us?
          </h2>
          {/* Adjusted gap: gap-6 base, gap-8 md+ */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <motion.div
              // Adjusted padding: p-4 base, p-6 sm+
              className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
               {/* Title size adjusted: text-lg base, text-xl md+ */}
              <h3 className="text-lg md:text-xl font-semibold mb-2">Personalized Approach</h3>
               {/* Text size adjusted: text-sm base, text-base sm+ */}
              <p className="text-gray-600 text-sm sm:text-base">Lessons tailored to your goals, interests, and learning style.</p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm sm:text-base">Book classes when it works for you - mornings, evenings, or weekends.</p>
            </motion.div>
            {/* Feature 3 */}
             <motion.div
              className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Cultural Immersion</h3>
              <p className="text-gray-600 text-sm sm:text-base">Learn authentic Spanish with cultural insights from South America.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-8 md:mb-12">
            Meet Your Guides to Fluency
          </h2>
           {/* Adjusted gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                 // Adjusted padding
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-4">
                   {/* Image size adjusted slightly */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                 {/* Text sizes adjusted slightly */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3 text-sm sm:text-base">{member.title}</p>
                <p className="text-gray-600 mb-4 italic text-sm sm:text-base">"{member.quote}"</p>
                <p className="text-gray-600 text-xs sm:text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Div */}
           <motion.div
            className="relative group order-1 md:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            {/* Added max-h for mobile */}
            <img
              src="/images/group-talking-fluently.jpg"
              alt="Interactive Spanish learning"
              className="rounded-xl shadow-xl w-full h-auto max-h-[400px] md:max-h-none object-cover group-hover:opacity-95 transition-opacity"
              loading="lazy"
            />
            <div className="absolute -inset-2 sm:-inset-3 border-2 border-primary/20 rounded-xl pointer-events-none group-hover:border-primary/40 transition-all duration-300"></div>
          </motion.div>
          {/* Text Div */}
          <motion.div
            // Adjusted vertical spacing
            className="space-y-4 md:space-y-5 order-2 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
             {/* Adjusted heading size */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Our Fluency Philosophy</h2>
             {/* Adjusted text size */}
            <p className="text-base md:text-lg text-gray-700">
              We believe fluency blossoms when you connect language to real life. Our unique methodology isn't about perfection; it's about progress and the courage to communicate.
            </p>
            {/* Adjusted list text size and spacing */}
            <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span> {/* Added mt-1 */}
                <span><span className="font-semibold">Academic Foundation:</span> We combine proven pedagogical theories with authentic conversations tailored to real cultural contexts for comprehensive and effective learning.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span> {/* Added mt-1 */}
                <span><span className="font-semibold">Immersive Practice:</span> Incorporating Vic's real-world experience across Latin America for authentic conversation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span> {/* Added mt-1 */}
                <span><span className="font-semibold">Human-Centered Approach:</span> Creating a supportive space where mistakes are celebrated as learning opportunities.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      {/* Adjusted padding */}
      <section id="plans" className="py-12 md:py-16 bg-gray-100">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
            Plans Made for You
          </h2>
           {/* Adjusted gap and grid cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent(plan.title)}`)
                }
                // Adjusted padding
                className="bg-white border rounded-md p-4 sm:p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
                whileHover={{ y: -5 }}
              >
                <img
                  src={plan.image}
                  alt={plan.title}
                  // Fixed height for consistency
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <div className="flex-grow mb-4"> {/* Added mb-4 */}
                    {/* Adjusted title size */}
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.title}</h3>
                    {plan.newPrice ? (
                    // Adjusted pricing text size
                    <p className="text-primary font-bold mb-2 text-base md:text-lg">
                        ${plan.newPrice} <span className="text-xs sm:text-sm">/{plan.frequency}</span> <br />
                        <span className="text-xs sm:text-sm text-gray-600">{plan.sessionsPerWeek}</span>
                    </p>
                    ) : (
                    <p className="text-primary font-bold mb-2 text-base md:text-lg">Custom Pricing</p>
                    )}
                    {/* Adjusted description text size */}
                    <p className="text-gray-600 text-sm sm:text-base mb-4">{plan.description}</p>
                    {/* Features are available in data if needed */}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/plans?plan=${encodeURIComponent(plan.title)}`);
                  }}
                   // Adjusted button padding and text size
                  className="w-full mt-auto bg-primary text-white px-5 py-2 text-sm md:text-base rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* How It Works Section */}
       {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-white">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 text-center">
            How It Works
          </h2>
          {/* Adjusted items alignment */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            {/* Step 1 */}
            <motion.div
              // Adjusted padding
              className="flex-1 flex flex-col items-center text-center p-3 md:p-4"
              whileHover={{ scale: 1.03 }}
            >
               {/* Adjusted circle size */}
              <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">1</span>
              </div>
               {/* Adjusted title size */}
              <h3 className="text-lg md:text-xl font-semibold mb-2">Book Your Trial</h3>
               {/* Adjusted description size */}
              <p className="text-gray-600 text-sm sm:text-base">Start with a $5 trial class - a sample lesson to experience our teaching style.</p>
            </motion.div>

            {/* Arrow Separators */}
            <div className="hidden md:block self-center mx-4 shrink-0">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="block md:hidden self-center my-4 sm:my-6 shrink-0">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /> {/* Down arrow */}
              </svg>
            </div>

            {/* Step 2 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-3 md:p-4"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Get Your Plan</h3>
              <p className="text-gray-600 text-sm sm:text-base">Set your goals, build a personalized plan and schedule.</p>
            </motion.div>

            {/* Arrow Separators */}
            <div className="hidden md:block self-center mx-4 shrink-0">
               <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
             <div className="block md:hidden self-center my-4 sm:my-6 shrink-0">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /> {/* Down arrow */}
              </svg>
            </div>

            {/* Step 3 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-3 md:p-4"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-600 text-sm sm:text-base">Begin your journey to fluency.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Support Section */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-orange-500">
         {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-10"></div>
            <div className="absolute -left-5 -bottom-5 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full opacity-5"></div>

            {/* Content container */}
             {/* Adjusted padding */}
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-6 md:p-8 lg:p-10 border border-white border-opacity-60 rounded-xl shadow-lg">
               {/* Adjusted gap */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                {/* Text portion */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                  {/* Adjusted heading size */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    Want to support this project?
                  </h3>
                  {/* Adjusted text size */}
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                    Support our school and help us continue providing quality language education.
                  </p>
                </div>

                {/* CTA button */}
                <Link
                  to="/supportUs"
                  // Added w-full sm:w-auto, adjusted padding/text size
                  className="w-full sm:w-auto whitespace-nowrap flex-shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3 text-base md:text-lg rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  How to Support?
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Questions Section */}
       {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-gray-50">
         {/* Adjusted padding */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
            Common Questions
          </h2>
           {/* Adjusted spacing */}
          <div className="space-y-3 sm:space-y-4">
            <motion.div
              // Adjusted padding
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               {/* Adjusted text size */}
              <h3 className="font-semibold text-base md:text-lg text-gray-800">What's included in the trial class?</h3>
              {/* Adjusted text size */}
              <p className="text-gray-600 mt-2 text-sm sm:text-base">The trial includes a level assessment, goal setting, and a sample lesson to experience my teaching style. It's a great way to see if we're a good fit before committing to a plan.</p>
            </motion.div>
            {/* Repeat adjustments for other FAQ items */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-base md:text-lg text-gray-800">What materials do I need?</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Just a computer with Zoom and a notebook. I provide all learning materials digitally, including exercises, vocabulary lists, and cultural resources.</p>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-base md:text-lg text-gray-800">Can I change my plan later?</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Yes! Plans can be adjusted monthly based on your progress and changing goals.</p>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-base md:text-lg text-gray-800">How do I schedule classes?</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">After signing up, you'll get access to my online calendar where you can book classes at times that work for you, with the flexibility to reschedule when needed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
       {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-primary text-white">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
           {/* Adjusted heading size */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Schedule Your First Session?</h2>
          {/* Adjusted text size and margin */}
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Take the first step towards fluency with a personalized trial class for just $5.
          </p>
          {/* Layout stacks vertically by default, sm:flex-row added */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4"> {/* Added items-center */}
            <Link to="/signupTrial" className="w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
              <motion.button
                // Adjusted padding and text size
                className="w-full sm:w-auto bg-white text-primary px-6 py-3 text-base md:text-lg rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK YOUR TRIAL CLASS
              </motion.button>
            </Link>
            <Link to="/plans" className="w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
              <motion.button
                 // Adjusted padding and text size
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 py-3 text-base md:text-lg rounded-md font-bold shadow-sm hover:bg-white hover:text-primary transition"
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

// --- END OF FILE index.js (English Version - Responsiveness Improved) ---