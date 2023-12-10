import React, { useRef, useEffect } from 'react';
import style from './CalculatorInput.module.css';

type CalculatorInputProps = {
  label: string;
  value: number;
  setValue: Function;
  placeholder: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({ label, value, setValue, placeholder }) => {
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!inputElement.current) return;

      inputElement.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
      };
    })
  });

  return (
    <div className={style.customSelector}>
      <input
        id={label}
        ref={inputElement}
        type="number"
        placeholder={placeholder}
        value={value || 0}
        className={style.customInput}
        autoComplete="off"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault()
          setValue(e.target.value)
        }}
        onClick={(e) => (e.target as HTMLInputElement).value = ''}
      />
      <label className={style.customInputLabel} htmlFor={label}>
        {label}
      </label>
    </div>
  )
};

export default CalculatorInput;