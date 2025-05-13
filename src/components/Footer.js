// /src/components/Footer.js
import React from "react";
// *** PASO 1: Cambiar importación de Link y añadir useI18next ***
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
// import { useTranslation } from 'react-i18next'; // Opcional si t viene de useI18next

const Footer = () => {
  // *** PASO 2: Usar el hook del plugin ***
  const { t } = useI18next(); // Obtener la función de traducción 't'
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 py-4 mt-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center text-gray-600">
        {/* *** PASO 3: Usar 't' para el copyright, con interpolación para el año *** */}
        <p>{t('footer.copyrightBase', { year: year })}</p>
        <div className="mt-2 space-x-4">
          {/* *** PASO 4: Usar el componente Link del plugin *** */}
          <Link to="/about" className="hover:underline">{t('navbar.about')}</Link> {/* Reutiliza clave de navbar */}
          <Link to="/plans" className="hover:underline">{t('navbar.plans')}</Link> {/* Reutiliza clave de navbar */}
          <Link to="/services" className="hover:underline">{t('navbar.services')}</Link> {/* Reutiliza clave de navbar */}
          {/* Puedes añadir más enlaces aquí si es necesario */}
          {/* <Link to="/contact" className="hover:underline">{t('footer.contact')}</Link> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;