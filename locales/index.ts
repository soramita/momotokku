import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import jaJP from './ja_JP.json';
const resources = {
  'ja-JP': {
    translation: jaJP,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
