import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct, toggleLike } from '../../../redux/slices/products'
import Card from '../../UI/Card/Card'
import Button from '../../UI/Button/Button'
import IconButton from '../../UI/IconButton/IconButton'
import deleteIcon from '../../../assets/delete.png'
import likedIcon from '../../../assets/like.png'
import noLikeIcon from '../../../assets/no-like.png'
import styles from './ProductsPage.module.css'
import type { RootState } from '../../../types/types'

export default function ProductsPage() {

    const dispatch = useDispatch()
    const { items: products, status } = useSelector((state: RootState) => state.products)

    const [filter, setFilter] = useState('all')

    const filteredProducts = filter === 'liked' 
    ? products.filter(product => product.isLiked)
    : products


    useEffect(() => {
        dispatch(fetchProducts() as any)
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
            <div className={styles.filter}>
                <Button onClick={() => setFilter('all')}>Показать все</Button>
                <Button onClick={() => setFilter('liked')}>Избранное</Button>
                <Link to={'/create-product'}><Button onClick={()=>{}}>Добавить товар</Button></Link>
            </div>
            <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
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