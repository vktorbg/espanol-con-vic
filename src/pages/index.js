// src/pages/index.js (Unified Version with gatsby-plugin-react-i18next)

import React from "react";
import { graphql } from 'gatsby';
import { Link as GatsbyLink, navigate as gatsbyNavigate } from "gatsby";
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HeroSplitScreen = () => {
  const { t } = useI18next();

  return (
    <header className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-background.jpeg"
          alt={t('home.hero.backgroundAlt', "Background scene")}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 py-16 md:py-20 lg:py-24">
        <motion.div
          className="md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-secondary text-base sm:text-lg font-regular mb-8">
            {t('home.hero.tagline')}
          </p>
          <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <GatsbyLink to="#plans" className="w-full sm:w-auto">
              <motion.button
                className="w-full sm:w-auto bg-primary text-white text-base md:text-lg px-6 py-3 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('home.hero.explorePlansButton')}
              </motion.button>
            </GatsbyLink>
            <Link to="/signup" className="w-full sm:w-auto">
              <motion.button
                className="w-full sm:w-auto bg-white text-primary border border-primary text-base md:text-lg px-6 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('home.hero.trialClassButton')}
              </motion.button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex justify-center mb-8 md:mb-0 md:pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/profile.png"
            alt={t('home.hero.profileAlt')}
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-primary"
            loading="eager"
          />
        </motion.div>
      </div>
    </header>
  );
};

