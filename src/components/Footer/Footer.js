import { useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import langs from '../../data/availableLanguages.json';
import style from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState('en');

  const changeLanguage = langId => {
    setActiveLang(langId);
    i18next.changeLanguage(langId);
  };

  const availableLanguages = langs.map((lang, index) =>
    <button
      className={activeLang === lang.id ? style.app__footer__btnActive : style.app__footer__btn}
      key={`language-${index}`}
      onClick={() => changeLanguage(lang.id)}
     >
      { lang.label }
    </button>
  );

  return (
    <footer className={style.app__footer}>
      <span className={style.app__footer__langTitle}>{ t('chooseLanguage') }</span>
      <div className={style.app__footer__langContainer}>{ availableLanguages }</div>
    </footer>
  )
};

export default Footer;