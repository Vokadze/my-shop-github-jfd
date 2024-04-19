import React from "react";
import PropTypes from "prop-types";

const BasketSearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 5 && number < 20) return "товаров";
        if (lastOne === 1) return "товар";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "товара";
        return "товаров";
    };

    return (
        <div className="text-start">
            <span className="count-products">
                {length > 0
                    ? `${length + " " + renderPhrase(length)}`
                    : "Товаров в корзине нет"}
            </span>
        </div>
    );
};

BasketSearchStatus.propTypes = {
    length: PropTypes.number
};

export default BasketSearchStatus;
