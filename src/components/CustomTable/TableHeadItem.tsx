import React from "react";

type TableHeadItemProps = {
    key: string;
    label: string;
}

const TableHeadItem: React.FC<TableHeadItemProps> = ({ label }) => {
    return (
        <td title={label}>
            {label}
        </td>
    );
};

export default TableHeadItem;