import { useContext, useEffect, useState } from 'react';
import {SearchContext} from '../../context/SearchContext';
import axios from 'axios';
import i18next from 'i18next';
import {ActiveIngredientContext} from '../../context/ActiveIngredientContext';
import Card from '../Card/Card';
import style from './CardContainer.module.css';

const CardHolder = ({ activeLang }) => {
    const { search, setSearch } = useContext(SearchContext);
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext);
    const [error, setError] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    
    const handleCardSelection = (card) => {
        getIngredient(card.id);
        setSearch(card.label);
    }

    const getIngredient = async (id) => {
        try {
            const { data } = await axios.get(`api/getIngredient?ingredient=${id}`);
            setActiveIng(data);
        } catch {
            setError(true);
        }
    };

    const getListOfIngredients = async (lang) => {
        try {
            const { data } = await axios.get(`api/getIngredient?lang=${lang}`);
            setIngredients(data);
        } catch {
            setError(true);
        }
    };

    useEffect(() => {
        getListOfIngredients(i18next.language);
    }, [i18next.language]);

    useEffect(() => {
        // On search, 0.5 sec delay after user's input before starting search
        const normalizedSearch = search.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const searchedIngredient = ingredients.find(ingredient => ingredient.label.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizedSearch))?.id || 'allPurposeFlour';
        const getIngTimeout = setTimeout(() => {
            getIngredient(searchedIngredient);
        }, 800);

        return () => clearTimeout(getIngTimeout);
    }, [search])

    return (
        <>
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
            <div>{ error && <p>error</p> }</div>
        </>
    );
};

export default CardHolder;