
import type { ButtonProps } from '../../../types/types'
import styles from './Button.module.css'

export default function Button({ children, onClick }: ButtonProps) {
    return(
        <button className={styles.button} onClick={onClick}>{children}</button>
    )
}