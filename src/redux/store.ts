import { configureStore } from "@reduxjs/toolkit";
import { productsReduser } from "./slices/products";

export const store = configureStore({
    reducer: {
        products: productsReduser
    }
})