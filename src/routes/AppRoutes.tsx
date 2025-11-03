import { Route, Routes, Navigate } from "react-router-dom"
import ProductsPage from "../components/pages/ProductsPage/ProductsPage"
import OneProductPage from "../components/pages/OneProductPage/OneProductPage"
import CreateProduct from "../components/pages/CreateProduct/CreateProduct"
import NoMatchPage from "../components/pages/NoMatchPage/NoMatchPage"

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="products" element={<ProductsPage/>} />
            <Route path="products/:id" element={<OneProductPage />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="*" element={<NoMatchPage />} />
        </Routes>
    )
}