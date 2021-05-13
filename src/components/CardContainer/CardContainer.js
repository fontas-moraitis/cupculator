import React, { useContext, useEffect } from 'react';
import {SearchContext} from '../../context/SearchContext';
import {ActiveIngredientContext} from '../../context/ActiveIngredientContext';
import ingredients from '../../data/ingredients.json';
// Components
import Card from '../Card/Card';
// Style
import style from './CardContainer.module.css';

const CardHolder = () => {
    const { search } = useContext(SearchContext);
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext);

    const handleCardSelection = (card, event) => {
        setActiveIng(ingredients.find(ingredient => ingredient.id === card.id));
    };

    useEffect(() => {
        // On search, 0.5 sec delay after user's input before starting search
        const normalizedSearch = search.toLowerCase();
        const searchTimeoutId = setTimeout(() => {
            search && ingredients.some(ingredient => ingredient.name.en.toLowerCase().includes(normalizedSearch))
            ? setActiveIng(ingredients.find(ingredient => ingredient.name.en.toLowerCase().includes(normalizedSearch)))
            : setActiveIng(ingredients.find(ingredient => ingredient.name.en.toLowerCase().includes('flour')))
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
                    activeIngredient={activeIng.id}
                    handleCardSelection={handleCardSelection}
                    />
                )
            })}
        </div>
    );
};

export default CardHolder;