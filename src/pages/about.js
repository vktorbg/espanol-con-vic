// /src/pages/about.js (Unified Version with gatsby-plugin-react-i18next)
import React from "react";
import { graphql } from 'gatsby'; // Necesario para la consulta de página
import { Link, useI18next, Trans } from 'gatsby-plugin-react-i18next';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar"; // Asumimos que Navbar ya está refactorizado
import Footer from "../components/Footer"; // Asumimos que Footer ya está refactorizado

// --- Eliminar datos locales 'equipo' y 'valores' ---

const AboutPage = () => {
  const { t, language } = useI18next();

  // Asumimos que los datos del equipo se comparten con la página de inicio
  const teamMembers = t('home.team.members', { returnObjects: true }) || [];
  const valuesItems = t('about.values.items', { returnObjects: true }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet htmlAttributes={{ lang: language }}>
        <title>{`${t('about.hero.title')} - ${t('navbar.brand')}`}</title>
        <link rel="icon" href="/images/logo-libro.png" type="image/png" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
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
            {t('about.hero.title')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t('about.hero.paragraph')}
          </motion.p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 lg:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-6 text-center">
             <motion.h2
                className="text-3xl md:text-4xl font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
             >
                {t('about.whoWeAre.sectionTitle')}
             </motion.h2>
             <motion.p
                className="text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
             >
                <Trans i18nKey="about.whoWeAre.fullParagraph">
                  {/* Contenido de fallback si la clave no existe en el JSON */}
                  We are Victor and Elizabeth, a team united by a passion for language and the belief that true fluency comes from <span className="font-semibold text-gray-800">confident communication</span>, not just memorizing rules. We combine decades of educational expertise with real-world multicultural experiences to create a learning environment where you feel empowered to speak Spanish naturally and authentically.
                </Trans>
             </motion.p>
         </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            {t('home.team.sectionTitle')} {/* Reutilizando clave de home */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {Array.isArray(teamMembers) && teamMembers.map((member, index) => (
              <motion.div
                key={member.name || index} // Usar nombre como key si es único
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
                    alt={member.alt || member.name}
                    className="w-36 h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy"
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
                  alt={t('about.philosophy.imageAlt')}
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
                <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('about.philosophy.sectionTitle')}</h2>
                <p className="text-lg text-gray-700">
                  {t('about.philosophy.paragraph')}
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span><span className="font-semibold">{t('about.philosophy.listItem1')}</span> {t('about.philosophy.listItem1Desc')}</span>
                  </li>
                  <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span><span className="font-semibold">{t('about.philosophy.listItem2')}</span> {t('about.philosophy.listItem2Desc')}</span>
                  </li>
                  <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span><span className="font-semibold">{t('about.philosophy.listItem3')}</span> {t('about.philosophy.listItem3Desc')}</span>
                  </li>
                </ul>
            </motion.div>
         </div>
       </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">{t('about.values.sectionTitle')}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {Array.isArray(valuesItems) && valuesItems.map((item, i) => (
              <motion.div
                key={item.title || i} // Usar título como key si es único
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ scale: 1.03, boxShadow: 'lg' }}
              >
                <div className="text-4xl mb-4">{item.icon}</div> {/* Icono se mantiene */}
                <h4 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Vision Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-orange-500">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-xl border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white rounded-full opacity-10 hidden md:block"></div>
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white rounded-full opacity-5 hidden md:block"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {t('about.support.sectionTitle')}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mb-4 md:mb-0">
                  {t('about.support.paragraph')}
                </p>
              </div>
              {/* Usar Link del plugin */}
              <Link
                to="/supportUs"
                className="whitespace-nowrap shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                {t('about.support.supportButton')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

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