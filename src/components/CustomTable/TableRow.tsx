import React, { useContext } from "react";
import { ActiveIngredientContext } from '../../context/ActiveIngredientContext';
import style from './TableRow.module.css'

const TableRow = ({ data }) => {
  const { activeIng } = useContext(ActiveIngredientContext);

  return (
    <tr>
      <td className={style.tableSize}>{data.size}</td>
      <td className={style.tableIcon}>
        <img width="20" height="20" src={data.icon} alt="" />
      </td>
      <td className={style.tableKey}>{data.key}</td>
      <td className={style.tableValueContainer}>
        <div className={style.tableValueContainer__tableValue}>
          {data.value}{activeIng?.unit}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;