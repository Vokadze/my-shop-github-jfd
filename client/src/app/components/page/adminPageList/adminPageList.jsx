import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchInput from "../../common/form/searchInput";
import AdminProduct from "../../ui/adminPageUi/adminProduct";
import AdminTable from "../../ui/adminPageUi/adminTable";

import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import {
    getCategories,
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../../store/categories";
import {
    getProductDeleteIds,
    getProducts,
    loadProductsList
} from "../../../store/products";

import history from "../../../utils/history";
import "./index.css";

const AdminPageList = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 7;

    const products = useSelector(getProducts());

    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());

    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCategoriesList());
    }, [products, categories]);

    const handleDelete = (id) => {
        dispatch(getProductDeleteIds(id));
    };

    const handleEdit = (param) => {
        history.push(`/admin/edit/${param}`);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, products]);

    const handleSearchQuery = ({ target }) => {
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
                      product.prodNum
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : products;

        const count = filteredProducts.length;

        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );

        const productCrop = paginate(sortedProducts, currentPage, pageSize);

        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-column">
                        <SearchInput
                            type="text"
                            name="searchQuery"
                            placeholder="Поисковая строка (по названию)"
                            className="mb-2 text-center"
                            onChange={handleSearchQuery}
                            value={searchQuery}
                        />
                    </div>
                    <div className="container admin-page-table-all">
                        <div className="d-flex flex-row">
                            {categories && !categoriesLoading && (
                                <>
                                    <div className="container card">
                                        <div className="card-body">
                                            <h6 className="card-title">
                                                Блок для добавления или
                                                редактирования товара
                                            </h6>
                                            <AdminProduct products={products} />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="container admin-page-table">
                                <div className="p-0 m-0">
                                    <AdminTable
                                        data={products && productCrop}
                                        products={productCrop}
                                        onSort={handleSort}
                                        selectedSort={sortBy}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </div>
                                <div className="d-flex justify-content-center">
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
            </div>
        );
    }
    return "Loading adminPageList.jsx";
};

AdminPageList.propTypes = {
    products: PropTypes.array,
    product: PropTypes.array,
    prodId: PropTypes.string
};

export default AdminPageList;
