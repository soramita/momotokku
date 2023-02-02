import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import student from './modules/student';
import teacher from './modules/teacher';
import base from './modules/base';
import introduce from './modules/introduce';
import club from './modules/club';
import school from './modules/school';
import interest from './modules/interest';
const jaJP = Object.assign(student, teacher, base, introduce, club, school, interest);
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
