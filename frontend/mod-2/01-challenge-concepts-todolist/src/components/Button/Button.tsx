import styles from './Button.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...rest }: Props) {
  return (
    <button className={styles.btnAdd} {...rest}>
      {children}
    </button>
  )
}
