import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../service/category.service";
import isOutdated from "../utils/isOutdated";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        categoriesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceved, categoriesRequestFiled } =
    actions;

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;

    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoryService.get();
            dispatch(categoriesReceved(content));
        } catch (error) {
            dispatch(categoriesRequestFiled(error.message));
        }
    }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
    state.categories.isLoading;
export const getCategoryByIds = (id) => (state) => {
    if (state.categories.entities) {
        if (state.categories.entities) {
            return state.categories.entities.find((c) => c._id === id);
        }
    }
};

export default categoriesReducer;
