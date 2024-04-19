import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import BasketCartList from "../../page/basketPageList/basketCartList/basketCartList";
import BasketOrder from "../../page/basketPageList/basketCartList/basketOrder";

const BasketForm = () => {
    const [productLocal, setProductLocal] = useState();
    const newProductsItem = localStorage.getItem("productsItems");
    const productsItems = JSON.parse(newProductsItem);

    useEffect(() => {
        setProductLocal();
    }, [productLocal]);

    const handleDelete = (prodId) => {
        if (productsItems) {
            const newLocal = productsItems.filter(
                (product) => product._id !== prodId
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocal));
            setProductLocal(newLocal);
        }
    };

    const handleIncrement = (id) => {
        const elementIndex = productsItems.findIndex(
            (product) => product._id === id
        );
        const newCounters = [...productsItems];
        newCounters[elementIndex].countPay++;
        setProductLocal(newCounters);
    };

    const handleDecrement = (id) => {
        const elementIndex = productsItems.findIndex(
            (product) => product._id === id
        );
        const newCounters = [...productsItems];
        newCounters[elementIndex].countPay--;

        setProductLocal(newCounters);
    };

    const itemPrice = () => {
        const newOrderPay = productsItems
            .reduce((a, c) => a + c.countPay * c.price, 0)
            .toFixed(2);
        return newOrderPay;
    };

    const handleClick = () => {
        console.log("click");
    };
    if (productsItems) {
        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column w-100">
                    <h1>Корзина</h1>
                    <div className="d-flex flex-row">
                        <div className="row cols-row-1 cols-row-md-3 g-0">
                            <div className="col">
                                {productsItems.map((product) => (
                                    <BasketCartList
                                        product={product}
                                        key={product._id}
                                        handleIncrement={handleIncrement}
                                        handleDecrement={handleDecrement}
                                        productsItems={productsItems}
                                        handleDelete={handleDelete}
                                        {...product}
                                    />
                                ))}
                            </div>
                        </div>
                        <BasketOrder
                            itemPrice={itemPrice}
                            productsItems={productsItems}
                            handleClick={handleClick}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <h1>Корзина пуста</h1>
            </>
        );
    }
};

BasketForm.propTypes = {
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func
};

export default BasketForm;
