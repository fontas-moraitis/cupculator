import { Suspense, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import SpinLoader from '../SpinLoader/SpinLoader'
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
      <Suspense fallback={<SpinLoader />}>
        <button
         aria-label={t('ingredientCard')}
         className={className}
         ref={ingredient.id === activeIngredient ? activeCardRef : null}
         onClick={e => handleCardSelection(ingredient, e)}
         >
           <span className={style.iconBackground}>
              <img
              width="34"
              height="34"
              src={`${process.env.PUBLIC_URL}/assets/icons/ingredients/${ingredient.id}.svg`}
              alt={`${ingredient.label}-icon` /* en to be replaced by locale */}
              className={style.ingredientCardIcon}
              />
            </span>
            <span className={style.ingredientCardLabel}>
                {t(ingredient.id)/* en to be replaced by locale */}
            </span>
        </button>
      </Suspense>
    )
};

export default IngredientCard;