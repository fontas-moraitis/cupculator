import React from 'react';
// Style
import style from './SpinLoader.module.css';

const SpinLoader = () => {
    return (
        <div className={style.spinnerContainer}>
            <div className={style.spinner}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
};

export default SpinLoader;