import TableRow from "./TableRow";
import TableHeadItem from "./TableHeadItem";

const CustomTable = ({ theadData, tbodyData, customClass }) => {
    return (
        <table className={customClass}>
            <thead>
                <tr>
                    { theadData.map(item => <TableHeadItem key={item.id} item={item.label}/>) }
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