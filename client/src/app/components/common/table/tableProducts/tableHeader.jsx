import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
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
            <tr>
                {Object.keys(columns).map((column) => (
                    <td
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        className="p-0 pb-3 pt-2"
                    >
                        <div
                            className="d-flex flex-row border border-warning justify-content-center p-0 m-0"
                            style={{ background: "#dee2e6" }}
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            {columns[column].name}{" "}
                            {returnSortCaret(
                                selectedSort,
                                columns[column].path
                            )}
                        </div>
                    </td>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
