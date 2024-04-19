import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getCategoriesLoadingStatus,
    getCategoryByIds
} from "../../../store/categories";

const Category = ({ id }) => {
    const isLoading = useSelector(getCategoriesLoadingStatus());
    const category = useSelector(getCategoryByIds(id));

    if (!isLoading) {
        return <p className="m-0">{category.name}</p>;
    } else return "loading";
};

Category.propTypes = {
    id: PropTypes.string
};

export default Category;
