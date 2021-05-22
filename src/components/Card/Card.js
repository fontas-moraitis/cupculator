import React, { useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
// Style
import style from './Card.module.css';

const IngredientCard = ({ ingredient, activeIngredient, handleCardSelection }) => {
    const { t } = useTranslation();
    // Dynamic class assigmnent for default or selected card
    const className = ingredient.id === activeIngredient
     ? style.activeIngredientCard  
     : style.ingredientCard

    const activeCardRef = useRef();
     
     useEffect(() => {
        activeCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
     }, [activeIngredient]);

    return (
        <div
         className={className}
         ref={ingredient.id === activeIngredient ? activeCardRef : null}
         onClick={e => handleCardSelection(ingredient, e)}
         >
            <img
             width="55"
             height="55"
             src={`${process.env.PUBLIC_URL}/assets/icons/ingredients/${ingredient.id}.svg`}
             alt={`${ingredient.label}-icon` /* en to be replaced by locale */}
             className={style.ingredientCardIcon}
            />
            <span className={style.ingredientCardLabel}>
                {t(ingredient.id)/* en to be replaced by locale */}
            </span>
        </div>
    )
};

export default IngredientCard;