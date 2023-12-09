import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { SearchContext } from '../../context/SearchContext';
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
import style from './App.module.css';
import useThemeDetector from '../../hooks/useThemeDetector';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import CardHolder from '../CardHolder/CardHolder';
import MainContainer from '../MainContainer/MainContainer';
import UserPreferences from '../UserPreferences/UserPreferences';
import IntroScreen from '../IntroScreen/IntroScreen';

/**
 * @property {String} search -- user's input, checked againgt ingredients JSON
 * @property {Object} activeIng -- selected ingredient Object structure:
 * {
    "id": "idOfIngredient",
    "name": {
      "en": "Name of ingredient"
    },
    "unit": "Unit example grams",
    "metrics": {
      "cup": { "us": Number },
      "1/2": { "us": Number},
      "1/3": { "us": Number },
      "1/4": { "us": Number },
      "tbsp": { "us": Number },
      "tsp": { "us": Number }
    }
  }
 * 
 */

function App() {
  const [search, setSearch] = useState("");
  const [activeIng, setActiveIng] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [bipEvent, setBipEvent] = useState(null);
  const isDarkTheme = useThemeDetector();

  useEffect(() => {
    const metaTags = document.getElementsByTagName('meta');
    if (isDarkTheme) {
      metaTags['theme-color'].content = '#000';
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setBipEvent(e);
    });

    if (localStorage.getItem('language')) {
      i18next.changeLanguage(localStorage.getItem('language'));
    }
  }, [isDarkTheme]);

  return (
    <div className={style.app}>
      <IntroScreen />
      <div className={style.app__container}>
        <ActiveIngredientContext.Provider value={{ activeIng, setActiveIng }}>
          <SearchContext.Provider value={{ search, setSearch }}>
            <Header
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
            />
            <SearchBar />
            <CardHolder />
            <MainContainer />
          </SearchContext.Provider>
        </ActiveIngredientContext.Provider>
      </div>
      {settingsOpen && <UserPreferences bipEvent={bipEvent} />
      }
    </div>
  );
}

export default App;
