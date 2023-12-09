import React, { useContext, useEffect, useState, useRef } from 'react';
import { SearchContext } from '../../context/SearchContext';
import axios from 'axios';
import i18next from 'i18next';
import { useTranslation } from "react-i18next";
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
import Card from '../Card/Card';
import style from './CardHolder.module.css';

const CardHolder = () => {
    const { t } = useTranslation();
    const { search, setSearch } = useContext(SearchContext);
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext);
    const [error, setError] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const scrollContainer = useRef(null);

    const handleCardSelection = (card) => {
        getIngredient(card.id);
        setSearch(card.label);
    }

    const getIngredient = async (id) => {
        try {
            // const { data } = await axios.get(`api/getIngredient?ingredient=${id}`);
            const data = [];
            setActiveIng(data);
        } catch {
            setError(true);
        }
    };

    const getListOfIngredients = async (lang) => {
        try {
            // const { data } = await axios.get(`api/getIngredient?lang=${lang}`);
            const data = [];
            setIngredients(data);
        } catch {
            setError(true);
        }
    };

    useEffect(() => {
        scrollContainer.current.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollContainer.current.scrollLeft += evt.deltaY;
        });
    }, []);

    useEffect(() => {
        getListOfIngredients(i18next.language);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18next.language]);

    useEffect(() => {
        // On search, 0.5 sec delay after user's input before starting search
        const normalizedSearch = search.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        const searchedIngredient = ingredients.find(ingredient => ingredient.label.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizedSearch))?.id || 'allPurposeFlour';
        const getIngTimeout = setTimeout(() => {
            getIngredient(searchedIngredient);
        }, 800);

        return () => clearTimeout(getIngTimeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <>
            <div className={style.cardholder} ref={scrollContainer}>
                {ingredients.map((ingredient, index) => {
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
            <div>{error && <p>{t('fetchingError')}</p>}</div>
        </>
    );
};

export default CardHolder;