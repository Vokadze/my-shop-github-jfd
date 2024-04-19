import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({
    onSort,
    selectedSort,
    columns,
    data,
    columnsInfo,
    children
}) => {
    return (
        <table className="table table-borderless mx-2">
            {children || (
                <>
                    <TableHeader {...{ onSort, selectedSort, columns }} />
                    <TableBody
                        {...{ data, columnsInfo }}
                        columns={columnsInfo}
                    />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    columnsInfo: PropTypes.object,
    children: PropTypes.array
};

export default Table;
