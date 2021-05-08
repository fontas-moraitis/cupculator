import React from 'react';

// Components
import CalculatorContainer from '../CalculatorContainer/CalculatorContainer';

// Styling
import style from './MainContainer.module.css';

const MainContainer = () => {
    return (
        <div className={style.mainContainer}>
            <CalculatorContainer />
        </div>
    )
}

export default MainContainer;