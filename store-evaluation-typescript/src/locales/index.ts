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
                translation: { ...enTrans }
            },
            es: {
                translation: { ...esTrans }
            },
            de: {
                translation: { ...deTrans }
            },
            fr: {
                translation: { ...frTrans }
            },
            jp: {
                translation: { ...jpTrans }
            },
            ja: {
                translation: { ...jaTrans }
            },
            pt: {
                translation: { ...ptTrans }
            },
            it: {
                translation: { ...itTrans }
            },
            br: {
                translation: { ...ptTrans }
            }
        },
        interpolation: { escapeValue: false },
        debug: true
    });

export default i18n;
