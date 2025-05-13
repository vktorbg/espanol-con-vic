import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { GrLanguage } from 'react-icons/gr'; // Importar el ícono de idioma

const SimpleLanguageToggle = () => {
  const { language, changeLanguage } = useI18next();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-orange-600 transition"
    >
      <GrLanguage className="w-5 h-5" /> {/* Ícono de idioma */}
      <span>{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default SimpleLanguageToggle;