import React, { useContext } from 'react';
import { useTranslation } from "react-i18next";
import SpinLoader from '../SpinLoader/SpinLoader';
import CustomTable from '../CustomTable/CustomTable';
import style from './ConversionsContainer.module.css';
import { Ingredient } from '../../context/ActiveIngredientContext';

type ConversionsContainerProps = {
  activeIng: Ingredient;
}

export type TableData = {
  id: string;
  size: string;
  icon: string;
  key: string;
  value: number | string;
}

const ConversionsContainer: React.FC<ConversionsContainerProps> = ({ activeIng }) => {
  const { t } = useTranslation();

  // Populate header of table
  const theadData: { id: string; label: string }[] = [];
  // Populate body of table
  let tbodyData: TableData[] = [];

  if (activeIng?.metrics) {
    for (const [key, value] of Object.entries(activeIng?.metrics)) {
      const populateTable = (key: string, value: { us: number }) => {
        switch (key) {
          case 'cup':
            return { id: key, size: '250ml', icon: '/assets/cup-sizes/Cup1.svg', key: '1 cup', value: value.us || '-' }
          case '1/2':
            return { id: key, size: '125ml', icon: '/assets/cup-sizes/Cup2.svg', key: '1/2 cup', value: value.us || '-' }
          case '1/3':
            return { id: key, size: '80ml', icon: '/assets/cup-sizes/Cup3.svg', key: '1/3 cup', value: value.us || '-' }
          case '1/4':
            return { id: key, size: '60ml', icon: '/assets/cup-sizes/Cup4.svg', key: '1/4 cup', value: value.us || '-' }
          case 'tbsp':
            return { id: key, size: '15ml', icon: '/assets/cup-sizes/Cup5.svg', key: '1 tbsp', value: value.us || '-' }
          default:
            return { id: key, size: '5ml', icon: '/assets/cup-sizes/Cup5.svg', key: '1 tsp', value: value.us || '-' }
        }
      }
      tbodyData = [...tbodyData, populateTable(key, value)];
    }
  }

  return (
    <div className={style.conversionsContainer}>
      <div className={style.titleContainer}>
        <p className={style.titleContainer__title}>
          {t('conversionsTable')}
        </p>
        <p className={style.titleContainer__ingredient}>
          {t(activeIng?.id)}
        </p>
      </div>
      {
        !activeIng?.metrics
          ? <SpinLoader />
          : <CustomTable theadData={theadData} tbodyData={tbodyData} customClass={style.conversionsTable} />
      }
    </div>
  )
};

export default ConversionsContainer;
