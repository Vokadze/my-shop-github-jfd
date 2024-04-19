import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getDataStatusUsers, loadUsersList } from "../../../store/users";
import { useEffect } from "react";
// import { loadProductsList } from "../../../store/products";

const ProductsLoader = ({ children }) => {
    const dataStatusLoading = useSelector(getDataStatusUsers());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataStatusLoading) dispatch(loadUsersList());
    }, [children]);

    if (!dataStatusLoading) return "loading productsLoader.jsx in products.jsx";
    return children;
};

ProductsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductsLoader;
