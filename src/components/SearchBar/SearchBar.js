import { useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useTranslation } from "react-i18next";
import useThemeDetector from '../../hooks/useThemeDetector.js';
import cross from '../../assets/icons/cross.svg'
// Style
import style from './SearchBar.module.css'

const SearchBar = () => {
	const { t } = useTranslation();
	const [placeholder, setPlaceholder] = useState(t('searchIngredient'));
	const { search, setSearch } = useContext(SearchContext);

	const isDarkTheme = useThemeDetector();

	return (
		<div className={style.searchBar}>
			<label className={style.searchBarContainer}>
				<svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
					<g data-v-cd28a988="">
						<line x1="14.17" y1="14.17" x2="22" y2="22" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round"></line>
						<circle cx="8.96" cy="8.96" r="6.96" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" fill="none"></circle>
					</g>
				</svg>
				<input
					className={style.searchBarSearchInput}
					placeholder={placeholder}
					value={search}
					onInput={ e => setSearch(e.target.value) }
					onFocus={ () => setPlaceholder("") }
					onBlur={ () => setPlaceholder(t('searchIngredient')) }
				/>
				<button
         aria-label={t('clearSearch')}
         className={style.searchBarButton}
         title={t('clearSearch')}
         type="button" 
         onClick={() => setSearch('')}
         >
          { search &&
              <img
              width="16"
              height="32" 
              src={cross}
              alt={t('clearSearch')}
            />
        }
				</button>
			</label>
		</div>
	);
}

export default SearchBar;