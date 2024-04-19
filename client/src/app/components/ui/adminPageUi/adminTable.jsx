import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Table from "../../common/table/tableAdmin";
import Category from "./category";

const AdminTable = ({ data, onDelete, onEdit, selectedSort, onSort }) => {
    const columns = {
        prodNum: {
            path: "prodNum",
            name: "№"
        },
        name: {
            path: "name",
            name: "Наименование"
        },
        category: {
            name: "Категория",
            component: (product) => <Category id={product.category} />
        },
        count: {
            path: "count",
            name: "Количество"
        },
        price: {
            path: "price",
            name: "Стоимость"
        },
        url: {
            name: "Фото",
            component: (product) => (
                <span>
                    <Link to={product.image} role="button">
                        url
                    </Link>
                </span>
            )
        },
        actions: {
            name: "Действия",
            component: (product) => (
                <span>
                    <Link
                        to={`/admin/edit/${product._id}`}
                        onClick={() => onEdit(product._id)}
                    >
                        <i
                            className="bi bi-pencil m-2"
                            style={{
                                background: "#dee2e6",
                                color: "#ffc107"
                            }}
                        ></i>
                    </Link>
                    <span>
                        <i
                            className="bi bi-x-circle-fill m-2"
                            style={{
                                color: "#ffc107"
                            }}
                            role="button"
                            onClick={() => onDelete(product._id)}
                        ></i>
                    </span>
                </span>
            )
        }
    };
    if (data?.length > 0) {
        return (
            <Table
                columns={columns}
                data={data}
                onSort={onSort}
                selectedSort={selectedSort}
            />
        );
    }
};

AdminTable.propTypes = {
    data: PropTypes.array,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func
};

export default AdminTable;
