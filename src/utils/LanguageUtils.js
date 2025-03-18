// /src/utils/LanguageUtils.js
import englishTranslations from './english';
import spanishTranslations from './spanish';

// Default language is English
const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'preferredLanguage';

// Get language from localStorage or use default
export const getCurrentLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

// Set language in localStorage
export const setCurrentLanguage = (language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
};

// Get translation text based on label and current language
export const getTextFromLabel = (label) => {
  const currentLanguage = getCurrentLanguage();
  const translations = currentLanguage === 'es' ? spanishTranslations : englishTranslations;
  
  return translations[label] || label; // Return the label itself as fallback
};

// Toggle between languages
export const toggleLanguage = () => {
  const currentLanguage = getCurrentLanguage();
  const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
  setCurrentLanguage(newLanguage);
  
  // Reload the page to apply language change
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};
