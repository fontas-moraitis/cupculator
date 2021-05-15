import React, { useContext, useEffect } from 'react';
import {SearchContext} from '../../context/SearchContext';
import axios from 'axios';
import {ActiveIngredientContext} from '../../context/ActiveIngredientContext';
import ingredients from '../../data/ingredients.json';
// Components
import Card from '../Card/Card';
// Style
import style from './CardContainer.module.css';

const CardHolder = () => {
    const { search } = useContext(SearchContext);
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext);

    const fetchIngredient = (id) => axios.get(`api/getIngredient?ingredient=${id}`); 



    const handleCardSelection = (card, event) => {
        const fetchData = async x => {
            const response = await fetchIngredient(x || 'allPurposeFlour')
            setActiveIng(response.data)
        }
        fetchData(card.id);
    };

    useEffect(() => {
        // On search, 0.5 sec delay after user's input before starting search
        const normalizedSearch = search.toLowerCase();
        const searchedIngredient = ingredients.find(ingredient => ingredient.label.toLowerCase().includes(normalizedSearch))?.id
        const getIngTimeout = setTimeout(() => {
            const fetchData = async x => {
                const response = await fetchIngredient(x || 'allPurposeFlour')
                setActiveIng(response.data)
            }
            fetchData(searchedIngredient);
        }, 1000)
        return () => clearTimeout(getIngTimeout);
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