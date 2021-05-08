import React, { useContext, useEffect } from 'react';
import Card from '../Card/Card';
import {SearchContext} from '../../context/SearchContext';
import {ActiveIngredientContext} from '../../context/ActiveIngredientContext';
import ingredients from '../../data/ingredients.json';

import style from './CardContainer.module.css';

const CardHolder = () => {
    const { search, setSearch } = useContext(SearchContext);
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext);

    const handleCardSelection = (card, event) => {
        setSearch('');
        setActiveIng(card.id);
    };

    useEffect(() => {
        const normalizedSearch = search.toLowerCase();

        const searchTimeoutId = setTimeout(() => {
            search && ingredients.some(ingredient => ingredient.name.en.toLowerCase().includes(normalizedSearch))
            ? setActiveIng(ingredients.find(ingredient => ingredient.name.en.toLowerCase().includes(normalizedSearch)).id)
            : setActiveIng('flour')
        }, 500);

        return () => clearTimeout(searchTimeoutId);

    }, [search, setActiveIng])

    return (
        <div className={style.cardholder}>
            { ingredients.map((ingredient, index) => {
                return (
                <Card
                 key={index}
                 ingredient={ingredient}
                 activeIngredient={activeIng}
                 handleCardSelection={handleCardSelection}
                 />
                )
            })}
        </div>
    );
};

export default CardHolder;