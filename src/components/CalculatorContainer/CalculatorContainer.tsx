import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from "react-i18next";
import CalculatorInput from '../CalculatorInput/CalculatorInput';
import style from "./CalculatorContainer.module.css";
import { Ingredient } from '../../context/ActiveIngredientContext';

type CalculatorContainerProps = {
    activeIng: Ingredient
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ activeIng }) => {
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

    const { t } = useTranslation();

    const [unitAmount, setUnitAmount] = useState(0);
    const [cupType, setCupType] = useState<'us' | 'uk'>('us');
    const [cupAmount, setCupAmount] = useState(1);

    const handleCupAmountChange = (cupsAmount: number) => {
        setCupAmount(cupsAmount);
        // Calculate ingredient amount based on number of cups
        const newUnitAmount = cupsAmount * (activeIng?.metrics?.cup[cupType]);
        setUnitAmount(newUnitAmount);
    }

    useEffect(() => {
        // Sets default unit amount based on selected ingredient
        setUnitAmount(activeIng.metrics?.cup.us)
    }, [activeIng]);

    useEffect(() => {
        // Calculate number of cups
        const calcedAmount = (unitAmount / activeIng.metrics?.cup[cupType]);
        const roundedCalcedAmount = Math.round((calcedAmount + Number.EPSILON) * 100) / 100;

        // Set cups a multiples of 0.25 with a min of 0.25
        const normalizedCupNumber = Math.round(roundedCalcedAmount * 4) / 4;
        setCupAmount(normalizedCupNumber < 0.25 ? 0.25 : normalizedCupNumber);

        return () => setCupAmount(1);
    }, [unitAmount, cupType, activeIng])

    return (
        <section className={style.calculatorContainer}>
            <CalculatorInput
                label={t('grams')}
                placeholder={t('quantity')}
                value={unitAmount}
                setValue={setUnitAmount}
            />
            <div className={style.calculatorContainer__separator}>{t('to')}</div>
            <CalculatorInput
                label={t('cups')}
                placeholder={t('quantity')}
                value={cupAmount}
                setValue={handleCupAmountChange}
            />
        </section>
    )
};

export default CalculatorContainer;
