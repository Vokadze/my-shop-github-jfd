import React from "react";
import { useParams } from "react-router-dom";
import ProductsListPage from "../components/page/productsListPage";
import BasketShopPage from "../components/page/basketPageList/basketShopPage";
import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();
    const { prodId } = params;

    return (
        <>
            <ProductsLoader>
                {prodId ? (
                    <BasketShopPage prodId={prodId} />
                ) : (
                    <ProductsListPage />
                )}
            </ProductsLoader>
        </>
    );
};

export default Products;
