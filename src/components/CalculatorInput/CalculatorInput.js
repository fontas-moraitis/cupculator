import React from 'react';
// Style
import style from './CalculatorInput.module.css';

const CalculatorInput = props => {
    return (
        <div className={style.customSelector}>
            <input
                id={props.label}
                type="number"
                placeholder={props.placeholder}
                value={ props.value || ''}
                className={style.customInput}
                autocomplete="off"
                onInput={e => {
                    e.preventDefault()
                    props.setValue(e.target.value)
                }}
                onClick={e => e.target.value = ''}
            />
            <label className={style.customInputLabel} htmlFor={props.label}>
                { props.label }
            </label>
        </div>
    )
};