import styles from './IconButton.module.css'

export default function Button({ image, alt, onClick }) {
    return(
        <button className={styles.button} onClick={onClick}>
            <img className={styles.img} src={image} alt={alt} />
        </button>
    )
}