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
        <tbody>
            <>
                {data.map((item) => (
                    <tr key={item._id}>
                        {Object.keys(columns).map((column) => (
                            <td key={column} className="pt-2 px-1">
                                <span
                                    className="badge text-dark text-wrap w-100 text-center border border-warning p-1"
                                    style={{ background: "#dee2e6" }}
                                >
                                    <div className="lh-sm m-0">
                                        {renderContent(item, column)}
                                    </div>
                                </span>
                            </td>
                        ))}
                    </tr>
                ))}
            </>
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.object
};

export default TableBody;
