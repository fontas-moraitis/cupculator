import React, { Suspense, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import SpinLoader from '../SpinLoader/SpinLoader'
import style from './Card.module.css';
import { CardIngredient } from '../CardHolder/CardHolder';

type IngredientCardProps = {
  ingredient: { label: string; id: string; };
  activeIngredient: string;
  handleCardSelection: (ingredient: CardIngredient, e: Event) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, activeIngredient, handleCardSelection }) => {
  const { t } = useTranslation();
  const activeCardRef = useRef<HTMLButtonElement>(null);

  const className = ingredient.id === activeIngredient
    ? style.activeIngredientCard
    : style.ingredientCard


  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
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
            src={`/assets/icons/ingredients/${ingredient.id}.svg`}
            alt={`${ingredient.label}-icon`}
            className={style.ingredientCardIcon}
          />
        </span>
        <span className={style.ingredientCardLabel}>
          {t(ingredient.id)}
        </span>
      </button>
    </Suspense>
  )
};

export default IngredientCard;