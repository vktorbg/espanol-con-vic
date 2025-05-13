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
      className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg shadow-sm hover:bg-primary_hover transition-colors duration-150 text-sm font-medium"
    >
      <GrLanguage className="w-4 h-4" /> {/* Ajustar tamaño del ícono */}
      <span>{language === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
};

export default SimpleLanguageToggle;