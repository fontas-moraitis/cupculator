import { useState, useRef, useLayoutEffect } from 'react';
import i18next from 'i18next';
import { gsap, Expo } from 'gsap';
import { useTranslation } from 'react-i18next';
import langs from '../../data/availableLanguages.json';
import style from './UserPreferences.module.css';

const UserPreferences = () => {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState('en');

  let userPrefs = useRef(null);

  const changeLanguage = langId => {
    setActiveLang(langId);
    localStorage.setItem('language', langId);
    i18next.changeLanguage(langId);
  };

  const availableLanguages = langs.map((lang, index) =>
    <button
      className={activeLang === lang.id ? style.languageWrapper__btnActive : style.languageWrapper__btn}
      key={`language-${index}`}
      onClick={() => changeLanguage(lang.id)}
    >
      { lang.label }
    </button>
  );

  useLayoutEffect(() => {
    if (localStorage.getItem('language')) {
      setActiveLang(localStorage.getItem('language'));
    }

    gsap.from(userPrefs, .6, {
      top: '200vh',
      opacity: 0,
      ease: Expo.easeInOut,
    });
  }, []);

  return (
    <div ref={el => userPrefs = el} className={style.container}>
      <h2>{ t('userPreferencesTitle') }</h2>
      <div className={style.languageWrapper}>
        <h3>{ t('chooseLanguage') }</h3>
        <div className={style.languageWrapper__options}>{ availableLanguages }</div>
      </div>
    </div>
  );
}

export default UserPreferences;
