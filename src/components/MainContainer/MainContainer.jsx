import React from 'react';
// Components
import CalculatorContainer from '../CalculatorContainer/CalculatorContainer';
import ConversionsContainer from '../ConversionsContainer/ConversionsContainer';
// Style
import style from './MainContainer.module.css';

const MainContainer = () => {
    return (
        <div className={style.mainContainer}>
            <CalculatorContainer />
            <ConversionsContainer />
        </div>
    )
}

export default MainContainer;