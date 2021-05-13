import React from 'react';
// Style
import style from './CalculatorInput.module.css';

const CalculatorInput = props => {
    return (
        <div className={style.customSelector}>
            <label className={style.customInputLabel} htmlFor={props.label}>
                { props.label }
            </label>
            <input
                id={props.label}
                type="number"
                placeholder={props.placeholder}
                value={ props.value || ''}
                className={style.customInput}
                onInput={e => {
                    e.preventDefault()
                    props.setValue(e.target.value)
                }}
                onClick={e => e.target.value = ''}
            />
            <div className={style.typeDisplay}>
                { props.unit }
            </div>
        </div>
    )
};

export default CalculatorInput;