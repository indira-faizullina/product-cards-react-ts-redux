import { configureStore } from "@reduxjs/toolkit"
import { productsReduсer } from "./slices/products"

export const store = configureStore({
    reducer: {
        products: productsReduсer
    }
})