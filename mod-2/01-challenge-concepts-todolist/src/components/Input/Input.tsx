import styles from './Input.module.css'

export function Input({
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={styles.container} {...rest} />
}
