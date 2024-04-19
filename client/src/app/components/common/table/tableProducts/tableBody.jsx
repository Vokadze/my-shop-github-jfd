import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody className="d-flex flex-column px-0">
            {data.map((item) => (
                <tr
                    key={item._id}
                    className="d-flex flex-row border border-warning mb-3 position-relative"
                    style={{ background: "#dee2e6" }}
                >
                    {Object.keys(columns).map((column) => (
                        <td
                            key={column}
                            className="d-flex flex-column justify-content-center"
                        >
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
