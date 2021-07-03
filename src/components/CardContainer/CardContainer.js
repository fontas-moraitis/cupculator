import React, { useContext, useEffect, useCallback } from 'react';
import {SearchContext} from '../../context/SearchContext';
import axios from 'axios';
import {ActiveIngredientContext} from '../../context/ActiveIngredientContext';
import ingredients from '../../data/ingredients.json';
// Components
import Card from '../Card/Card';
// Style
import style from './CardContainer.module.css';

const CardHolder = () => {
    const { search, setSearch } = useContext(SearchContext);
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext);

    const fetchData = useCallback(
      async x => {
        const fetchIngredient = (id) => axios.get(`api/getIngredient?ingredient=${id}`);
        const response = await fetchIngredient(x);
        setActiveIng(response.data);
      },
      [setActiveIng],
    );

    const handleCardSelection = (card, event) => {
      fetchData(card.id);
      setSearch(card.label);
    }

    useEffect(() => {
        // On search, 0.5 sec delay after user's input before starting search
        const normalizedSearch = search.toLowerCase();
        const searchedIngredient = ingredients.find(ingredient => ingredient.label.toLowerCase().includes(normalizedSearch))?.id;
        
        const getIngTimeout = setTimeout(() => {
            fetchData(searchedIngredient);
        }, 800);

        return () => clearTimeout(getIngTimeout);
    }, [search, setActiveIng, fetchData])

    return (
        <div className={style.cardholder}>
            { ingredients.map((ingredient, index) => {
                return (
                    <Card
                    key={index}
                    ingredient={ingredient}
                    activeIngredient={activeIng.id}
                    handleCardSelection={handleCardSelection}
                    />
                )
            })}
        </div>
    );
};

export default CardHolder;