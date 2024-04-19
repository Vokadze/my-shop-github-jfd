import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";

const rootReducers = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducers
    });
}
