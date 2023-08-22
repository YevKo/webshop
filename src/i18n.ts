import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import fi from './translations/fi.json';

i18n.use(initReactI18next).init({
    debug: true,
    defaultNS: 'ns1',
    resources: {
        en: {
            ns1: en,
        },
        fi: {
            ns1: fi
        },
    },
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
