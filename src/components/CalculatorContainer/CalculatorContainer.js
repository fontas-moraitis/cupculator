import React, { useState, useEffect, useContext } from 'react';
import ingredients from '../../data/ingredients.json';
import { SearchContext } from '../../context/SearchContext';
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';

import CalculatorInput from '../CalculatorInput/CalculatorInput';

import style from "./CalculatorContainer.module.css";

const CalculatorContainer = () => {
    const QUANTITY_UNITS = [
        { id: 'gram', label: 'Grams' },
        { id: 'lt', label: 'Litres'}
    ]
    const CUPS_ORIGIN = [
        { id: 'uk', label: 'UK' },
        { id: 'us', label: 'US'}
    ]
    const [unitType, setUnitType] = useState('gram');
    const [unitAmmount, setUnitAmmount] = useState(0);
    const [cupType, setCupType] = useState('uk');
    const [cupAmmount, setCupAmmount] = useState(1);

    // const { search } = useContext(SearchContext);
    const { activeIng } = useContext(ActiveIngredientContext);

    useEffect(() => {

        const calculatorTimeoutId = setTimeout(() => {
            let ingredient = ingredients.find(ingredient => ingredient.id === activeIng);
            ingredient && setUnitAmmount(ingredient.metrics.cup[cupType]);
            console.log('igredient:', ingredient);
            console.log('unit type:', unitType);
            console.log('unit ammount:', unitAmmount);
            console.log('cup type:', cupType);
            console.log('cup ammount:', cupAmmount);
        }, 500)

        return () => clearTimeout(calculatorTimeoutId);

    }, [unitType, unitAmmount, cupType, cupAmmount, activeIng]);

    return (
        <div className={style.calculatorContainer}>
            <h2 className={style.calculatorContainer__title}>Calculator</h2>
            <CalculatorInput
                label="unit"
                placeholder="enter quantity"
                value={unitAmmount}
                setValue={setUnitAmmount}
                type={unitType}
                setType={setUnitType}
                units={QUANTITY_UNITS}
            />
            <CalculatorInput
                label="cups"
                placeholder="enter quantity"
                value={cupAmmount}
                setValue={setCupAmmount}
                type={cupType}
                setType={setCupType}
                units={CUPS_ORIGIN}
            />
        </div>
    )
};

export default CalculatorContainer;
