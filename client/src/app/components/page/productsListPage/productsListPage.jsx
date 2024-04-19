import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import ProductsTable from "../../ui/productsTable";
import SearchInput from "../../common/form/searchInput";

import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../../store/categories";
import {
    getProductById,
    getProducts,
    loadProductsList
} from "../../../store/products";
import "./index.css";

const ProductsListPage = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState({ iter: "price", order: "asc" });
    const pageSize = 2;

    const products = useSelector(getProducts());

    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());

    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadProductsList());
    }, [products, categories]);

    const handleClick = (prodId) => {
        dispatch(getProductById(prodId));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, products]);

    const handleCategoriesSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCategory(item);
    };

    const handleSearchQuery = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (products) {
        const filteredProducts = searchQuery
            ? products.filter(
                  (product) =>
                      product.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedCategory
              ? products.filter(
                    (product) =>
                        JSON.stringify(product.category) ===
                        JSON.stringify(selectedCategory._id)
                )
              : products;

        const count = filteredProducts.length;

        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );

        const productCrop = paginate(sortedProducts, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedCategory();
        };

        return (
            <div className="container products-page">
                <div className="products-page">
                    <div className="products-page">
                        <SearchInput
                            type="text"
                            name="searchQuery"
                            placeholder="Поисковая строка (по названию)"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />
                    </div>
                    <div className="container products-page-content px-0 mx-0">
                        {categories && !categoriesLoading && (
                            <div
                                className="product-page-select"
                                style={{ background: "#dee2e6" }}
                            >
                                <GroupList
                                    selectedItem={selectedCategory}
                                    items={categories}
                                    onItemSelect={handleCategoriesSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="container product-page-table px-2">
                            <div className="px-0 mx-0">
                                <ProductsTable
                                    products={productCrop}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    handleClick={handleClick}
                                />
                            </div>
                            <div className="products-pagination">
                                <Pagination
                                    itemsCount={count}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Loading productsListPage.jsx";
};

ProductsListPage.propTypes = {
    products: PropTypes.array
};

export default ProductsListPage;
