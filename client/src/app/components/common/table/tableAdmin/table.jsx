import React from "react";
import PropTypes from "prop-types";

import AdminHeader from "./tableHeader";
import AdminBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table table-borderless mx-1">
            {children || (
                <>
                    <AdminHeader {...{ onSort, selectedSort, columns }} />
                    <AdminBody {...{ columns, data }} />
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
    children: PropTypes.array
};

export default Table;
