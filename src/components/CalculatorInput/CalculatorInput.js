import React, {useRef, useEffect} from 'react';
// Style
import style from './CalculatorInput.module.css';

const CalculatorInput = props => {
  const inputElement = useRef(null);

useEffect(() => {
  setTimeout(() => {
    inputElement.current.onfocus = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    };
  })
});

    return (
        <div className={style.customSelector}>
            <input
                id={props.label}
                ref={inputElement}
                type="number"
                placeholder={props.placeholder}
                value={ props.value || ''}
                className={style.customInput}
                autoComplete="off"
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

export default CalculatorInput;