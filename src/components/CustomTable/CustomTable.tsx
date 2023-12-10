import React from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHeadItem";
import { TableData } from "../ConversionsContainer/ConversionsContainer";

interface CustomTableProps {
    theadData: { id: string; label: string }[];
    tbodyData: TableData[];
    customClass: string;
}

const CustomTable: React.FC<CustomTableProps> = ({ theadData, tbodyData, customClass }) => {
    return (
        <table className={customClass}>
            <thead>
                <tr>
                    {theadData.map(item => <TableHeadItem key={item.id} item={item.label} />)}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((item) => {
                    return (
                        <TableRow key={item.id} data={item} />
                    )
                })}
            </tbody>
        </table>
    )
};

export default CustomTable;