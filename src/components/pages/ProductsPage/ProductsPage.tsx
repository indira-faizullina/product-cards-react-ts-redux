import Card from '../../UI/Card/Card'
import IconButton from '../../UI/IconButton/IconButton'
import styles from './ProductsPage.module.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import deleteIcon from '../../../assets/delete.png'
import likedIcon from '../../../assets/like.png'
import noLikeIcon from '../../../assets/no-like.png'
import { fetchProducts, deleteProduct, toggleLike } from '../../../redux/slices/products'

export default function ProductsPage() {

    const dispatch = useDispatch()
    const { items: products, status } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    const handleDelete = (id: number) => {
        dispatch(deleteProduct(id))
    }

    const handleToggleLike = (id: number) => {
        dispatch(toggleLike(id))
    }

    if (status === 'loading') {
        return (
            <div className={styles.container}>
                <h1>Products Page</h1>
                <p>Loading...</p>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className={styles.container}>
                <h1>Products Page</h1>
                <p>Error loading products</p>
            </div>
        )
    }

        return(
        <div className={styles.container}>
            <h1>Products Page</h1>
            <div className={styles.productsGrid}>
                {products.map((product) => (
                    <Card key={product.id}>
                        <Link to={`/products/${product.id}`} className={styles.productLink}>
                            <div className={styles.imageContainer}>
                                <img src={product.image} alt={product.title} className={styles.productImage} />
                            </div>
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <p className={styles.productPrice}>${product.price}</p>
                            <p className={styles.productCategory}>{product.category}</p>
                        </Link>
                        <div className={styles.icons}>
                            <IconButton 
                                image={product.isLiked ? likedIcon : noLikeIcon} 
                                alt={product.isLiked ? 'unlike' : 'like'} 
                                onClick={() => handleToggleLike(product.id)}
                            />
                            <IconButton 
                                image={deleteIcon} 
                                alt={'delete'} 
                                onClick={() => handleDelete(product.id)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}