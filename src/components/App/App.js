import React, { useState, useMemo } from 'react';
// Components
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import CardContainer from '../CardContainer/CardContainer';
import MainContainer from '../MainContainer/MainContainer';

// Style
import style from './App.module.css';
import { SearchContext } from '../../context/SearchContext';
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';

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
