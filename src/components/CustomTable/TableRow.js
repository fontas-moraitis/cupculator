import React from "react";
// Style
import style from './TableRow.module.css'

const TableRow = ({ data }) => {
    return (
        <tr>
            <td className={style.tableSize}>{data.size}</td>
            <td className={style.tableIcon}>
              <img width="20" height="20" src={data.icon} alt="" />
            </td>
            <td className={ style.tableKey}>{data.key}</td>
            <td className={style.tableValue}>{data.value}</td>
        </tr>
    );
};

export default TableRow;