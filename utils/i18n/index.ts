import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '../../assets/translations';

i18n
  .use(initReactI18next)
  .init({
    resources,
    // lng: 'en',
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .catch(console.warn);

export default i18n;
