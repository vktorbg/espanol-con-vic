// /src/pages/plans.js (Unified Version with gatsby-plugin-react-i18next)

import React, { useState, useEffect } from "react";
// *** PASO 1: Ajustar importaciones ***
import { graphql } from 'gatsby'; // Necesario para la consulta de página
// import { navigate } from "gatsby"; // Usaremos el navigate del plugin
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { useLocation } from "@reach/router"; // Aún se usa para leer query params
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar"; // Asumimos que ya está refactorizado
import Footer from "../components/Footer"; // Asumimos que ya está refactorizado

// --- Eliminar datos locales 'todosLosPlanes' y 'preguntasFrecuentes' ---

const PlansPage = () => {
  const location = useLocation();
  // *** PASO 2: Usar hook del plugin ***
  const { t, language, navigate: i18nextNavigate } = useI18next();

  // *** PASO 4: Obtener datos de arrays ***
  // La lista de planes se reutiliza de 'home.plans.list' para consistencia
  const plansList = t('home.plans.list', { returnObjects: true }) || [];
  // Las FAQ se reutilizan de 'home.faq.items'
  const faqItems = t('home.faq.items', { returnObjects: true }) || [];
  // Los pasos de "How It Works" son específicos de esta página
  const howItWorksSteps = t('plans.howItWorks.steps', { returnObjects: true }) || [];


  // *** PASO 3: Mantener estado, useEffect usa datos de t() ***
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planQuery = params.get("plan");
    if (planQuery && Array.isArray(plansList)) {
      const idx = plansList.findIndex(
        (plan) => plan.title && plan.title.toLowerCase() === planQuery.toLowerCase()
      );
      if (idx !== -1) {
        setSelectedPlanIndex(idx);
      }
    }
  }, [location.search, language, plansList]); // plansList depende de language


  // *** PASO 5: Handler usa i18nextNavigate ***
  const handleSelectPlan = () => {
    if (Array.isArray(plansList) && selectedPlanIndex >= 0 && selectedPlanIndex < plansList.length) {
        const selectedPlan = plansList[selectedPlanIndex];
        // El plugin maneja el prefijo '/es/'
        i18nextNavigate(`/signupTrial?plan=${encodeURIComponent(selectedPlan.title)}&trial=true`);
    } else {
        i18nextNavigate(`/signupTrial?trial=true`);
        console.error("Invalid selected plan index or plans list on PlansPage.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{`${t('navbar.plans')} - ${t('navbar.brand')}`}</title> {/* *** PASO 6: Usar t() *** */}
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-about.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('plans.hero.title')} {/* Translated Heading */}
          </motion.h1>
          <motion.p
            className="mt-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t('plans.hero.paragraph')} {/* Translated Paragraph */}
          </motion.p>
        </div>
      </section>

      {/* Cuadrícula de Planes */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {Array.isArray(plansList) && plansList.map((plan, index) => (
            <motion.div
              key={plan.title || index}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer ${
                selectedPlanIndex === index ? "ring-2 ring-primary" : "ring-1 ring-gray-200 hover:ring-primary/50"
              }`}
              onClick={() => setSelectedPlanIndex(index)}
            >
              <div className={`p-6 transition-colors ${selectedPlanIndex === index ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}>
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                {plan.newPrice && (
                  <p className="text-xl font-semibold mt-2">
                    ${plan.newPrice} <span className="text-sm font-light">/{plan.frequency}</span>
                  </p>
                )}
                <p className={`text-sm mt-1 ${selectedPlanIndex === index ? "text-white/80" : "text-gray-500"}`}>
                     {plan.sessionsPerWeek}
                 </p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 min-h-[4em]">{plan.description}</p>
                {Array.isArray(plan.features) && (
                    <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                        <svg className="h-4 w-4 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                        </li>
                    ))}
                    </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección CTA Debajo de los Planes */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto border border-gray-100">
          <h3 className="text-2xl font-bold text-primary mb-4">
            {t('plans.planGrid.ctaTitle')}
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSelectPlan}
            className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {t('plans.planGrid.ctaButton')}
          </motion.button>
          <p className="text-sm text-gray-500 mt-4">
            {t('plans.planGrid.ctaSubtext')}
          </p>
        </div>
      </section>

      {/* Info de Pago */}
      <section className="max-w-4xl mx-auto py-8 px-4 text-center text-sm text-gray-500">
        <p>{t('plans.paymentInfo.note')}</p>
      </section>

      {/* Cómo Funciona */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">{t('plans.howItWorks.sectionTitle')}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {Array.isArray(howItWorksSteps) && howItWorksSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center border border-gray-100">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">{t('plans.faq.sectionTitle')}</h2>
        <div className="space-y-4">
          {Array.isArray(faqItems) && faqItems.map((faq, index) => (
            <div key={faq.question || index} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PlansPage;

// *** PASO 7: AÑADE ESTA CONSULTA GraphQL AL FINAL DEL ARCHIVO ***
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