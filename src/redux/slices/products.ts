import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Product, ProductsState, RootState } from '../../types/types'


export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>('products/fetchProducts', async (_, { getState }) => {
    const state = getState()
    
    if (state.products.items.length > 0) {
        return state.products.items
    }
    
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
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        toggleLike: (state, action) => {
            const product = state.items.find(item => item.id === action.payload)
            if (product) {
                product.isLiked = !product.isLiked
                const likedProducts = state.items.filter(item => item.isLiked).map(item => item.id)
                localStorage.setItem('likedProducts', JSON.stringify(likedProducts))
            }
        },
        addProduct: (state, action) => {
            const newProduct: Product = {
                id: Date.now(),
                ...action.payload,
                rating: {
                    rate: 0,
                    count: 0
                },
                isLiked: false,
            }
            state.items.unshift(newProduct)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'loaded'
                const savedLikes = JSON.parse(localStorage.getItem('likedProducts') || '[]')
                state.items = action.payload.map((product: any) => ({
                    ...product,
                    isLiked: savedLikes.includes(product.id)
                }))
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'error'
            })
    }
})

export const productsReduсer = productSlice.reducer
export const { deleteProduct, toggleLike, addProduct } = productSlice.actions