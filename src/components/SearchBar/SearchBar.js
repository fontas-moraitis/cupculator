import React, {useState, useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useTranslation } from "react-i18next";
import cross from '../../assets/icons/cross.svg'
// Style
import style from './SearchBar.module.css'

const SearchBar = () => {
	const { t } = useTranslation();
	const [placeholder, setPlaceholder] = useState(t('searchIngredient'));
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