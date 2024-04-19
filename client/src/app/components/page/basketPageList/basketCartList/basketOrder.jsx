import React from "react";
import PropTypes from "prop-types";

import BasketSearchStatus from "../../../ui/basketPageUi/basketSearchStatus";
import "./index.css";

const BasketOrder = ({ productsItems, handleClick, itemPrice }) => {
    const formatButton = () => {
        const classes = "btn btn-sm text-nowrap btn-warning ";
        return productsItems.length === 0 ? classes + "disabled" : classes;
    };

    return (
        <div className="col col-order">
            <div className="card">
                <div className="cart-body">
                    <div className="col-order">
                        <div className="text-order">Итого:</div>
                        <div>
                            <BasketSearchStatus length={productsItems.length} />
                        </div>
                        <div className="text-order">Итоговая сумма:</div>
                        <div className="result-order">${itemPrice()}</div>
                        <div className="btn-order">
                            <button
                                className={formatButton()}
                                onClick={handleClick}
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

BasketOrder.propTypes = {
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleClick: PropTypes.func,
    itemPrice: PropTypes.func
};

export default BasketOrder;
