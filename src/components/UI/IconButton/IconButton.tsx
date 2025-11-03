import type { IconButtonProps } from '../../../types/types'
import styles from './IconButton.module.css'

export default function Button({ image, alt, onClick }: IconButtonProps) {
    return(
        <button className={styles.button} onClick={onClick}>
            <img className={styles.img} src={image} alt={alt} />
        </button>
    )
}