// --- START OF FILE index.js ---

import React from "react";
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import { useTranslation } from "gatsby-plugin-react-i18next"; // Importar hook
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { graphql } from 'gatsby';

// Images remain the same
const ProfileImage = "/images/profile.png";
const ProfileImage2 = "/images/profile2.jpg";
const HeroBackground = "/images/hero-background.jpeg";

// --- Data arrays - Textos extraídos para traducción ---
// Los datos que no cambian (como precios, nombres únicos, paths de imágenes) permanecen.
// Los textos (title, description, quote, bio, frequency) se obtendrán con t() usando índices.
const plansData = [
  {
    // titleKey: "index.plans.plan0.title", (Ejemplo - usaremos el índice directamente)
    newPrice: "20",
    frequencyKey: "index.plans.plan0.frequency",
    // descriptionKey: "index.plans.plan0.description",
    image: "/images/plan3.jpg",
    custom: true,
  },
  {
    newPrice: 120,
    frequencyKey: "index.plans.plan1.frequency",
    image: "/images/plan1.jpg",
    sessionsKey: "index.plans.sessionsPerWeek", // Clave para texto generado
    sessionsCount: 2, // Dato para generar el texto
  },
  {
    newPrice: 220,
    frequencyKey: "index.plans.plan2.frequency",
    image: "/images/plan2.jpg",
    sessionsKey: "index.plans.sessionsPerWeek", // Clave para texto generado
    sessionsCount: 4, // Dato para generar el texto
  },
];

const teamData = [
  {
    name: "Victor Briceño", // Los nombres generalmente no se traducen directamente
    // titleKey: "index.team.member0.title",
    // quoteKey: "index.team.member0.quote",
    // bioKey: "index.team.member0.bio",
    image: "/images/profile.png",
  },
  {
    name: "Elizabeth García",
    // titleKey: "index.team.member1.title",
    // quoteKey: "index.team.member1.quote",
    // bioKey: "index.team.member1.bio",
    image: "/images/profile2.jpg",
  },
];
// --- Fin Data arrays ---


// Helper function para obtener el texto de sesiones (devuelve clave o texto)
const getSessionsPerWeekText = (plan, t) => {
  if (plan.custom) {
    return t("index.plans.flexibleScheduling"); // Clave para "Flexible scheduling"
  }
  if (plan.sessionsCount && plan.sessionsKey) {
    // Usa la clave y pasa la cuenta para interpolación
    return t(plan.sessionsKey, { count: plan.sessionsCount });
  }
  return "";
};

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

// HeroSplitScreen Component
const HeroSplitScreen = () => {
  const { t } = useTranslation(); // Usar hook aquí también

  return (
    <header className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HeroBackground}
          alt={t("index.hero.backgroundImageAlt")} // Traducir alt
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-24">
        <motion.div
          className="md:w-1/2 flex flex-col items-start mb-8 md:mb-0 md:mr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight mb-4 text-left">
            {t("index.hero.title")} {/* Traducir título */}
          </h1>
          <p className="text-secondary text-lg font-regular mb-8 text-left">
            {t("index.hero.subtitle")} {/* Traducir subtítulo */}
          </p>
          <div className="w-full flex justify-center md:justify-start space-x-4">
            <Link to="#plans">
              <motion.button
                className="bg-primary text-white text-xl px-8 py-3 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("index.hero.button1")} {/* Traducir botón */}
              </motion.button>
            </Link>
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary border border-primary text-xl px-8 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("index.hero.button2")} {/* Traducir botón */}
              </motion.button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex justify-center mb-8 md:mb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={ProfileImage}
            alt={t("index.hero.profileImageAlt")} // Traducir alt
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-primary"
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

