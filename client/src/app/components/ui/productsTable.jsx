import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Table from "../common/table/tableProducts";

const ProductsTable = ({
    products,
    product,
    onSort,
    selectedSort,
    ...rest
}) => {
    const columns = {
        name: { path: "price", name: "Функция сортировка (по стоимости)" }
    };
    const columnsInfo = {
        image: {
            component: (product) => (
                <img
                    src={product.image}
                    className="img-thumbnail border border-warning rounded mx-auto d-block"
                    alt=""
                    width="100"
                />
            )
        },
        info: {
            path: "name",
            component: (product) => (
                <div className="col-8 mx-3">
                    <p className="mt-2">{`Наименование товара: ${product.name}`}</p>
                    <p className="mt-2">{`id товара:  ${product.prodNum}`}</p>
                    <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                </div>
            )
        },
        button: {
            component: (product) => (
                <Link to={`/products/${product._id}`}>
                    <div className="position-absolute bottom-0 end-0 p-4">
                        <button
                            className="btn btn-primary btn-sm text-nowrap "
                            type="button"
                            style={{
                                background: "#ffc107",
                                color: "#212529",
                                border: "#ffc107"
                            }}
                        >
                            Открыть карточку
                        </button>
                    </div>
                </Link>
            )
        }
    };
    return (
        <div>
            <Table
                onSort={onSort}
                selectedSort={selectedSort}
                columns={columns}
                data={products}
                columnsInfo={columnsInfo}
            ></Table>
        </div>
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    product: PropTypes.array,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default ProductsTable;