const IndexPage = () => {
  const { t, language, navigate: i18nextNavigate } = useI18next();

  const teamMembers = t('home.team.members', { returnObjects: true }) || [];
  const plansList = t('home.plans.list', { returnObjects: true }) || [];
  const faqItems = t('home.faq.items', { returnObjects: true }) || [];

  const handlePlanCardClick = (planTitle) => {
    i18nextNavigate(`/plans?plan=${encodeURIComponent(planTitle)}`);
  };

  const handlePlanButtonClick = (e, planTitle) => {
    e.stopPropagation();
    i18nextNavigate(`/plans?plan=${encodeURIComponent(planTitle)}`);
  };

  return (
    <>
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{t('navbar.brand')}</title>
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
      </Helmet>
      <Navbar />
      <HeroSplitScreen />

      {/* Section: Why Learn With Us */}
      <section id="whylearnwithus" className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12">
            {t('home.whyLearn.sectionTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.whyLearn.feature1Title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('home.whyLearn.feature1Desc')}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.whyLearn.feature2Title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('home.whyLearn.feature2Desc')}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.whyLearn.feature3Title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('home.whyLearn.feature3Desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Meet the Team */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-8 md:mb-12">
            {t('home.team.sectionTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {Array.isArray(teamMembers) && teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.alt || member.name}
                    className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-3 text-sm sm:text-base">{member.title}</p>
                <p className="text-gray-600 mb-4 italic text-sm sm:text-base">"{member.quote}"</p>
                <p className="text-gray-600 text-xs sm:text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Our Philosophy */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
           <motion.div
            className="relative group order-1 md:order-1"
          >
            <img
              src="/images/group-talking-fluently.jpg"
              alt={t('home.philosophy.imageAlt')}
              className="rounded-xl shadow-xl w-full h-auto max-h-[400px] md:max-h-none object-cover group-hover:opacity-95 transition-opacity"
              loading="lazy"
            />
            <div className="absolute -inset-2 sm:-inset-3 border-2 border-primary/20 rounded-xl pointer-events-none group-hover:border-primary/40 transition-all duration-300"></div>
          </motion.div>
          <motion.div
            className="space-y-4 md:space-y-5 order-2 md:order-2"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">{t('home.philosophy.sectionTitle')}</h2>
            <p className="text-base md:text-lg text-gray-700">
              {t('home.philosophy.paragraph')}
            </p>
            <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span>
                <span><span className="font-semibold">{t('home.philosophy.listItem1')}</span> {t('home.philosophy.listItem1Desc')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span>
                <span><span className="font-semibold">{t('home.philosophy.listItem2')}</span> {t('home.philosophy.listItem2Desc')}</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span>
                <span><span className="font-semibold">{t('home.philosophy.listItem3')}</span> {t('home.philosophy.listItem3Desc')}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section: Plans */}
      <section id="plans" className="py-12 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
            {t('home.plans.sectionTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(plansList) && plansList.map((plan, index) => (
              <motion.div
                key={plan.title || index}
                onClick={() => handlePlanCardClick(plan.title)}
                className="bg-white border rounded-md p-4 sm:p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
                whileHover={{ y: -5 }}
              >
                <img
                  src={plan.image}
                  alt={plan.alt || plan.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <div className="flex-grow mb-4">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.title}</h3>
                    {plan.newPrice ? (
                    <p className="text-primary font-bold mb-2 text-base md:text-lg">
                        ${plan.newPrice} <span className="text-xs sm:text-sm">/{plan.frequency}</span> <br />
                        <span className="text-xs sm:text-sm text-gray-600">{plan.sessionsPerWeek}</span>
                    </p>
                    ) : (
                    <p className="text-primary font-bold mb-2 text-base md:text-lg">{t('home.plans.customPrice')}</p>
                    )}
                    <p className="text-gray-600 text-sm sm:text-base">{plan.description}</p>
                </div>
                <button
                  onClick={(e) => handlePlanButtonClick(e, plan.title)}
                  className="w-full mt-auto bg-primary text-white px-5 py-2 text-sm md:text-base rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                >
                  {t('home.plans.viewDetailsButton')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: How It Works */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 text-center">
            {t('home.howItWorks.sectionTitle')}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <motion.div className="flex-1 flex flex-col items-center text-center p-3 md:p-4">
              <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.howItWorks.step1Title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('home.howItWorks.step1Desc')}</p>
            </motion.div>
            <div className="hidden md:block self-center mx-4 shrink-0">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <motion.div className="flex-1 flex flex-col items-center text-center p-3 md:p-4">
              <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.howItWorks.step2Title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('home.howItWorks.step2Desc')}</p>
            </motion.div>
            <div className="hidden md:block self-center mx-4 shrink-0">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <motion.div className="flex-1 flex flex-col items-center text-center p-3 md:p-4">
              <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t('home.howItWorks.step3Title')}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{t('home.howItWorks.step3Desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Support Us */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div /* ... */ >
            <div /* Decorative */></div> <div /* Decorative */></div>
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-6 md:p-8 lg:p-10 border border-white border-opacity-60 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {t('home.support.sectionTitle')}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                    {t('home.support.paragraph')}
                  </p>
                </div>
                <Link
                  to="/supportUs"
                  className="w-full sm:w-auto whitespace-nowrap flex-shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3 text-base md:text-lg rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  {t('home.support.supportButton')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: FAQ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
            {t('home.faq.sectionTitle')}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {Array.isArray(faqItems) && faqItems.map((faq, index) => (
              <motion.div key={index} /* ... */ >
                <h3 className="font-semibold text-base md:text-lg text-gray-800">{faq.question}</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Start Your Journey CTA */}
      <section className="py-12 md:py-16 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">¿Listo/a para agendar tu primera sesión?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Da el primer paso hacia la fluidez con una clase de prueba personalizada por solo $5.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/signupTrial" className="w-full sm:w-auto">
              <motion.button
                className="w-full sm:w-auto bg-white text-primary px-6 py-3 text-base md:text-lg rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RESERVA TU CLASE DE PRUEBA
              </motion.button>
            </Link>
            <Link to="/plans" className="w-full sm:w-auto">
              <motion.button
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 py-3 text-base md:text-lg rounded-md font-bold shadow-sm hover:bg-white hover:text-primary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos los Planes
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

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}, ns: {eq: "translation"}}) {
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