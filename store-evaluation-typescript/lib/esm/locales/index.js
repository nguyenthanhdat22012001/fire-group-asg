/* Packages */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
/* Translate JSON */
import enTrans from './en.json';
import esTrans from './es.json';
import deTrans from './de.json';
import frTrans from './fr.json';
import jpTrans from './jp.json';
import jaTrans from './ja.json';
import ptTrans from './pt.json';
import itTrans from './it.json';
i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    fallbackLng: 'en',
    // lng: 'en',
    resources: {
        en: {
            translation: Object.assign({}, enTrans)
        },
        es: {
            translation: Object.assign({}, esTrans)
        },
        de: {
            translation: Object.assign({}, deTrans)
        },
        fr: {
            translation: Object.assign({}, frTrans)
        },
        jp: {
            translation: Object.assign({}, jpTrans)
        },
        ja: {
            translation: Object.assign({}, jaTrans)
        },
        pt: {
            translation: Object.assign({}, ptTrans)
        },
        it: {
            translation: Object.assign({}, itTrans)
        },
        br: {
            translation: Object.assign({}, ptTrans)
        }
    },
    interpolation: { escapeValue: false },
    debug: true
});
export default i18n;
//# sourceMappingURL=index.js.map