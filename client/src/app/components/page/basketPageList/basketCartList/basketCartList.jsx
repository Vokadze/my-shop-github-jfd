import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import BasketCartListCounter from "../../../ui/basketPageUi/basketCartListCounter";

const BasketCartList = ({ product, productsItems, handleDelete }) => {
    const [countProduct, setCountProduct] = useState();

    useEffect(() => {
        setCountProduct();
    }, [countProduct]);

    const handleIncrement = () => {
        if (product.countPay >= 1) {
            const newLocalPay = productsItems.filter(
                (product) => product.count === product.count--
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        }
        setCountProduct(product.countPay++);
    };

    const handleDecrement = () => {
        if (product.countPay <= 1) {
            const newLocalPay = productsItems.filter(
                (product) => product.count === product.count++
            );
            localStorage.setItem("productsItems", JSON.stringify(newLocalPay));
        }
        setCountProduct(product.countPay--);
    };

    return (
        <>
            <div key={product._id} className="card w-100">
                <div className="card-basket-image col-2">
                    <img
                        src={product.image}
                        className="img-thumbnail border border-warning rounded mx-auto d-block"
                        alt="image"
                        width="100"
                    />
                </div>
                <div className="card-body">
                    <div className="card-body-basket">
                        <div className="card-id-product-basket">
                            <p className="my-3">{`id товара: ${product.prodNum}`}</p>
                        </div>
                        <div className="card-info-basket">
                            <div className="col col-6 card-name-product">
                                <h6>Наименование товара:</h6>
                                <p>{product.name}</p>
                            </div>
                            <div className="col card-text-product">
                                <h6>Количество:</h6>
                                <div className="card-counter-product">
                                    <BasketCartListCounter
                                        handleDecrement={handleDecrement}
                                        handleIncrement={handleIncrement}
                                        product={product}
                                    />
                                </div>
                            </div>
                            <div className="col card-text-product">
                                <h6>Стоимость:</h6>
                                <span>{product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="card-image-right">
                    <div
                        onClick={() => handleDelete(product._id)}
                        role="button"
                    >
                        <AiOutlineClose
                            size={25}
                            style={{
                                background: "#ffc107",
                                borderRadius: 25
                            }}
                        />
                    </div>
                </span>
            </div>
        </>
    );
};

BasketCartList.propTypes = {
    product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    productsItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleDelete: PropTypes.func
};

export default BasketCartList;
