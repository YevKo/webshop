import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import en from '../public/locales/en/common.json';
import fi from '../public/locales/fi/common.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources: {
            fi: {
                translation: fi
            },
            en: {
                translation: en,
            },
        },
        fallbackLng: 'fi',
        interpolation: {
            escapeValue: false,
        },
});

export default i18n;
