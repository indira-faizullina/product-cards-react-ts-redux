import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
    id: number
    title: string
    description: string
    price: number
    image: string
    category: string
    rating: {
        rate: number
        count: number
    }
    isLiked?: boolean
}

interface ProductsState {
    items: Product[]
    status: 'loading' | 'loaded' | 'error'
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products/')
    const data = await response.json()
    return data
})

const initialState: ProductsState = {
        items: [],
        status: 'loading'
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        deleteProduct: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        toggleLike: (state, action) => {
            const product = state.items.find(item => item.id === action.payload);
            if (product) {
                product.isLiked = !product.isLiked;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.items = action.payload.map((product: any) => ({
                    ...product,
                    isLiked: false
                }))
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'error'
            })
    }
})

export const productsReduser = productSlice.reducer
export const { deleteProduct, toggleLike } = productSlice.actions;