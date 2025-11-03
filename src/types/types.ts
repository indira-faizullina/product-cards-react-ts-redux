export interface Product {
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

export interface ProductsState {
  items: Product[]
  status: 'loading' | 'loaded' | 'error'
}

export interface RootState {
  products: ProductsState
}