// IndexPage Component
const IndexPage = () => {
  const { t } = useTranslation(); // Usar hook aquí

  return (
    <>
      <Navbar />
      <HeroSplitScreen />

      {/* Why Learn With Us Section */}
      <section id="whylearnwithus" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            {t("index.whyLearn.title")} {/* Traducir */}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              {/* Icon remains */}
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("index.whyLearn.feature1.title")}</h3> {/* Traducir */}
              <p className="text-gray-600">{t("index.whyLearn.feature1.description")}</p> {/* Traducir */}
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              {/* Icon remains */}
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("index.whyLearn.feature2.title")}</h3> {/* Traducir */}
              <p className="text-gray-600">{t("index.whyLearn.feature2.description")}</p> {/* Traducir */}
            </motion.div>
            {/* Feature 3 */}
             <motion.div
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              {/* Icon remains */}
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
              <h3 className="text-xl font-semibold mb-2">{t("index.whyLearn.feature3.title")}</h3> {/* Traducir */}
              <p className="text-gray-600">{t("index.whyLearn.feature3.description")}</p> {/* Traducir */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            {t("index.team.title")} {/* Traducir */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {teamData.map((member, index) => (
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
                    alt={t("index.team.memberImageAlt", { name: member.name })} // Traducir alt con interpolación
                    className="w-36 h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3> {/* Nombre no traducido aquí */}
                <p className="text-primary font-semibold mb-3">{t(`index.team.member${index}.title`)}</p> {/* Traducir */}
                <p className="text-gray-600 mb-4 italic">"{t(`index.team.member${index}.quote`)}"</p> {/* Traducir */}
                <p className="text-gray-600 text-sm">{t(`index.team.member${index}.bio`)}</p> {/* Traducir */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
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
              src="/images/group-talking-fluently.jpg"
              alt={t("index.philosophy.imageAlt")} // Traducir alt
              className="rounded-xl shadow-xl w-full h-auto group-hover:opacity-95 transition-opacity"
              loading="lazy"
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{t("index.philosophy.title")}</h2> {/* Traducir */}
            <p className="text-lg text-gray-700">
              {t("index.philosophy.description")} {/* Traducir */}
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span><span className="font-semibold">{t("index.philosophy.listItem1.title")}</span> {t("index.philosophy.listItem1.description")}</span> {/* Traducir */}
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span><span className="font-semibold">{t("index.philosophy.listItem2.title")}</span> {t("index.philosophy.listItem2.description")}</span> {/* Traducir */}
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span><span className="font-semibold">{t("index.philosophy.listItem3.title")}</span> {t("index.philosophy.listItem3.description")}</span> {/* Traducir */}
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            {t("index.plans.title")} {/* Traducir */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {plansData.map((plan, index) => {
              const planTitleKey = `index.plans.plan${index}.title`;
              const planTitle = t(planTitleKey);
              const planNavigate = () => navigate(`/plans?plan=${encodeURIComponent(planTitle)}`); // Navega con el título traducido actual

              return (
                <motion.div
                  key={index}
                  onClick={planNavigate}
                  className="bg-white border rounded-md p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={plan.image}
                    alt={t("index.plans.planImageAlt", { title: planTitle })} // Traducir alt con título traducido
                    className="w-full h-48 object-cover rounded-md mb-4"
                    loading="lazy"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{planTitle}</h3> {/* Traducir */}
                    {plan.newPrice ? (
                      <p className="text-primary font-bold mb-2">
                        ${plan.newPrice}{" "}
                        <span className="text-sm">{t(plan.frequencyKey)}</span> {/* Traducir frecuencia */}
                        <br />
                        <span className="text-sm text-gray-600">{getSessionsPerWeekText(plan, t)}</span> {/* Obtener texto traducido */}
                      </p>
                    ) : (
                      <p className="text-primary font-bold mb-2">{t("index.plans.customPricing")}</p> /* Traducir */
                    )}
                    <p className="text-gray-600 mb-4">{t(`index.plans.plan${index}.description`)}</p> {/* Traducir */}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      planNavigate();
                    }}
                    className="w-full mt-auto bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                  >
                    {t("index.plans.viewDetailsButton")} {/* Traducir */}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            {t("index.howItWorks.title")} {/* Traducir */}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Step 1 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t("index.howItWorks.step1.title")}</h3> {/* Traducir */}
              <p className="text-gray-600">{t("index.howItWorks.step1.description")}</p> {/* Traducir */}
            </motion.div>
            {/* Separators remain */}
            <div className="hidden md:block self-center mx-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
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
              <h3 className="text-xl font-semibold mb-2">{t("index.howItWorks.step2.title")}</h3> {/* Traducir */}
              <p className="text-gray-600">{t("index.howItWorks.step2.description")}</p> {/* Traducir */}
            </motion.div>
             {/* Separators remain */}
            <div className="hidden md:block self-center mx-4">
               <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
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
              <h3 className="text-xl font-semibold mb-2">{t("index.howItWorks.step3.title")}</h3> {/* Traducir */}
              <p className="text-gray-600">{t("index.howItWorks.step3.description")}</p> {/* Traducir */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Width Support Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements remain */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
            <div className="absolute -left-5 -bottom-5 w-40 h-40 bg-white rounded-full opacity-5"></div>

            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 border border-white border-opacity-60 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {t("index.support.title")} {/* Traducir */}
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    {t("index.support.description")} {/* Traducir */}
                  </p>
                </div>
                <Link
                  to="/supportUs"
                  className="whitespace-nowrap flex-shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  {t("index.support.button")} {/* Traducir */}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            {t("index.faq.title")} {/* Traducir */}
          </h2>
          <div className="space-y-4">
            {/* Question 1 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">{t("index.faq.q1.question")}</h3> {/* Traducir */}
              <p className="text-gray-600 mt-2">{t("index.faq.q1.answer")}</p> {/* Traducir */}
            </motion.div>
            {/* Question 2 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">{t("index.faq.q2.question")}</h3> {/* Traducir */}
              <p className="text-gray-600 mt-2">{t("index.faq.q2.answer")}</p> {/* Traducir */}
            </motion.div>
            {/* Question 3 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">{t("index.faq.q3.question")}</h3> {/* Traducir */}
              <p className="text-gray-600 mt-2">{t("index.faq.q3.answer")}</p> {/* Traducir */}
            </motion.div>
            {/* Question 4 */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">{t("index.faq.q4.question")}</h3> {/* Traducir */}
              <p className="text-gray-600 mt-2">{t("index.faq.q4.answer")}</p> {/* Traducir */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("index.cta.title")}</h2> {/* Traducir */}
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("index.cta.subtitle")} {/* Traducir */}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("index.cta.button1")} {/* Traducir */}
              </motion.button>
            </Link>
            <Link to="/plans">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold shadow-sm hover:bg-white hover:text-primary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("index.cta.button2")} {/* Traducir */}
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

// Añade esta consulta al final del archivo para que el plugin funcione correctamente
export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}, ns: {eq: "index"}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;


// --- END OF FILE index.js ---