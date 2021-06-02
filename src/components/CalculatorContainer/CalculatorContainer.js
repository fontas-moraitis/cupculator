import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
// Components
import CalculatorInput from '../CalculatorInput/CalculatorInput';
// Style
import style from "./CalculatorContainer.module.css";

const CalculatorContainer = () => {
    /**
     * User can set either amount in grams or ml and get number of cups
     * or set number of cups and see ammount of grams or ml.
     * 
     * @property {Number} unitAmmount -- grams or ml depending on unit type
     * @property {Number} cupAmmount -- number of cups
     * @property {String} cupType -- type of cups Uk or Us
     * 
     * @property {Object} activeIng -- The currently selected ingredient, defaults to flour
     * @function handleCupAmmountChange -- Sets number of cups and unit ammount
     */

    const { t } = useTranslation();
    
    const [unitAmmount, setUnitAmmount] = useState(0);
    const [cupType, setCupType] = useState('us');
    const [cupAmmount, setCupAmmount] = useState(1);

    const { activeIng } = useContext(ActiveIngredientContext);

    const handleCupAmmountChange = cupsAmmount => {
        setCupAmmount(cupsAmmount);
        // Calculate ingredient ammount based on number of cups
        setUnitAmmount(cupsAmmount * activeIng.metrics?.cup[cupType]);
    }

    useEffect(() => {
        // Sets default unit ammount based on selected ingredient
        setUnitAmmount(activeIng.metrics?.cup.us)
    }, [activeIng]);

    useEffect(() => {
        // Calculate number of cups
        const calcedAmmount = (unitAmmount / activeIng.metrics?.cup[cupType]);
        setCupAmmount(Math.round((calcedAmmount + Number.EPSILON) * 100) / 100);

        return () => setCupAmmount(1);
    }, [unitAmmount, cupType, activeIng])

    return (
        <section className={style.calculatorContainer}>
            <CalculatorInput
                label={t('grams')}
                placeholder="enter quantity"
                value={unitAmmount}
                setValue={setUnitAmmount}
                unit={activeIng.unit}
            />
            <div className={style.calculatorContainer__separator}>{ t('to')}</div>
            <CalculatorInput
                label={t('cups')}
                placeholder="enter quantity"
                value={cupAmmount}
                setValue={handleCupAmmountChange}
                type={cupType}
                setType={setCupType}
                unit={'us'}
            />
        </section>
    )
};

export default CalculatorContainer;
