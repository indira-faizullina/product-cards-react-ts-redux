import { Route, Routes } from "react-router-dom";
import ProductsPage from "../components/pages/ProductsPage/ProductsPage";
import OneProjectPage from "../components/pages/OneProductPage/OneProductPage";
import NoMatchPage from "../components/pages/NoMatchPage/NoMatchPage";

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<ProductsPage/>} />
            <Route path="products" element={<ProductsPage/>} />
            <Route path="products/:id" element={<OneProjectPage />} />
            <Route path="*" element={<NoMatchPage />} />
        </Routes>
    )
}