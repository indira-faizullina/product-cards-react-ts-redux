import styles from './OneProductPage.module.css'
import { useParams, useNavigate } from "react-router"
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../UI/Card/Card'
import Button from "../../UI/Button/Button"
import IconButton from '../../UI/IconButton/IconButton'
import deleteIcon from '../../../assets/delete.png'
import likedIcon from '../../../assets/like.png'
import noLikeIcon from '../../../assets/no-like.png'
import { fetchProducts, deleteProduct, toggleLike } from '../../../redux/slices/products'

export default function OneProductPage() {

const dispatch = useDispatch()
const { items: products } = useSelector((state) => state.products)

const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
}

const handleToggleLike = (id: number) => {
    dispatch(toggleLike(id))
}

const { id } = useParams()
const navigate = useNavigate()

const goBack = () => navigate(-1)

const productItem = products.find(product => product.id === parseInt(id))

console.log(productItem)

    return(
        <>
            <Card>
                <div className={styles.imageContainer}>
                    <img src={productItem.image} alt={productItem.title} className={styles.productImage} />
                </div>
                    <h3 className={styles.productTitle}>{productItem.title}</h3>
                    <p className={styles.productPrice}>${productItem.price}</p>
                    <p className={styles.productRating}>
                        <span>Rate:{productItem.rating.rate}</span>
                        <span> Count:{productItem.rating.count}</span>
                    </p>
                    <p className={styles.productCategory}>{productItem.category}</p>
                    <p className={styles.productDescription}>{productItem.description}</p>
                        <div className={styles.icons}>
                            <IconButton 
                                image={productItem.isLiked ? likedIcon : noLikeIcon} 
                                alt={productItem.isLiked ? 'unlike' : 'like'} 
                                onClick={() => handleToggleLike(productItem.id)}
                            />
                            <IconButton 
                                image={deleteIcon} 
                                alt={'delete'} 
                                onClick={() => handleDelete(productItem.id)}
                            />
                        </div>
            </Card>
            <Button onClick={goBack}>Назад</Button>
        </>
    )
}