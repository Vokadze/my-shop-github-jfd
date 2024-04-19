import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    getIsLoggedIn,
    getUserLoadingStatus,
    loadUsersList
} from "../../../store/users";
import { useEffect } from "react";
import { loadProductsList } from "../../../store/products";
import { loadCategoriesList } from "../../../store/categories";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedId = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUserLoadingStatus());

    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
        if (isLoggedId) {
            dispatch(loadUsersList());
        }
    }, [isLoggedId]);

    if (userStatusLoading) return "loading AppLoader.jsx";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
