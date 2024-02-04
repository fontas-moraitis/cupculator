import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import CalculatorInput from '../CalculatorInput/CalculatorInput';
import style from "./CalculatorContainer.module.css";
import { Ingredient } from '../../context/ActiveIngredientContext';

/**
 * User can set either amount in grams or ml and get number of cups
 * or set number of cups and see amount of grams or ml.
 * 
 * @property {Number} unitAmount -- grams or ml depending on unit type
 * @property {Number} cupAmount -- number of cups
 * @property {String} cupType -- type of cups Uk or Us
 * 
 * @property {Object} activeIng -- The currently selected ingredient, defaults to flour
 * @function handleCupAmountChange -- Sets number of cups and unit amount
 */

type CalculatorContainerProps = {
    activeIng: Ingredient
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ activeIng }) => {
    const { t } = useTranslation();
    const [unitAmount, setUnitAmount] = useState(0);
    const [cupAmount, setCupAmount] = useState(1);

    const handleUnitAmountChange = (unitAmount: number) => {
        setUnitAmount(unitAmount);

        const calculatedAmount = unitAmount / (Number(activeIng.metrics?.cup['us']) || 0);
        const rounded = Math.round((calculatedAmount + Number.EPSILON) * 100) / 100;

        // Set cups a multiples of 0.25
        const normalizedCupNumber = Math.round(rounded * 4) / 4;
        setCupAmount(normalizedCupNumber);
    }

    const handleCupAmountChange = (cupsAmount: number) => {
        setCupAmount(cupsAmount);

        // Calculate ingredient amount based on number of cups
        const newUnitAmount = cupsAmount * activeIng?.metrics?.cup['us'];
        setUnitAmount(newUnitAmount);
    }

    useEffect(() => {
        // Sets default unit amount based on selected ingredient
        setUnitAmount(activeIng.metrics?.cup.us);
        setCupAmount(1);
    }, [activeIng]);

    return (
        <form className={style.calculatorContainer}>
            <CalculatorInput
                label={t('grams')}
                placeholder={t('quantity')}
                value={unitAmount}
                setValue={handleUnitAmountChange}
            />

            <p className={style.calculatorContainer__separator}>
                {t('to')}
            </p>

            <CalculatorInput
                label={t('cups')}
                placeholder={t('quantity')}
                value={cupAmount}
                setValue={handleCupAmountChange}
            />
        </form>
    )
};

export default CalculatorContainer;
