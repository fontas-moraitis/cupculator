import React from 'react';
import { useTranslation } from "react-i18next";
// Style
import style from './Header.module.css';
// Image
import logo from '../../assets/icons/logo-new.svg';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className={style.header_container}>
            <div className={style.header_container_logo}>
                <h1 className={style.header_container_logo__title}>
                    Cupculator
                </h1>
                <span>{ t('cookingConversions') }</span>
            </div>
            <div>
             <img width="115" height="45" src={logo} alt="" role="presentation"/>
            </div>
        </header>
    )
};

export default Header;