import React from 'react';
import style from './Header.module.css';
import { useTranslation } from "react-i18next";
import logo from '../../assets/icons/logo.svg';

const Header = () => {
    const { t } = useTranslation();

    return (
        <div className={style.header_container}>
            <div className={style.header_container_logo}>
                <img width="32" height="32" src={logo} alt="" role="presentation"/>
                <div className={style.header_container_logo__title}>
                    cupculator
                </div>
            </div>
            <div>
                { t('cookingConversions') }
            </div>
        </div>
    )
};

export default Header;