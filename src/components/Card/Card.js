import React, { useEffect, useRef } from 'react';
import style from './Card.module.css';

const IngredientCard = ({ ingredient, activeIngredient, handleCardSelection }) => {
    const className = ingredient.id === activeIngredient
     ? style.activeIngredientCard  
     : style.ingredientCard;

    const activeCardRef = useRef();
     
     useEffect(() => {
        activeCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
     }, [activeIngredient]);

    return (
        <div
         className={className}
         ref={ ingredient.id === activeIngredient ? activeCardRef : null}
         onClick={(e) => handleCardSelection(ingredient, e)}
         >
            <img
             width="55"
             height="55"
             src={`assets/icons/ingredients/${ingredient.id}.svg`}
             alt={`${ingredient.name.en}-icon`}
             className={style.ingredientCardIcon}
            />
            <span className={style.ingredientCardLabel}>
                {ingredient.name.en}
            </span>
        </div>
    )
};

export default IngredientCard;