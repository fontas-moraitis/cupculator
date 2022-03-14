import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationsEnglish from "./locales/en/translation.json";
import translationsGreek from "./locales/el/translation.json";

const language = window.navigator.userLanguage || window.navigator.language;

i18n.use(LanguageDetector).init({
    // init with resources
    resources: {
        en: {
            translations: translationsEnglish
        },
        el: {
            translations: translationsGreek
        }
    },
    fallbackLng: 'en',
    debug: false,

    // Common namespace used around the full app?
    ns: ["translations"],
    defaultNS: "translations",
    lng: language,
    keySeparator: false, // use content as keys instead
    supportedLngs: ['en', 'en-GB', 'el', 'el-GR'],
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        useSuspense: true
    }
});

//*** call without param to use language detector
// i18n.changeLanguage()

export default i18n;