import React, {useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

import style from './SearchBar.module.css'

const SearchBar = () => {
	const [placeholder, setPlaceholder] = useState("Search for an igredient");
	const { search, setSearch } = useContext(SearchContext);

	return (
		<div className={style.searchBar}>
			<label className={style.searchBarContainer}>
					<input
						className={style.searchBarSearchInput}
						placeholder={placeholder}
						value={search}
						onInput={ e => setSearch(e.target.value) }
						onFocus={ () => setPlaceholder("") }
						onBlur={ () => setPlaceholder("Search for an igredient") }
				/>
				<button onClick={() => setSearch('')}>
					<img
						width="16"
						height="32" 
						className={style.searchBarIcon}
						src="assets/icons/cross.svg"
						alt="close icon"
					/>
				</button>
			</label>
		</div>
	);
}

export default SearchBar;