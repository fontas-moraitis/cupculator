import React, { useState, useMemo } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';

// Components
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import CardContainer from '../CardContainer/CardContainer';
import MainContainer from '../MainContainer/MainContainer';

// Style
import style from './App.module.css';

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

  const value = useMemo(() => ({ search, setSearch }), [search, setSearch]);
  const activeIngValue = useMemo(() => ({ activeIng, setActiveIng }), [activeIng, setActiveIng]);

  return (
    <div className={style.app}>
      <section className={style.blobContainer}>
        <div className={style.decorationBlob}>
          <svg viewBox="0 0 453.93 385.03">
            <g><g>
              <path d="M283.22,365.14c-118.22,42.22-212,16-261-67-82.18-139.2,90-133.62,91-196,2-125,186-126,271-53C497.22,146.14,479.22,295.14,283.22,365.14Z"/>
            </g></g>
          </svg>
        </div>
      </section>
      <ActiveIngredientContext.Provider value={activeIngValue}>
        <SearchContext.Provider value={value}>
          <Header />
          <SearchBar />
          <CardContainer />
          <MainContainer />
        </SearchContext.Provider>
      </ActiveIngredientContext.Provider>
    </div>
  );
}

export default App;
