import React, { useState, useContext, useEffect, useMemo } from 'react';
import IngredientCard from './IngredientCard';
import {SearchContext} from '../context/SearchContext';

import style from '../style/CardHolderStyle.module.css'

const CardHolder = () => {
    const [activeIngredient, setActiveIngredient] = useState("flour");
    const { search } = useContext(SearchContext);
    
    const ingredients = useMemo(() => [
        { id: "flour", label: "flour", icon: '/icons/flour-icon.svg' },
        { id: "butter", label: "butter", icon: '/icons/butter-icon.svg' },
        { id: "milk", label: "milk", icon: '/icons/milk-icon.svg' },
        { id: "sugar", label: "sugar", icon: '/icons/milk-icon.svg' },
        { id: "baking", label: "baking soda", icon: '/icons/milk-icon.svg' },
        { id: "lemon", label: "lemon juice", icon: '/icons/milk-icon.svg' }
    ], []);

    const handleCardSelection = (card, event) => {
        setActiveIngredient(card.id);
    };

    useEffect(() => {
        search && ingredients.some(ingredient => ingredient.label.includes(search))
            ? setActiveIngredient(ingredients.find(ingredient => ingredient.label.includes(search)).id)
            : setActiveIngredient('flour')
    }, [search, ingredients])

    return (
        <div className={style.cardholder}>
            { ingredients.map((ingredient, index) => {
                return (
                <IngredientCard
                 key={index}
                 ingredient={ingredient}
                 activeIngredient={activeIngredient}
                 handleCardSelection={handleCardSelection}
                 />
                )
            })}
        </div>
    );
};

export default CardHolder;