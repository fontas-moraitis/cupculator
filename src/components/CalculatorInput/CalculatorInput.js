import React from 'react';
import style from './CalculatorInput.module.css';

const CalculatorInput = props => {
    return (
        <div className={ style.customSelector }>
            <label className={ style.customInputLabel } htmlFor={ props.label }>
                { props.label }
            </label>
            <input
                id={ props.label }
                placeholder={ props.placeholder }
                value={props.value}
                className={ style.customInput }
                onInput={e => props.setValue(e.target.value) }
            />
            <select className={ style.customSelect } value={props.unitType} onChange={e => props.setType(e.target.value)}>
                { props.units.map(unit => {
                    return (
                        <option key={unit.id} value={unit.id}>{ unit.label }</option>
                    )
                })}
            </select>
        </div>
    )
};

export default CalculatorInput;