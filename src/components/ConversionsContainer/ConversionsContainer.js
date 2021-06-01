import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
// Components
import SpinLoader from '../SpinLoader/SpinLoader';
import CustomTable from '../CustomTable/CustomTable';
// Style
import style from './ConversionsContainer.module.css';
// const CustomTable = React.lazy(() => import('../CustomTable/CustomTable'));

const ConversionsContainer = () => {
    const { t } = useTranslation();
    const { activeIng } = useContext(ActiveIngredientContext);

    // Populate header of table
    const theadData = [
        // { id: "cup", label: t('cup') },
        // { id: 'uk', label: "Uk" },
        // { id: 'us', label: "Us" }
    ];
    // Populate body of table
    let tbodyData = []

    if (activeIng.metrics) {
        for (const [key, value] of Object.entries(activeIng.metrics)) {
          const populateTable = (key, value) => {
            switch(key) {
              case 'cup':
                return { id: key, size: '250ml', icon: '/assets/cup-sizes/Cup1.svg', key: '1 cup', value: value.us || '-'}
              case '1/2':
                return { id: key, size: '125ml', icon: '/assets/cup-sizes/Cup2.svg', key: '1/2 cup', value: value.us || '-'}
              case '1/3':
                return { id: key, size: '80ml', icon: '/assets/cup-sizes/Cup3.svg', key: '1/3 cup', value: value.us || '-'}
              case '1/4':
                return { id: key, size: '60ml', icon: '/assets/cup-sizes/Cup4.svg', key: '1/4 cup', value: value.us || '-'}
              case 'tbsp':
                return { id: key, size: '15ml', icon: '/assets/cup-sizes/Cup5.svg', key: '1 tbsp', value: value.us || '-'}
              default:
                return { id: key, size: '5ml', icon: '/assets/cup-sizes/Cup5.svg', key: '1 tsp', value: value.us || '-'}
            }
          }

            // tbodyData = [...tbodyData, { id: key, items: [key === 'cup' ? '1 cup' : key, value.us || '-'] }];
            tbodyData = [...tbodyData, populateTable(key, value)];
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
            		{/* <Suspense fallback={<SpinLoader />}>
                  { activeIng.metrics && <CustomTable theadData={theadData} tbodyData={tbodyData} customClass={style.conversionsTable} />}
                </Suspense> */}
        </div>
    )
};

export default ConversionsContainer;