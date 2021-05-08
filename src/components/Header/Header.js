import React from 'react';
import style from './Header.module.css';
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation()

    return (
        <div className={style.header_container}>
            <div className={style.header_container_logo}>
                <i>i</i>
                <div>cupculator</div>
            </div>
            <div>
                { t('cookingConversions') }
            </div>
        </div>
    )
};

export default Header;