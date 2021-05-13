import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translations
import translationsEnglish from "./locales/en/translation.json";
import translationsGreek from "./locales/el/translation.json";

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
    debug: true,

    // Common namespace used around the full app?
    ns: ["translations"],
    defaultNS: "translations",
    lng: "en",
    keySeparator: false, // use content as keys instead
    supportedLngs: ['en', 'el'],
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true
    }
});

//*** call without param to use language detector
i18n.changeLanguage()

export default i18n;