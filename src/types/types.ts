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

export interface FormErrors {
  title?: string
  description?: string
  price?: string
  image?: string
  category?: string
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export interface CardProps {
  children: React.ReactNode
}

export interface IconButtonProps {
  image: string
  alt: string
  onClick: () => void
}