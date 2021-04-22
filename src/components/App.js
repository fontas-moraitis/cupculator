import React, { useState, useMemo } from 'react';
// Components
import Header from './Header';
import SearchBar from './SearchBar';
import CardHolder from './CardHolder';
// Style
import style from '../style/App.module.css';
import { SearchContext } from '../context/SearchContext';

function App() {
  const [search, setSearch] = useState("");

  const value = useMemo(() => ({ search, setSearch }), [search, setSearch]);

  return (
    <div className={style.app}>
      <SearchContext.Provider value={value}>
        <Header />
        <SearchBar />
        <CardHolder />
      </SearchContext.Provider>
      <div>{search}</div>
    </div>
  );
}

export default App;
