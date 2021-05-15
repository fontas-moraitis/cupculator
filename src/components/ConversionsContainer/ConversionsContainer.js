import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
// Components
import SpinLoader from '../SpinLoader/SpinLoader';
import CustomTable from '../CustomTable/CustomTable';
// Style
import style from './ConversionsContainer.module.css';

const ConversionsContainer = () => {
    const { t } = useTranslation();
    const { activeIng } = useContext(ActiveIngredientContext);

    // Populate header of table
    const theadData = [
        { id: "cup", label: 'Cup' },
        { id: 'uk', label: "Uk" },
        { id: 'us', label: "Us" }
    ];
    // Populate body of table
    let tbodyData = []

    if (activeIng.metrics) {
        for (const [key, value] of Object.entries(activeIng.metrics)) {
            tbodyData = [...tbodyData, { id: key, items: [key === 'cup' ? '1' : key, value.uk || '-', value.us || '-'] }];
          }
    }

    return (
        <div className={style.conversionsContainer}>
            <h2 className={style.conversionsContainer__title}>
                {t('conversionsTable')}
            </h2>
            { 
                !activeIng.metrics
                    ? <SpinLoader/>
                    : <CustomTable theadData={theadData} tbodyData={tbodyData} customClass={style.conversionsTable} />
            }
            
        </div>
    )
};

export default ConversionsContainer;