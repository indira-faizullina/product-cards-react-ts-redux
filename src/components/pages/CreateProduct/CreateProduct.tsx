import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../redux/slices/products'
import Button from '../../UI/Button/Button'
import styles from './CreateProduct.module.css'

export default function CreateProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        image: '',
        category: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value
        }))
        
        if (errors) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    };

    const validateForm = (): boolean => {
        const newErrors = {}

        if (!formData.title.trim()) newErrors.title = 'Введите название'
        if (!formData.description.trim()) newErrors.description = 'Ведите описание'
        if (formData.price <= 0) newErrors.price = 'Цена должна быть больше нуля'
        if (!formData.image.trim()) newErrors.image = 'Укажите ссылку на изображение'
        if (!formData.category.trim()) newErrors.category = 'Не заполнена категория'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (validateForm()) {
            dispatch(addProduct(formData));
            navigate('/products')
        }
    }

    const handleCancel = () => {
        navigate('/products')
    }

    return(
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Название
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.title ? styles.error : ''}`}
                        placeholder="Введите название товара"
                    />
                    {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
                        placeholder="Введите описание"
                    />
                    {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.label}>
                            Цена
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.1"
                            className={`${styles.input} ${errors.price ? styles.error : ''}`}
                            placeholder="0.00"
                        />
                        {errors.price && <span className={styles.errorText}>{errors.price}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.label}>
                            Категория
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.category ? styles.error : ''}`}
                            placeholder="Введите категорию"
                        />
                        {errors.category && <span className={styles.errorText}>{errors.category}</span>}
                    </div>

                <div className={styles.formGroup}>
                    <label htmlFor="image" className={styles.label}>
                        Ссылка на изображение
                    </label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.image ? styles.error : ''}`}
                        placeholder="https://image.jpg"
                    />
                    {errors.image && <span className={styles.errorText}>{errors.image}</span>}
                </div>

                <div className={styles.actions}>
                    <Button type="button"onClick={handleCancel}>
                        Отмена
                    </Button>
                    <Button type="submit">
                        Добавить продукт
                    </Button>
                </div>
            </form>
    )
}