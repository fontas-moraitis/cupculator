import React, { useContext, useEffect, useState, useRef } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { useTranslation } from "react-i18next";
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
import type { Ingredient } from '../../context/ActiveIngredientContext';
import Card from '../Card/Card';
import style from './CardHolder.module.css';

export type CardIngredient = {
    id: string;
    label: string;
};

const CardHolder: React.FC = () => {
    const { t, i18n } = useTranslation();
    const { search, setSearch } = useContext(SearchContext)!;
    const { activeIng, setActiveIng } = useContext(ActiveIngredientContext)!;
    const [error, setError] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState<CardIngredient[]>([]);
    const scrollContainer = useRef<HTMLDivElement>(null);

    const getIngredients = async (lang: string) => {
        try {
            const response = await fetch(`/api/getIngredients?lang=${lang}`);
            const ingredients = await response.json() as CardIngredient[];

            setIngredients(ingredients);
        } catch (error) {
            setError(true);
        }
    };

    const getIngredient = async (id: string) => {
        try {
            const response = await fetch(`/api/getIngredients?ingredient=${id}`);
            const ingredient = await response.json() as Ingredient;

            setActiveIng(ingredient);
        } catch (error) {
            setError(true);
        }
    };

    const handleCardSelection = (card: CardIngredient) => {
        getIngredient(card.id);
        setSearch(card.label);
    };

    useEffect(() => {
        const handleScroll = (evt: WheelEvent) => {
            evt.preventDefault();

            if (scrollContainer.current) {
                scrollContainer.current.scrollLeft += evt.deltaY;
            }
        };

        const currentScrollContainer = scrollContainer.current;

        if (currentScrollContainer) {
            currentScrollContainer.addEventListener("wheel", handleScroll);

            return () => currentScrollContainer.removeEventListener("wheel", handleScroll);
        }
    }, [scrollContainer]);

    useEffect(() => {
        getIngredients(i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        const normalizedSearch = search.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

        const searchedIngredient = ingredients.find(ingredient =>
            ingredient.label.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizedSearch)
        )?.id;


        const getIngTimeout = setTimeout(() => {
            getIngredient(searchedIngredient || 'allPurposeflour');
        }, 500);

        return () => clearTimeout(getIngTimeout);

    }, [search, ingredients]);

    return (
        <>
            <div className={style.cardholder} ref={scrollContainer}>
                {ingredients.map((ingredient) => (
                    <Card
                        key={ingredient.id}
                        ingredient={ingredient}
                        activeIngredient={activeIng?.id || ''}
                        handleCardSelection={handleCardSelection}
                    />
                ))}
            </div>
            {error && <p className={style.cardholderError}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="24"
                    height="24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                </svg>
                <span>{t('fetchingError')}</span>
            </p>}
        </>
    );
};

export default CardHolder;
