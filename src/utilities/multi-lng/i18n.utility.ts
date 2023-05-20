import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'
import { lng_es } from './languages/es.language';
import { lng_en } from './languages/en.language';
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'es',
    resources: {
      en: {
        translation: lng_en
      },
      es: {
        translation: lng_es
      }
    }
  });
// initialized and ready to go!


export default i18next