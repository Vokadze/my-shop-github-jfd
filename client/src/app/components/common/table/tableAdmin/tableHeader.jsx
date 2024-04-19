import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const returnSortCaret = (selectedSort, currentPath) => {
        if (selectedSort.path !== currentPath) return false;
        if (selectedSort.order === "asc") {
            return <i className="bi bi-caret-down-fill"></i>;
        } else {
            return <i className="bi bi-caret-up-fill"></i>;
        }
    };

    return (
        <thead>
            <tr
                className="border border-warning text-center"
                style={{
                    background: "#dee2e6"
                }}
            >
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}{" "}
                        {returnSortCaret(selectedSort, columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object
};

export default TableHeader;
