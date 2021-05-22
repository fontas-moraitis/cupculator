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
