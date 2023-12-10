import React, { useContext } from 'react';
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
import CalculatorContainer from '../CalculatorContainer/CalculatorContainer';
import ConversionsContainer from '../ConversionsContainer/ConversionsContainer';
import style from './MainContainer.module.css';

const MainContainer = () => {
    const { activeIng } = useContext(ActiveIngredientContext);

    return (
        <div className={style.mainContainer}>
            {(activeIng && <CalculatorContainer activeIng={activeIng} />)}
            {(activeIng && <ConversionsContainer activeIng={activeIng} />)}
        </div>
    )
}

export default MainContainer;