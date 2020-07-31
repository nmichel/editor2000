import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en-translations';
import frTranslations from './fr-translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: enTranslations,
      },
      fr: {
        translations: frTranslations,
      },
    },
    fallbackLng: 'en',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
