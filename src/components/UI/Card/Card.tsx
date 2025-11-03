import type { CardProps } from '../../../types/types'
import styles from './Card.module.css'

export default function Card( {children}: CardProps) {
    return(
        <div className={styles.cardContainer}>{children}</div>
    )
}