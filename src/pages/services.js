// /src/pages/services.js (Unified Version with gatsby-plugin-react-i18next)
import React from "react";
import { graphql } from 'gatsby'; // Necesario para la consulta de página
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar"; // Asumimos que ya está refactorizado
import Footer from "../components/Footer"; // Asumimos que ya está refactorizado

// --- Eliminar datos locales 'servicios' ---

// El componente ServiceIcon se mantiene igual, depende de la clave 'icon' del JSON
const ServiceIcon = ({ iconKey }) => {
  switch (iconKey) {
    case 'conversation':
      return (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      );
    case 'grammar':
      return (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'feedback':
       return (
          <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
      );
    case 'flexible':
       return (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
};


const ServicesPage = () => {
  const { t, language } = useI18next();
  const serviceItems = t('services.serviceList.items', { returnObjects: true }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{`${t('navbar.services')} - ${t('navbar.brand')}`}</title>
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
        style={{ backgroundImage: "url('/images/hero-background.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold leading-tight mb-4" // Clases de estilo mantenidas
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('services.hero.title')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto" // Clases de estilo mantenidas
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t('services.hero.paragraph')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/plans">
              <motion.button
                className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('services.hero.explorePlansButton')}
              </motion.button>
            </Link>
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary border border-primary px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('services.hero.trialClassButton')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sección Servicios - "Tu Camino Hacia la Fluidez" */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            {t('services.serviceList.sectionTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {Array.isArray(serviceItems) && serviceItems.map((service, index) => (
              <motion.div
                key={service.title || index} // Usar título como key si es único
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  <ServiceIcon iconKey={service.icon} />
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Llamada a la Acción Final */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('services.cta.sectionTitle')}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
             {t('services.cta.paragraph')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-gray-100 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('services.cta.trialButton')}
              </motion.button>
            </Link>
            <Link to="/plans">
              <motion.button
                className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-white hover:text-primary transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('services.cta.viewPlansButton')}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;

// *** AÑADE ESTA CONSULTA GraphQL AL FINAL DEL ARCHIVO ***
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