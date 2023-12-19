import React from "react";
import style from './Header.module.css';
import useDarkModeDetector from '../../hooks/useDarkModeDetector';

type HeaderProps = {
    settingsOpen: boolean;
    setSettingsOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ settingsOpen, setSettingsOpen }) => {
    const isDarkTheme = useDarkModeDetector();

    const handleClickButton = () => {
        setSettingsOpen(!settingsOpen);
    }

    return (
        <header className={style.header_container}>
            <div className={style.header_container_logo}>
                <h1 className={style.header_container_logo__title}>
                    Cupculator
                </h1>
            </div>
            <button
                type="button"
                aria-label="User preferences button"
                className={style.header_preferences_btn}
                onClick={handleClickButton}
            >
                {settingsOpen ?
                    <svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                        <g data-v-cd28a988=""><line x1="4" y1="4" x2="20" y2="20" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round"></line>
                            <line x1="4" y1="20" x2="20" y2="4" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round"></line>
                        </g>
                    </svg> :
                    <svg data-v-cd28a988="" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                        <g data-v-cd28a988="">
                            <line x1="4" y1="7" x2="20" y2="7" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round"></line>
                            <line x1="4" y1="12" x2="20" y2="12" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round"></line>
                            <line x1="4" y1="17" x2="20" y2="17" stroke={isDarkTheme ? '#fff' : '#000'} strokeWidth="2" strokeLinecap="round"></line>
                        </g>
                    </svg>}
            </button>
        </header>
    )
};

export default Header;
