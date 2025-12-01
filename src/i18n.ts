import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

export const AVAILABLE_LOCALES = ['en'];
export const DEFAULT_LOCALE = 'en';
export const initI18n = (locale = DEFAULT_LOCALE) =>
  i18n
    .use(HttpBackend) // load translations from public/locales
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass to react-i18next
    .init({
      lng: locale,
      fallbackLng: DEFAULT_LOCALE,
      supportedLngs: AVAILABLE_LOCALES,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: true,
      },
      backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    });

export default i18n;
