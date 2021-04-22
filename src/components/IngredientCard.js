import React, { useEffect, useRef } from 'react';
import style from '../style/IngredientCardStyling.module.css';

const IngredientCard = ({ ingredient, activeIngredient, handleCardSelection }) => {
    const className = ingredient.id === activeIngredient
     ? style.activeIngredientCard  
     : style.ingredientCard;

    const activeCardRef = useRef();
     
     useEffect(() => {
         console.log(activeCardRef.current)
        activeCardRef.current?.scrollIntoView();
     }, [activeIngredient]);

    return (
        <div
         className={className}
         ref={ ingredient.id === activeIngredient ? activeCardRef : null}
         onClick={(e) => handleCardSelection(ingredient, e)}
         >
            <img width="20" height="40" src={ingredient.icon} alt="ingredient icon" className={style.ingredientCardIcon} />
            <span className={style.ingredientCardLabel}>{ingredient.label}</span>
        </div>
    )
};

export default IngredientCard;