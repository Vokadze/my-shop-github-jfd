import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const BasketShopList = ({ product, onAddProduct }) => {
    if (product) {
        return (
            <div className="shop-list">
                <div className="container row cols-row-1 cols-row-md-3 g-0 mx-0 b-0">
                    <div className="col">
                        <div className="card w-100">
                            <div className="card-img-left">
                                <img
                                    src={product.image}
                                    className="img-thumbnail border border-warning"
                                    alt=""
                                    width="350"
                                />
                            </div>
                            <div className="card-body">
                                <span>
                                    <span>Наименование товара:</span>
                                    <p>{product.name}</p>
                                </span>
                                <p className="mt-2">{`Количество: ${product.count}`}</p>
                                <p className="mt-2">{`Стоимость: ${product.price}`}</p>
                            </div>
                            <div className="card-image-right col-3">
                                <div className="card-image-right-btn justify-content-between w-100">
                                    <div className="btn-card">
                                        <button
                                            className="btn btn-primary btn-lg text-nowrap"
                                            style={{
                                                background: "#ffc107",
                                                color: "#212529",
                                                border: "#ffc107"
                                            }}
                                            onClick={() =>
                                                onAddProduct(product)
                                            }
                                        >
                                            Купить!!!!
                                        </button>
                                    </div>
                                    <div className="text-end px-5 ">
                                        <p className="align-text-right mb-10">{`id товара:  ${product.prodNum}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return "loading basketShopList.jsx";
    }
};

BasketShopList.propTypes = {
    product: PropTypes.object,
    onAddProduct: PropTypes.func,
    onRemoveProduct: PropTypes.func,
    item: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default BasketShopList;
