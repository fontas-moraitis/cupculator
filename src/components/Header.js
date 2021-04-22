import React from 'react';
import style from '../style/HeaderStyle.module.css';

const Header = () => {
    return (
        <div className={style.header_container}>
            <div className={style.header_container_logo}>
                <i>i</i>
                <div>cupculator</div>
            </div>
            <div>
                cooking conversions
            </div>
        </div>
    )
};

export default Header;