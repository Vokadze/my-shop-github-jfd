import { createAction, createSlice } from "@reduxjs/toolkit";
import productService from "../service/product.service";
import isOutdated from "../utils/isOutdated";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload._id;
            state.isLoading = false;
        },
        productsUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
        productCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        removeProduct: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            );
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceved,
    productsRequestFiled,
    productsUpdateSuccessed,
    productCreated,
    removeProduct
} = actions;

const productUpdateRequested = createAction("products/productUpdateRequested");
const productUpdateFailed = createAction("products/productUpdateFailed");
const addNewProductRequested = createAction("products/addNewProductRequested");
const removeProductRequested = createAction("products/removeProductRequested");

export const loadProductsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.fetchAll();
            dispatch(productsReceved(content));
        } catch (error) {
            dispatch(productsRequestFiled(error.message));
        }
    }
};

export const getProductById = (prodId) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === prodId);
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export const getProductChangeIds = (id) => (state) => {
    if (state.products.entities) {
        return state.products.entities.filter((p) => p._id === id);
    }
};

export const getProductDeleteIds = (id) => async (dispatch) => {
    dispatch(removeProductRequested());
    try {
        const { content } = await productService.delete(id);
        if (content === null) {
            dispatch(removeProduct(id));
        }
    } catch (error) {
        dispatch(productsRequestFiled(error.message));
    }
};

export const createProduct =
    ({ _id, ...data }) =>
    async (dispatch) => {
        dispatch(addNewProductRequested());
        try {
            const { content } = await productService.create(_id, data);
            dispatch(productCreated(content));
        } catch (error) {
            dispatch(productUpdateFailed(error.message));
        }
    };

export const getProductUpdateContent =
    ({ _id, ...data }) =>
    async (dispatch, state) => {
        dispatch(productUpdateRequested());
        try {
            const { content } = await productService.getProduct(_id, data);
            dispatch(productsUpdateSuccessed(content));
        } catch (error) {
            dispatch(productUpdateFailed(error.message));
        }
    };

export default productsReducer;
