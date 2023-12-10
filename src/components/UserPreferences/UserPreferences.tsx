import React, { useRef, useLayoutEffect } from 'react';
import i18next from 'i18next';
import { gsap, Expo } from 'gsap';
import { useTranslation } from 'react-i18next';
import langs from '../../data/availableLanguages.json';
import style from './UserPreferences.module.css';

type UserPreferencesProp = {
  bipEvent: any;
  setSettingsOpen: (open: boolean) => void;
}

const UserPreferences: React.FC<UserPreferencesProp> = ({ bipEvent, setSettingsOpen }) => {
  let userPrefs = useRef(null);

  const { t } = useTranslation();

  const changeLanguage = (langId: string) => {
    localStorage.setItem('language', langId);
    i18next.changeLanguage(langId);
    setSettingsOpen(false);
  };

  const installApp = () => {
    if (bipEvent) {
      bipEvent.prompt();
    } else {
      alert('To install this app look for Add to Home Screen or Install in browser\'s menu')
    }
  };

  const shareApp = () => {
    navigator.share({
      title: 'cupculator',
      url: '/',
    })
  };

  const availableLanguages = langs.map((lang, index) =>
    <button
      className={i18next.language === lang.id ? style.languageWrapper__btnActive : style.languageWrapper__btn}
      key={`language-${index}`}
      aria-label={`select language ${lang.id}`}
      onClick={() => changeLanguage(lang.id)}
    >
      {lang.label}
    </button>
  );

  useLayoutEffect(() => {
    gsap.from(userPrefs, .6, {
      top: '200vh',
      opacity: 0,
      ease: Expo.easeInOut,
    });
  }, []);

  return (
    <div ref={el => userPrefs = el} className={style.container}>
      <h2 className={style.container__title}>
        {t('userPreferencesTitle')}
      </h2>

      {availableLanguages}

      <button
        type="button"
        aria-label="install app"
        className={style.installBtn}
        onClick={installApp}
      >
        <svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <g data-v-cd28a988="">
            <line x1="12.03" y1="17.12" x2="12.03" y2="6.12" stroke="#000000" strokeWidth="2" strokeLinecap="round"></line>
            <polyline points="16 13.93 12 17.88 8.05 13.93" stroke="#000000" strokeWidth="2" strokeLinecap="round" fill="none"></polyline>
          </g>
        </svg>
        <span>{t('installBtn')}</span>
      </button>
      <button
        type="button"
        aria-label="share app"
        className={style.shareBtn}
        onClick={shareApp}
      >
        <svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <g data-v-cd28a988="">
            <line x1="11.97" y1="6.88" x2="11.97" y2="17.88" stroke="#000000" strokeWidth="2" strokeLinecap="round"></line>
            <polyline points="8.05 10.07 12 6.12 15.95 10.07" stroke="#000000" strokeWidth="2" strokeLinecap="round" fill="none"></polyline>
          </g>
        </svg>
        <span>{t('shareBtn')}</span>
      </button>
    </div>
  );
}

export default UserPreferences;
